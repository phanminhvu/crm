/// <reference types="vite/client" />

// vite import.meta.env 
interface ImportMetaEnv {
  readonly VITE_APP_APIHOST: string;
}
// vite import.meta.env
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

