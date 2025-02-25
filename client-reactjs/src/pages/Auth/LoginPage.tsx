import Form from '../../components/Form.tsx';
import { Link } from 'react-router';
import { login } from '../../features/auth/auth.service.ts';
import { useDispatch } from 'react-redux';
import { LoginRequest } from '../../features/auth/auth.types.ts';

export default function LoginPage() {
    const dispatch = useDispatch();

    return (
        <section>
            <div className="">
                <div className="col-1">
                    <h2 className="text-center">Sign In</h2>
                    <Form
                        buttonText="Sign In"
                        onSubmit={(data: LoginRequest) =>
                            login({ data, dispatch })
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
                                name: 'password',
                                options: { required: true },
                            },
                        ]}
                    />
                    <div className="text-center">
                        <Link to="/auth/register">Sign Up</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
