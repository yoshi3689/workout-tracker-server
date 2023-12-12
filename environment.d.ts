namespace NodeJS {
  interface ProcessEnv {
    URL: string;
    CORS_URL: string;
    NODE_ENV: "development" | "production";
    PORT?: string;
    PWD: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    JWTSECRET: string;
    EMAIL: string;
    APPPASSWORD: string;
  }
}
