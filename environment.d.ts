namespace NodeJS {
  interface ProcessEnv {
    URL: string;
    NODE_ENV: "development" | "production";
    PORT?: string;
    PWD: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
  }
}
