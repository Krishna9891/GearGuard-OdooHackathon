import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { FaEnvelope, FaLock, FaUserSecret, FaUserTie, FaTools, FaCog, FaShieldAlt } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const quickLogin = (roleEmail) => {
        setEmail(roleEmail);
        setPassword('Password123!');
    };

    return (
        <div className="min-h-screen flex font-sans bg-gray-50 dark:bg-gray-900">
            {/* Left 50% - Hero Section */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-600 to-purple-700 relative items-center justify-center p-12 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <FaCog className="absolute top-10 left-10 text-9xl text-white animate-spin-slow" />
                    <FaCog className="absolute bottom-10 right-10 text-9xl text-white animate-spin-slow-reverse" />
                </div>

                <div className="relative z-10 text-center max-w-lg">
                    {/* Logo Icon */}
                    <div className="mx-auto w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-white/20 relative overflow-hidden group">
                        <FaShieldAlt className="text-white text-5xl relative z-10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FaCog className="text-white/20 text-[80px] animate-spin-slow" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                        Streamline Your <br />Maintenance Workflow
                    </h1>
                    <p className="text-primary-100 text-lg leading-relaxed">
                        Effortlessly track equipment, manage requests, and optimize your industrial operations with GearGuard's premium dashboard.
                    </p>
                </div>
            </div>

            {/* Right 50% - Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
                <div className="w-full max-w-[400px] space-y-8">
                    {/* Mobile Logo (Visible only on small screens) */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex w-16 h-16 bg-primary-600 rounded-2xl items-center justify-center shadow-lg mb-4 relative overflow-hidden">
                            <FaShieldAlt className="text-white text-3xl relative z-10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaCog className="text-white/20 text-5xl animate-spin-slow" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">GearGuard</h2>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-[30px] font-bold text-gray-900 dark:text-white mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Sign in to access your dashboard.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <Input
                                label="Email Address"
                                type="email"
                                required
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={FaEnvelope}
                                className="bg-white dark:bg-gray-900" // Explicit white bg override request
                            />
                            <Input
                                label="Password"
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={FaLock}
                                className="bg-white dark:bg-gray-900"
                            />

                            {error && (
                                <div className="bg-danger-50 border-l-4 border-danger-500 p-4 rounded-md animate-fade-in">
                                    <p className="text-sm text-danger-700 font-medium">{error}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full py-3 text-sm font-semibold shadow-md active:scale-[0.98]"
                                size="lg"
                                isLoading={isLoading}
                            >
                                Sign In
                            </Button>
                        </form>

                        {/* Quick Login Section */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                        Quick Login (Demo)
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2 justify-center">
                                <button
                                    onClick={() => quickLogin('admin@gearguard.com')}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors group"
                                    title="Admin Access"
                                >
                                    <FaUserSecret className="text-primary-600 text-lg group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin</span>
                                </button>
                                <button
                                    onClick={() => quickLogin('manager@gearguard.com')}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors group"
                                    title="Manager Access"
                                >
                                    <FaUserTie className="text-warning-600 text-lg group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Manager</span>
                                </button>
                                <button
                                    onClick={() => quickLogin('mitch@gearguard.com')}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors group"
                                    title="Tech Access"
                                >
                                    <FaTools className="text-success-600 text-lg group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Tech</span>
                                </button>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-primary-600 hover:text-primary-700 dark:text-primary-500 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
