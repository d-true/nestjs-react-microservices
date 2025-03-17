import { AppResponse } from '../common/constants/app.constants';
import { ERROR_RESPONSES } from '../common/constants/errors.constants';

export function appResponseError(error: string): {
    message: AppResponse.ERROR;
    error: string;
} {
    return {
        message: AppResponse.ERROR,
        error: getChainProperties(error),
    };
}

function getChainProperties(error: string): string {
    const flattened = {};
    const stack: { obj: typeof ERROR_RESPONSES; prefix: string }[] = [];

    stack.push({ obj: ERROR_RESPONSES, prefix: '' });

    while (stack.length > 0) {
        const stackItem = stack.pop();
        const obj = stackItem!.obj;
        const prefix = stackItem!.prefix;

        for (const key in obj) {
            const value = obj[key] as string;
            const newKey = prefix + key;
            if (typeof value === 'object' && value !== null) {
                stack.push({ obj: value, prefix: newKey + '.' });
            } else {
                flattened[newKey] = value;
            }
        }
    }

    const result = Object.keys(flattened).find(
        (key) => flattened[key] === error,
    );

    if (result) {
        return result;
    } else {
        return error;
    }
}
