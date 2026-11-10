/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: string;
    readonly VITE_SITE_URL?: string;
    readonly VITE_CONTACT_EMAIL?: string;
    readonly VITE_WHATSAPP_NUMBER?: string;
    readonly VITE_PHONE_NUMBER?: string;
    readonly VITE_GA_MEASUREMENT_ID?: string;
    readonly VITE_FORM_API_URL?: string;
    readonly VITE_GOOGLE_MAPS_URL?: string;
    readonly VITE_LINKEDIN_URL?: string;
    readonly VITE_FACEBOOK_URL?: string;
    readonly VITE_INSTAGRAM_URL?: string;
    readonly [key: string]: string | undefined;
  }
}

// Ensure process.env is globally available in TypeScript without requiring @types/node in the browser bundle
declare const process: {
  env: NodeJS.ProcessEnv;
};
