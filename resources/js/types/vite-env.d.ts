/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
   readonly glob: <T = unknown>(pattern: string) => Record<string, T>;
  // Se tiver outras variáveis, adicione aqui, ex:
  // readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly VITE_APP_ENV: string;
}
