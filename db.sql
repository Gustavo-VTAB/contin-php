-- Tabela de managers
CREATE TABLE managers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


-- Tabela de cartões
CREATE TABLE cards (
    id BIGSERIAL PRIMARY KEY,
    status VARCHAR(20) DEFAULT 'active',
    name VARCHAR(255) NOT NULL,
    number VARCHAR(50),
    validity VARCHAR(10),
    cvv VARCHAR(10),
    "limit" NUMERIC(12,2),
    obs TEXT
);

-- Tabela de telefones
CREATE TABLE phones (
    id BIGSERIAL PRIMARY KEY,
    card_id BIGINT,
    name VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    number VARCHAR(50),
    operator VARCHAR(50),
    easy_at TIMESTAMP,
    CONSTRAINT fk_phone_card FOREIGN KEY (card_id)
        REFERENCES cards (id)
        ON DELETE SET NULL
);

-- Tabela de perfis do Facebook
CREATE TABLE fb_profiles (
    id BIGSERIAL PRIMARY KEY,
    phone_id BIGINT,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    obs TEXT,
    CONSTRAINT fk_profile_manager FOREIGN KEY (manager_id)
        REFERENCES managers (id)
        ON DELETE SET NULL,
    CONSTRAINT fk_profile_phone FOREIGN KEY (phone_id)
        REFERENCES phones (id)
        ON DELETE SET NULL
);

-- Tabela de Business Managers (Facebook)
CREATE TABLE fb_bms (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    obs TEXT
);

-- Tabela de páginas do Facebook
CREATE TABLE fb_pages (
    id BIGSERIAL PRIMARY KEY,
    status VARCHAR(20) DEFAULT 'active',
    name VARCHAR(255) NOT NULL,
    ig_login VARCHAR(255),
    ig_email VARCHAR(255),
    ig_password VARCHAR(255),
    obs TEXT
);

--Tabelas de logs 
CREATE TABLE logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    table_name VARCHAR(255),
    record_id BIGINT,
    action VARCHAR(20), 
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);


ALTER TABLE users
ADD COLUMN login_attempts INT DEFAULT 0,
ADD COLUMN blocked BOOLEAN DEFAULT FALSE;

INSERT INTO fb_pages (name, status, ig_login, ig_email, ig_password, obs)
VALUES
('Página Loja Online', 'active', '@lojavirtual', 'loja@example.com', 'senha123', 'Página integrada com Instagram'),
('Página de Teste', 'inactive', '@testepage', 'teste@example.com', 'senha456', 'Página em modo de teste');


ALTER TABLE fb_bms
ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL,
ADD COLUMN IF NOT EXISTS deleted_by BIGINT NULL;

ALTER TABLE fb_pages
ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL,
ADD COLUMN IF NOT EXISTS deleted_by BIGINT NULL;


-------------------------------------------------------------------------------



