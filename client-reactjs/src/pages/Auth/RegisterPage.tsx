import Form from '../../components/Form.tsx';
import { register } from '../../features/auth/auth.service.ts';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { RegisterRequest } from '../../features/auth/auth.types.ts';

export default function RegisterPage() {
    const dispatch = useDispatch();

    return (
        <section>
            <div className="">
                <div className="col-1">
                    <h2 className="text-center">Sign Up</h2>
                    <Form
                        buttonText="Sign Up"
                        onSubmit={(data: RegisterRequest) =>
                            register({ data, dispatch })
                        }
                        formFields={[
                            {
                                type: 'input',
                                name: 'email',
                                options: {
                                    required: true,
                                    pattern:
                                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                },
                            },
                            {
                                type: 'input',
                                name: 'name',
                                options: {
                                    required: true,
                                    minLength: {
                                        value: 3,
                                        message: ' min length is 3 characters',
                                    },
                                },
                            },
                            {
                                type: 'input',
                                name: 'password',
                                options: {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: ' min length is 8 characters',
                                    },
                                },
                            },
                        ]}
                    />
                    <div className="text-center">
                        <Link to="/auth/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
