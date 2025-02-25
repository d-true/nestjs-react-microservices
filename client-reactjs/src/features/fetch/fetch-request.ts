import { SERVER_API_URL } from '../../config';
import store from '../../store/configure-store.ts';

const fetchRequest = async <TResponse>(
    url: string,
    config: RequestInit,
): Promise<TResponse> => {
    const headers: HeadersInit =
        config.headers &&
        Object.getOwnPropertyNames(config.headers).length === 0
            ? {}
            : { 'Content-Type': 'application/json' };

    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
        headers.Authorization = 'Bearer ' + accessToken;
    }

    return fetch(SERVER_API_URL + url, {
        ...config,
        headers,
        credentials: 'include',
    })
        .then((response) => response.json())
        .then((data) => data as TResponse)
        .catch((error) => {
            throw error;
        });
};

export default fetchRequest;
