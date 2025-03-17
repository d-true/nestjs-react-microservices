export enum Environment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
}

export enum AppResponse {
    SUCCESS = 'OK',
    ERROR = 'ERROR',
}

export const USER_SERVICE = Symbol('USER_SERVICE');
export const COMMENT_SERVICE = Symbol('COMMENT_SERVICE');

export enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
}

export const CommentDeleteOnOptions = ['disabled', '1h', '1d', '1w'] as const;

export enum UserRoles {
    'ADMIN' = 1,
    'USER' = 2,
}
