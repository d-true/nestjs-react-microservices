import { FormProps } from '../features/form/form.types.ts';
import { useForm } from 'react-hook-form';
import formErrors from '../features/form/form-errors.ts';
import { useEffect, useState } from 'react';

export default function Form({
    formFields,
    buttonText,
    onSubmit,
    onSubmitUpdate,
    updateFields,
}: FormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
        setValue,
    } = useForm();

    const [formUpdateFields, setFormUpdateFields] = useState<
        FormProps['updateFields'] | null
    >(null);

    const allReset = () => {
        reset();
        setFormUpdateFields(null);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            allReset();
        }
    }, [isSubmitSuccessful]);

    useEffect(() => {
        if (formUpdateFields) {
            formFields.map((field) => {
                const fieldValue = formUpdateFields.fields[field.name];
                if (
                    fieldValue &&
                    !formUpdateFields.skipFields?.includes(field.name)
                ) {
                    setValue(field.name, fieldValue);
                }
            });

            setValue(
                formUpdateFields.idField,
                formUpdateFields.fields[formUpdateFields.idField],
            );
        }
    }, [formUpdateFields]);

    useEffect(() => {
        if (updateFields) {
            setFormUpdateFields(updateFields);
        }
    }, [updateFields]);

    return (
        <form
            className="flex flex-col form"
            onSubmit={handleSubmit(
                formUpdateFields && onSubmitUpdate ? onSubmitUpdate : onSubmit,
            )}
        >
            {formFields.map((field) => {
                if (field.type === 'input') {
                    return (
                        <input
                            key={field.name}
                            type="text"
                            {...register(field.name, field.options)}
                            placeholder={field.placeholder ?? field.name}
                        />
                    );
                } else if (field.type === 'textarea') {
                    return (
                        <textarea
                            key={field.name}
                            {...register(field.name, field.options)}
                            placeholder={field.placeholder ?? field.name}
                        />
                    );
                } else if (field.type === 'select') {
                    if (
                        !field.selectOptions ||
                        !Array.isArray(field.selectOptions)
                    ) {
                        return null;
                    }
                    return (
                        <select
                            key={field.name}
                            {...register(field.name, field.options)}
                        >
                            {field.selectOptions.map((o) => (
                                <option value={o.value} key={o.value}>
                                    {o.text}
                                </option>
                            ))}
                        </select>
                    );
                }
            })}
            {errors && Object.keys(errors).length > 0
                ? formErrors(errors).map((error, index) => {
                      return <div key={index}>{error}</div>;
                  })
                : null}
            <button className="btn">
                {formUpdateFields ? 'Update' : buttonText}
            </button>
            {formUpdateFields ? (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        allReset();
                    }}
                    className="btn"
                >
                    Reset update
                </button>
            ) : null}
        </form>
    );
}
