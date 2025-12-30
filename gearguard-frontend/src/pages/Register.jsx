import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { FaUser, FaEnvelope, FaLock, FaCog, FaShieldAlt } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        role: 'technician' // default
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await api.post('/auth/register', formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
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
                        Join the Revolution <br />in Maintenance
                    </h1>
                    <p className="text-primary-100 text-lg leading-relaxed">
                        Create your account today and start optimizing your equipment reliability with GearGuard's advanced tools.
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
                            Create Account
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Set up your profile to get started.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <Input
                                label="Full Name"
                                required
                                placeholder="John Doe"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                icon={FaUser}
                                className="bg-white dark:bg-gray-900"
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                required
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                icon={FaEnvelope}
                                className="bg-white dark:bg-gray-900"
                            />
                            <Input
                                label="Password"
                                type="password"
                                required
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                icon={FaLock}
                                className="bg-white dark:bg-gray-900"
                            />
                            <Input
                                label="Role"
                                type="select"
                                required
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                options={[
                                    { value: 'technician', label: 'Technician' },
                                    { value: 'manager', label: 'Manager' },
                                    { value: 'admin', label: 'Admin' }
                                ]}
                                className="bg-white dark:bg-gray-900"
                            />

                            {error && (
                                <div className="bg-danger-50 border-l-4 border-danger-500 p-4 rounded-md">
                                    <p className="text-sm text-danger-700 font-medium">{error}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full py-3 text-sm font-semibold shadow-md active:scale-[0.98]"
                                size="lg"
                                isLoading={isLoading}
                            >
                                Create Account
                            </Button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700 dark:text-primary-500 hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
