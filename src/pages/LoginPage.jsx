
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
const LoginPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
            <div className="max-w-[1368px] flex-1">
                <div className="container grid items-center gap-8 lg:grid-cols-2">
                    <div className="card">
                        <LoginForm />
                        <div className="py-4 lg:py-6">
                            <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                                Don’t have an account?
                                <Link
                                    className="text-white transition-all hover:text-lwsGreen hover:underline mx-2"
                                    to="/register"
                                >
                                    Create New
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
