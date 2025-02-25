export type AllConfigType = {
    app: AppConfig;
    database: DatabaseConfig;
};

export type AppConfig = {
    nodeEnv: string;
    name: string;
    url: string;
    host: string;
    port: number;
    debug: boolean;

    authTokenAccessSecret?: string;
    authTokenAccessExpire: number;
    authTokenRefreshSecret?: string;
    authTokenRefreshExpire: number;

    logLevel: string;
    logFile: boolean;
    logFilePath?: string;
    logFileLimit: number;
    logFileSize: string;

    uploadFilePath?: string;
};

export type DatabaseConfig = {
    type: string;
    host: string;
    port: number;
    name: string;
    password: string;
    username: string;
    maxConnections: number;
};
