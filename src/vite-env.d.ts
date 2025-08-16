

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_DEBUG: string;
  readonly VITE_LOG_LEVEL: string;
  readonly VITE_ENABLE_DEV_TOOLS: string;
  readonly VITE_ENABLE_HOT_RELOAD: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_ERROR_REPORTING: string;
  readonly VITE_CACHE_DURATION: string;
  readonly VITE_MOCK_API: string;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
