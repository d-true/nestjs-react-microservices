export enum UserRoles {
    'ADMIN' = 1,
    'USER' = 2,
}

export type AppResponse = AppResponseError | AppResponseSuccess;

export type AppResponseError = {
    message: 'ERROR' | ValidationError;
    error: string;
};

export type AppResponseSuccess = {
    message: 'OK';
};

// from nest validation interface
type ValidationError = {
    target?: Record<string, any>;
    property: string;
    value?: any;
    constraints?: {
        [p: string]: string;
    };
    children?: ValidationError[];
    contexts?: {
        [p: string]: any;
    };
}[];
