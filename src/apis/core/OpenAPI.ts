/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from './ApiRequestOptions';

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

type Config = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    APPID?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
    ENCODE_PATH?: (path: string) => string;
}

export const OpenAPI: Config = {
    BASE: 'https://10.11.10.13:9092/api',
    VERSION: '1',
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'include',
    TOKEN: localStorage.getItem('access_token') || '',
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: undefined,
    ENCODE_PATH: undefined,
    APPID: 'FC1E5A4B-3027-43F2-BE61-8CB5FF60D2A7',
};
