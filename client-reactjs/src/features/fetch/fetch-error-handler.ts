import { AppResponse, AppResponseError } from '../app.types.ts';

const fetchErrorHandler = (e: unknown) => {
    console.error(e);
    let errotText: string = '';
    if ((e as AppResponse).message === 'ERROR') {
        errotText = (e as AppResponseError).error as string;
    } else if (e instanceof Error) {
        errotText = e.message;
    } else {
        if (typeof e === 'object' && (e as AppResponse).message) {
            const message = (e as AppResponse).message;
            if (typeof message === 'string') {
                errotText = message;
            } else if (Array.isArray(message)) {
                message.map((m) => {
                    if (m.constraints) {
                        errotText +=
                            Object.values(m.constraints).join(', ') + '\n';
                    }
                });
            }
        }
    }
    alert('Error: ' + errotText);
};

export default fetchErrorHandler;
