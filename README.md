<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="380" alt="Laravel Logo">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PHP-8.1%2B-777BB4?logo=php&logoColor=white" />
  <img src="https://img.shields.io/badge/Laravel-11.x-FF2D20?logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-14%2B-316192?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-16%2B-339933?logo=node.js&logoColor=white" />
</p>

<br>

# 🚀 contin-php

Aplicação desenvolvida em **Laravel**, utilizando **PostgreSQL**, **Vite**, **Node**, **Composer** e **PHP 8+**.  
Este guia irá te ajudar a instalar e executar o projeto do zero.

---

## 📦 Pré-requisitos

Instale no seu computador:

- **PHP 8.x**
- **Composer**
- **PostgreSQL 14+**
- **Node.js 16+**
- **npm** (ou Yarn)
- **Git**

Recomendado:
- **DBeaver**, **pgAdmin**, **TablePlus** ou outro cliente DB.

---

## 📁 Clonando o Projeto

```bash
git clone https://github.com/Gustavo-VTAB/contin-php.git
cd contin-php

📚 Instalando dependências

🐘 Dependências PHP (Laravel)
composer install

📦 Dependências do Frontend (Vite)
npm install

⚙️ Configurando o arquivo .env

Crie o arquivo:
cp .env.example .env
Agora edite as configs principais, incluindo PostgreSQL:

APP_NAME=ContinPHP
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

# Banco de dados PostgreSQL
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=contin
DB_USERNAME=postgres
DB_PASSWORD=sua_senha

Gere a chave da aplicação:
php artisan key:generate


🗃️ Banco de Dados
Criar o banco:
CREATE DATABASE contin;

Rodar migrations e seeders:
php artisan migrate
php artisan db:seed


importar o arquivo .sql via pgAdmin ou DBeaver
Abra o cliente PostgreSQL → Import → selecione o dump → execute.

▶️ Rodando o Projeto
Backend (Laravel)
php artisan serve

Acesse:
👉 http://localhost:8000

Frontend (Vite)
Abra outro terminal:
npm run dev

🧹 Comandos úteis
Se algo quebrar, limpe tudo:
php artisan optimize:clear


Limpar manualmente:
php artisan config:clear
php artisan route:clear
php artisan cache:clear
php artisan view:clear

🛠️ Tecnologias Utilizadas
Laravel

PostgreSQL

PHP 8+

Node.js

Vite

Composer

npm

📌 Observações
O projeto usa PostgreSQL — certifique-se de não configurar MySQL.

Após alterar o .env, execute:

bash
Copiar código
php artisan config:clear
📄 Licença
Este projeto segue a licença MIT.
O framework Laravel também é open-source sob a licença MIT.
```
<p align="center">Feito com ❤️ por <strong>Fernanda Frois e Gustavo Novais</strong></p>
