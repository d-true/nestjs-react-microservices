export enum Environment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
}

export enum AppResponse {
    SUCCESS = 'OK',
    ERROR = 'ERROR',
}

export enum UserRoles {
    'ADMIN' = 1,
    'USER' = 2,
}

export enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
}

export const DEFAULT_PAGE_LIMIT = 10;
export const DEFAULT_CURRENT_PAGE = 1;
export const MAX_PAGINATION_LIMIT = 50;
