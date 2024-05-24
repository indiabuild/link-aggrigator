/// <reference types="@solidjs/start/env" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CLIENT_REDIRECT: string;
    }
  }
}

export {};
