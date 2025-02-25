import { RegisterOptions } from 'react-hook-form';

export type FormProps = {
    formFields: {
        type: 'input' | 'select' | 'textarea';
        name: string;
        value?: string;
        options?: RegisterOptions;
        placeholder?: string;
        selectOptions?: {
            text: string;
            value: string;
        }[];
    }[];
    buttonText: string;
    onSubmit: (data: any) => Promise<void>;
    onSubmitUpdate?: (data: any) => Promise<void>;
    updateFields?: {
        idField: string;
        fields: Record<string, any>;
        skipFields?: string[];
    } | null;
};
