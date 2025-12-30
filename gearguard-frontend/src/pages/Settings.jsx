import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaUser, FaBell, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';

const Settings = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="mb-6 flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-400">
                        <FaArrowLeft />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and system configurations.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <Card padding="lg">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
                                <FaUser size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
                                <p className="text-sm text-gray-500">Update your personal details.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <input type="text" value={user?.full_name} disabled className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input type="text" value={user?.email} disabled className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                <input type="text" value={user?.role} disabled className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase" />
                            </div>
                        </div>
                    </Card>

                    {/* Preferences */}
                    <Card padding="lg">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-warning-100 rounded-lg text-warning-600">
                                <FaBell size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Preferences</h2>
                                <p className="text-sm text-gray-500">Customize your experience.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                                <button
                                    onClick={toggleTheme}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-primary-600' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                                <div className="text-xs text-gray-500">Enabled (Managed by Admin)</div>
                            </div>
                        </div>
                    </Card>

                    <div className="flex justify-end">
                        <Button variant="primary">Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
