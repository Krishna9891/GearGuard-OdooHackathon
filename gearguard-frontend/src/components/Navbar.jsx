import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaSignOutAlt, FaUserCircle, FaCog, FaSearch, FaBell, FaMoon, FaSun, FaCheck, FaShieldAlt } from 'react-icons/fa';
import { useNotifications } from '../context/NotificationContext';

const Navbar = () => {

    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { notifications, markAllRead } = useNotifications(); // Use Context
    const navigate = useNavigate();
    const location = useLocation();

    // Dropdown states
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/' },
        { name: 'Equipment', path: '/equipment' },
        { name: 'Requests', path: '/requests' },
        { name: 'Calendar', path: '/calendar' },
        { name: 'Reports', path: '/reports' },
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm h-16 fixed w-full top-0 z-40 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo & Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 relative overflow-hidden">
                                <FaShieldAlt className="text-white text-[18px] relative z-10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FaCog className="text-white/20 text-3xl animate-spin-slow-reverse" />
                                </div>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">GearGuard</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:ml-10 md:flex md:space-x-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Bar (Hidden on mobile) */}
                        <div className="hidden md:flex relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                type="text"
                                className="block w-64 pl-10 pr-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                                placeholder="Search..."
                            />
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {theme === 'dark' ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
                        </button>

                        {/* Notifications */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                                className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <FaBell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white dark:ring-gray-800"></span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotifOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 border border-gray-100 dark:border-gray-700 z-50 animate-scale-up">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                        <span onClick={markAllRead} className="text-xs text-primary-600 dark:text-primary-400 font-medium cursor-pointer hover:underline">Mark all read</span>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="px-4 py-3 text-sm text-gray-500 text-center">No notifications</div>
                                        ) : (
                                            notifications.map((notif) => (
                                                <div key={notif.id} className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-50 dark:border-gray-700 last:border-0 cursor-pointer ${!notif.read ? 'bg-primary-50/30' : ''}`}>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">{notif.text}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 text-center">
                                        <button className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700">View all</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

                        {/* User Profile */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 focus:outline-none"
                            >
                                <div className="flex flex-col items-end hidden sm:flex">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.full_name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                        {user?.role}
                                    </span>
                                </div>

                                <div className="h-9 w-9 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-700 shadow-sm">
                                    <FaUserCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 border border-gray-100 dark:border-gray-700 z-50 animate-scale-up origin-top-right">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 md:hidden">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.full_name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                                    </div>
                                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <FaCog className="mr-3 text-gray-400" /> Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center px-4 py-2 text-sm text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20"
                                    >
                                        <FaSignOutAlt className="mr-3" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
