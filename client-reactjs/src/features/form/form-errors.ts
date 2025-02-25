import { FieldErrors } from 'react-hook-form';

export default function formErrors(errors: FieldErrors): string[] {
    const parsedErrors: string[] = [];
    Object.keys(errors).map((key) => {
        if (errors[key]?.type === 'required') {
            parsedErrors.push(key + ' is required');
        }
        if (errors[key]?.type === 'minLength') {
            parsedErrors.push(
                key + (errors[key]?.message ?? ' minLength is errored'),
            );
        }

        if (errors[key]?.type === 'pattern') {
            parsedErrors.push(key + ' is invalid');
        }
    });
    return parsedErrors;
}
