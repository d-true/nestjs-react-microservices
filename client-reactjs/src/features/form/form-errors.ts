import { FieldErrors } from 'react-hook-form';

export default function formErrors(errors: FieldErrors): string[] {
    const parsedErrors: string[] = [];
    Object.keys(errors).map((key) => {

        const errorMessage = errors[key]?.message as string

        if (errors[key]?.type === 'required') {
            parsedErrors.push(
                (errorMessage || key + ' is required')
            );
        }
        if (errors[key]?.type === 'minLength') {
            parsedErrors.push(
                (errorMessage || key + ' minLength is errored'),
            );
        }

        if (errors[key]?.type === 'pattern') {
            parsedErrors.push(
                (errorMessage || key + ' is invalid')
            );
        }
    });
    return parsedErrors;
}
