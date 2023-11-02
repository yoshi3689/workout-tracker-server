namespace NodeJS {
  interface ProcessEnv {
    URL: string;
    NODE_ENV: "development" | "production";
    PORT?: string;
    PWD: string;
  }
}