--validação de login 
CREATE OR REPLACE PROCEDURE sp_valida_login(
    IN p_email VARCHAR,
    IN p_password VARCHAR,
    OUT p_msg TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user RECORD;
BEGIN
    SELECT * INTO v_user
    FROM users
    WHERE email = p_email;

    IF NOT FOUND THEN
        p_msg := 'Usuário não encontrado.';
        RETURN;
    END IF;

    IF v_user.blocked THEN
        p_msg := 'Usuário bloqueado.';
        RETURN;
    END IF;

    IF v_user.password = p_password THEN
        UPDATE users SET login_attempts = 0 WHERE email = p_email;
        p_msg := 'Login válido.';
    ELSE
        UPDATE users
        SET login_attempts = login_attempts + 1,
            blocked = CASE WHEN login_attempts + 1 >= 3 THEN TRUE ELSE FALSE END
        WHERE email = p_email;
        p_msg := 'Senha incorreta.';
    END IF;
END;
$$;


--desbloquear usuario 

CREATE OR REPLACE PROCEDURE sp_desbloquear_usuario(
    IN p_email VARCHAR,
    OUT p_msg TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE users
    SET blocked = FALSE,
        login_attempts = 0
    WHERE email = p_email;

    IF FOUND THEN
        p_msg := 'Usuário desbloqueado com sucesso.';
    ELSE
        p_msg := 'Usuário não encontrado.';
    END IF;
END;
$$;



--trocar senha 

CREATE OR REPLACE PROCEDURE sp_trocar_senha(IN p_email VARCHAR, IN p_nova_senha VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE users
    SET password = p_nova_senha
    WHERE email = p_email AND blocked = FALSE;
END;
$$;



-----------------------------------------------------------------------

--PROFILE
--Procedure: Inserir perfil + log
CREATE OR REPLACE PROCEDURE sp_insert_fb_profile(
    p_name VARCHAR,
    p_phone_id BIGINT,
    p_status VARCHAR,
    p_obs TEXT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_new_id BIGINT;
    v_new_data JSONB;
BEGIN
    INSERT INTO fb_profiles (name, phone_id, status, obs)
    VALUES (p_name, p_phone_id, COALESCE(p_status, 'active'), p_obs)
    RETURNING id INTO v_new_id;

    v_new_data := jsonb_build_object(
        'id', v_new_id,
        'name', p_name,
        'phone_id', p_phone_id,
        'status', p_status,
        'obs', p_obs
    );

    INSERT INTO logs (user_id, table_name, record_id, action, new_data)
    VALUES (p_user_id, 'fb_profiles', v_new_id, 'INSERT', v_new_data);
END;
$$;

--atualizar perfil 
CREATE OR REPLACE PROCEDURE sp_update_fb_profile(
    p_id BIGINT,
    p_name VARCHAR,
    p_phone_id BIGINT,
    p_status VARCHAR,
    p_obs TEXT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    -- capturar dados antigos
    SELECT to_jsonb(p) INTO v_old_data
    FROM fb_profiles p
    WHERE id = p_id;

    -- atualizar registro
    UPDATE fb_profiles
    SET name = p_name,
        phone_id = p_phone_id,
        status = COALESCE(p_status, status),
        obs = p_obs
    WHERE id = p_id;

    -- capturar dados novos
    SELECT to_jsonb(p) INTO v_new_data
    FROM fb_profiles p
    WHERE id = p_id;

    -- gravar log
    INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
    VALUES (p_user_id, 'fb_profiles', p_id, 'UPDATE', v_old_data, v_new_data);
END;
$$;

--excluir perfil 

CREATE OR REPLACE PROCEDURE sp_excluir_fb_profile(
    p_id BIGINT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    -- capturar dados antigos
    SELECT to_jsonb(p) INTO v_old_data
    FROM fb_profiles p
    WHERE id = p_id;

    -- atualizar registro (soft delete)
    UPDATE fb_profiles
    SET deleted = TRUE,
        deleted_at = NOW(),
        deleted_by = p_user_id,
        status = 'inactive'
    WHERE id = p_id;

    -- capturar dados novos (após soft delete)
    SELECT to_jsonb(p) INTO v_new_data
    FROM fb_profiles p
    WHERE id = p_id;

    -- registrar log
    INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
    VALUES (p_user_id, 'fb_profiles', p_id, 'SOFT_DELETE', v_old_data, v_new_data);
END;
$$;


--PHONES
--inserir phones 

CREATE OR REPLACE PROCEDURE sp_insert_phone(
    p_card_id BIGINT,
    p_name VARCHAR,
    p_status VARCHAR,
    p_number VARCHAR,
    p_operator VARCHAR,
    p_easy_at TIMESTAMP,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_new_id BIGINT;
    v_new_data JSONB;
BEGIN
    INSERT INTO phones (card_id, name, status, number, operator, easy_at)
    VALUES (p_card_id, p_name, COALESCE(p_status, 'active'), p_number, p_operator, p_easy_at)
    RETURNING id INTO v_new_id;

    v_new_data := jsonb_build_object(
        'id', v_new_id,
        'card_id', p_card_id,
        'name', p_name,
        'status', p_status,
        'number', p_number,
        'operator', p_operator,
        'easy_at', p_easy_at
    );

    INSERT INTO logs (user_id, table_name, record_id, action, new_data)
    VALUES (p_user_id, 'phones', v_new_id, 'INSERT', v_new_data);
END;
$$;

--atualizar phones

CREATE OR REPLACE PROCEDURE sp_update_phone(
    p_id BIGINT,
    p_card_id BIGINT,
    p_name VARCHAR,
    p_status VARCHAR,
    p_number VARCHAR,
    p_operator VARCHAR,
    p_easy_at TIMESTAMP,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    -- capturar dados antigos
    SELECT to_jsonb(p) INTO v_old_data
    FROM phones p
    WHERE id = p_id;

    -- atualizar registro
    UPDATE phones
    SET card_id = p_card_id,
        name = p_name,
        status = COALESCE(p_status, status),
        number = p_number,
        operator = p_operator,
        easy_at = p_easy_at
    WHERE id = p_id;

    -- capturar dados novos
    SELECT to_jsonb(p) INTO v_new_data
    FROM phones p
    WHERE id = p_id;

    -- registrar log
    INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
    VALUES (p_user_id, 'phones', p_id, 'UPDATE', v_old_data, v_new_data);
END;
$$;

--Ecluir Phone

CREATE OR REPLACE PROCEDURE sp_excluir_phone(
    p_id BIGINT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    -- Capturar dados antigos antes da exclusão
    SELECT to_jsonb(ph) INTO v_old_data
    FROM phones ph
    WHERE id = p_id;

    -- Atualizar registro (soft delete)
    UPDATE phones
    SET deleted = TRUE,
        deleted_at = NOW(),
        deleted_by = p_user_id,
        status = 'inactive'
    WHERE id = p_id;

    -- Capturar dados novos (após soft delete)
    SELECT to_jsonb(ph) INTO v_new_data
    FROM phones ph
    WHERE id = p_id;

    -- Registrar log no histórico
    INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
    VALUES (p_user_id, 'phones', p_id, 'SOFT_DELETE', v_old_data, v_new_data);
END;
$$;


--CARDS
---Inserir cartão
CREATE OR REPLACE PROCEDURE sp_insert_card(
    p_status VARCHAR,
    p_name VARCHAR,
    p_number VARCHAR,
    p_validity VARCHAR,
    p_cvv VARCHAR,
    p_limit NUMERIC,
    p_obs TEXT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_new_id BIGINT;
    v_new_data JSONB;
BEGIN
    INSERT INTO cards (status, name, number, validity, cvv, "limit", obs)
    VALUES (COALESCE(p_status, 'active'), p_name, p_number, p_validity, p_cvv, p_limit, p_obs)
    RETURNING id INTO v_new_id;

    v_new_data := jsonb_build_object(
        'id', v_new_id,
        'status', p_status,
        'name', p_name,
        'number', p_number,
        'validity', p_validity,
        'cvv', p_cvv,
        'limit', p_limit,
        'obs', p_obs
    );

    INSERT INTO logs (user_id, table_name, record_id, action, new_data)
    VALUES (p_user_id, 'cards', v_new_id, 'INSERT', v_new_data);
END;
$$;


--Atualizar cartão
CREATE OR REPLACE PROCEDURE sp_update_card(
    p_id BIGINT,
    p_status VARCHAR,
    p_name VARCHAR,
    p_number VARCHAR,
    p_validity VARCHAR,
    p_cvv VARCHAR,
    p_limit NUMERIC,
    p_obs TEXT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    SELECT to_jsonb(c) INTO v_old_data FROM cards c WHERE id = p_id;

    UPDATE cards
    SET status = COALESCE(p_status, status),
        name = p_name,
        number = p_number,
        validity = p_validity,
        cvv = p_cvv,
        "limit" = p_limit,
        obs = p_obs
    WHERE id = p_id;

    SELECT to_jsonb(c) INTO v_new_data FROM cards c WHERE id = p_id;

    INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
    VALUES (p_user_id, 'cards', p_id, 'UPDATE', v_old_data, v_new_data);
END;
$$;

--BMS


-- Procedure: Inserir Business Manager + log
CREATE OR REPLACE PROCEDURE sp_insert_fb_bm(
    p_name VARCHAR,
    p_status VARCHAR,
    p_obs TEXT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_new_id BIGINT;
    v_new_data JSONB;
BEGIN
    INSERT INTO fb_bms (name, status, obs)
    VALUES (p_name, COALESCE(p_status, 'active'), p_obs)
    RETURNING id INTO v_new_id;

    v_new_data := jsonb_build_object(
        'id', v_new_id,
        'name', p_name,
        'status', p_status,
        'obs', p_obs
    );

    INSERT INTO logs (user_id, table_name, record_id, action, new_data)
    VALUES (p_user_id, 'fb_bms', v_new_id, 'INSERT', v_new_data);
END;
$$;



-- Procedure: Atualizar Business Manager + log
CREATE OR REPLACE PROCEDURE sp_update_fb_bm(
    p_id BIGINT,
    p_name VARCHAR,
    p_status VARCHAR,
    p_obs TEXT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    -- capturar dados antigos
    SELECT to_jsonb(b) INTO v_old_data
    FROM fb_bms b
    WHERE id = p_id;

    -- atualizar registro
    UPDATE fb_bms
    SET name = p_name,
        status = COALESCE(p_status, status),
        obs = p_obs
    WHERE id = p_id;

    -- capturar dados novos
    SELECT to_jsonb(b) INTO v_new_data
    FROM fb_bms b
    WHERE id = p_id;

    -- gravar log
    INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
    VALUES (p_user_id, 'fb_bms', p_id, 'UPDATE', v_old_data, v_new_data);
END;
$$;



-- Procedure: Exclusão lógica (Soft Delete) de Business Manager + log
CREATE OR REPLACE PROCEDURE sp_excluir_fb_bm(
    p_id BIGINT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    -- capturar dados antigos
    SELECT to_jsonb(b) INTO v_old_data
    FROM fb_bms b
    WHERE id = p_id;

    -- atualizar registro (soft delete)
    UPDATE fb_bms
    SET deleted = TRUE,
        deleted_at = NOW(),
        deleted_by = p_user_id,
        status = 'inactive'
    WHERE id = p_id;

    -- capturar dados novos
    SELECT to_jsonb(b) INTO v_new_data
    FROM fb_bms b
    WHERE id = p_id;

    -- registrar log
    INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
    VALUES (p_user_id, 'fb_bms', p_id, 'SOFT_DELETE', v_old_data, v_new_data);
END;
$$;


----PAGES
-- Inserir Página
CREATE OR REPLACE PROCEDURE sp_insert_fb_page(
    p_name VARCHAR,
    p_status VARCHAR,
    p_ig_login VARCHAR,
    p_ig_email VARCHAR,
    p_ig_password VARCHAR,
    p_obs TEXT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_new_id BIGINT;
    v_new_data JSONB;
BEGIN
    INSERT INTO fb_pages (name, status, ig_login, ig_email, ig_password, obs)
    VALUES (p_name, COALESCE(p_status, 'active'), p_ig_login, p_ig_email, p_ig_password, p_obs)
    RETURNING id INTO v_new_id;

    v_new_data := jsonb_build_object(
        'id', v_new_id,
        'name', p_name,
        'status', p_status,
        'ig_login', p_ig_login,
        'ig_email', p_ig_email,
        'ig_password', p_ig_password,
        'obs', p_obs
    );

    INSERT INTO logs (user_id, table_name, record_id, action, new_data)
    VALUES (p_user_id, 'fb_pages', v_new_id, 'INSERT', v_new_data);
END;
$$;



-- Atualizar Página
CREATE OR REPLACE PROCEDURE sp_update_fb_page(
    p_id BIGINT,
    p_name VARCHAR,
    p_status VARCHAR,
    p_ig_login VARCHAR,
    p_ig_email VARCHAR,
    p_ig_password VARCHAR,
    p_obs TEXT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    SELECT to_jsonb(pg) INTO v_old_data
    FROM fb_pages pg
    WHERE id = p_id;

    UPDATE fb_pages
    SET name = p_name,
        status = COALESCE(p_status, status),
        ig_login = p_ig_login,
        ig_email = p_ig_email,
        ig_password = p_ig_password,
        obs = p_obs
    WHERE id = p_id;

    SELECT to_jsonb(pg) INTO v_new_data
    FROM fb_pages pg
    WHERE id = p_id;

    INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
    VALUES (p_user_id, 'fb_pages', p_id, 'UPDATE', v_old_data, v_new_data);
END;
$$;



-- Exclusão Lógica (Soft Delete)
CREATE OR REPLACE PROCEDURE sp_excluir_fb_page(
    p_id BIGINT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    SELECT to_jsonb(pg) INTO v_old_data
    FROM fb_pages pg
    WHERE id = p_id;

    UPDATE fb_pages
    SET deleted = TRUE,
        deleted_at = NOW(),
        deleted_by = p_user_id,
        status = 'inactive'
    WHERE id = p_id;

    SELECT to_jsonb(pg) INTO v_new_data
    FROM fb_pages pg
    WHERE id = p_id;

    INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
    VALUES (p_user_id, 'fb_pages', p_id, 'SOFT_DELETE', v_old_data, v_new_data);
END;
$$;


-------------Triggers-----------------

--trigger profile soft delete
CREATE OR REPLACE FUNCTION trg_fb_profiles_soft_delete()
RETURNS TRIGGER AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    IF (OLD.deleted = FALSE AND NEW.deleted = TRUE) THEN
        v_old_data := to_jsonb(OLD);
        v_new_data := to_jsonb(NEW);

        INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
        VALUES (NEW.deleted_by, 'fb_profiles', NEW.id, 'SOFT_DELETE_TRIGGER', v_old_data, v_new_data);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_fb_profiles_soft_delete ON fb_profiles;
CREATE TRIGGER trg_fb_profiles_soft_delete
AFTER UPDATE ON fb_profiles
FOR EACH ROW
WHEN (OLD.deleted IS DISTINCT FROM NEW.deleted)
EXECUTE FUNCTION trg_fb_profiles_soft_delete();


--phones
CREATE OR REPLACE FUNCTION trg_phones_soft_delete()
RETURNS TRIGGER AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    IF (OLD.deleted = FALSE AND NEW.deleted = TRUE) THEN
        v_old_data := to_jsonb(OLD);
        v_new_data := to_jsonb(NEW);

        INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
        VALUES (NEW.deleted_by, 'phones', NEW.id, 'SOFT_DELETE_TRIGGER', v_old_data, v_new_data);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_phones_soft_delete ON phones;
CREATE TRIGGER trg_phones_soft_delete
AFTER UPDATE ON phones
FOR EACH ROW
WHEN (OLD.deleted IS DISTINCT FROM NEW.deleted)
EXECUTE FUNCTION trg_phones_soft_delete();



--cards


CREATE OR REPLACE PROCEDURE sp_excluir_card(
    p_id BIGINT,
    p_user_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    SELECT to_jsonb(c) INTO v_old_data FROM cards c WHERE id = p_id;

    UPDATE cards
    SET deleted = TRUE,
        deleted_at = NOW(),
        deleted_by = p_user_id,
        status = 'inactive'
    WHERE id = p_id;

    SELECT to_jsonb(c) INTO v_new_data FROM cards c WHERE id = p_id;

    INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
    VALUES (p_user_id, 'cards', p_id, 'SOFT_DELETE', v_old_data, v_new_data);
END;
$$;



-- Trigger: registrar log automático quando o campo "deleted" mudar
CREATE OR REPLACE FUNCTION trg_fb_bms_soft_delete()
RETURNS TRIGGER AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    IF (OLD.deleted = FALSE AND NEW.deleted = TRUE) THEN
        v_old_data := to_jsonb(OLD);
        v_new_data := to_jsonb(NEW);

        INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
        VALUES (NEW.deleted_by, 'fb_bms', NEW.id, 'SOFT_DELETE_TRIGGER', v_old_data, v_new_data);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_fb_bms_soft_delete ON fb_bms;
CREATE TRIGGER trg_fb_bms_soft_delete
AFTER UPDATE ON fb_bms
FOR EACH ROW
WHEN (OLD.deleted IS DISTINCT FROM NEW.deleted)
EXECUTE FUNCTION trg_fb_bms_soft_delete();

--Pages
CREATE OR REPLACE FUNCTION trg_fb_pages_soft_delete()
RETURNS TRIGGER AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
BEGIN
    IF (OLD.deleted = FALSE AND NEW.deleted = TRUE) THEN
        v_old_data := to_jsonb(OLD);
        v_new_data := to_jsonb(NEW);

        INSERT INTO logs (user_id, table_name, record_id, action, old_data, new_data)
        VALUES (NEW.deleted_by, 'fb_pages', NEW.id, 'SOFT_DELETE_TRIGGER', v_old_data, v_new_data);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_fb_pages_soft_delete ON fb_pages;
CREATE TRIGGER trg_fb_pages_soft_delete
AFTER UPDATE ON fb_pages
FOR EACH ROW
WHEN (OLD.deleted IS DISTINCT FROM NEW.deleted)
EXECUTE FUNCTION trg_fb_pages_soft_delete();
