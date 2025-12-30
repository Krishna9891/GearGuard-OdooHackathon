import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaClipboardList, FaExclamationTriangle, FaCheckCircle, FaTools, FaArrowRight } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    // Chart Colors based on Theme
    const isDark = theme === 'dark';
    const axisColor = isDark ? '#9CA3AF' : '#6B7280';
    const gridColor = isDark ? '#374151' : '#E5E7EB';
    const tooltipBg = isDark ? '#1F2937' : '#FFFFFF';
    const tooltipText = isDark ? '#F3F4F6' : '#111827';

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await api.get('/dashboard/stats');
            setStats(response.data.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="spinner"></div>
        </div>
    );

    const COLORS = ['#F59E0B', '#F97316', '#22C55E', '#EF4444']; // Info, Warning, Success, Danger

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-12 transition-colors duration-200">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">

                {/* Header Section */}
                <div className="flex justify-between items-center mb-8 animate-slide-up">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time insights into maintenance operations.</p>
                    </div>
                    <Link to="/requests">
                        <Button variant="primary">
                            + New Request
                        </Button>
                    </Link>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <Card variant="stat" padding="md" className="relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-4 bg-primary-500/10 rounded-2xl text-primary-600 dark:text-primary-400 text-2xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 backdrop-blur-sm shadow-sm ring-1 ring-primary-500/20">
                                    <FaClipboardList />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total</span>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.overview?.total}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">All Time Requests</p>
                        </div>
                    </Card>

                    <Card variant="stat" padding="md" className="relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-4 bg-info-500/10 rounded-2xl text-info-600 dark:text-info-400 text-2xl group-hover:bg-info-600 group-hover:text-white transition-all duration-300 backdrop-blur-sm shadow-sm ring-1 ring-info-500/20">
                                    <FaTools />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Active</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.overview?.new + stats?.overview?.in_progress}</h3>
                                <span className="text-xs font-medium text-warning-600 mb-1">+2 from yesterday</span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">In Pipeline</p>
                        </div>
                    </Card>

                    <Card variant="stat" padding="md" className="relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-4 bg-success-500/10 rounded-2xl text-success-600 dark:text-success-400 text-2xl group-hover:bg-success-600 group-hover:text-white transition-all duration-300 backdrop-blur-sm shadow-sm ring-1 ring-success-500/20">
                                    <FaCheckCircle />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Completed</span>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.overview?.repaired}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Successfully Repaired</p>
                        </div>
                    </Card>

                    <Card variant="stat" padding="md" className="relative overflow-hidden group border-danger-100 bg-danger-50/50">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-4 rounded-2xl text-2xl transition-all duration-300 backdrop-blur-sm shadow-sm ${stats?.overview?.overdue > 0 ? 'bg-danger-500/10 text-danger-600 dark:text-danger-400 ring-1 ring-danger-500/20 group-hover:bg-danger-600 group-hover:text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <FaExclamationTriangle />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-danger-400">Attention</span>
                            </div>
                            <h3 className={`text-3xl font-bold ${stats?.overview?.overdue > 0 ? 'text-danger-600' : 'text-gray-900'}`}>{stats?.overview?.overdue}</h3>
                            <p className="text-sm text-gray-500">Overdue Requests</p>
                        </div>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <Card padding="lg">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Workload by Team</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats?.charts?.byTeam}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                                <XAxis dataKey="team_name" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: isDark ? '#374151' : '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: tooltipBg, color: tooltipText }}
                                />
                                <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    <Card padding="lg">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Request Distribution</h3>
                        <div className="relative h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats?.charts?.byStage}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="count"
                                        nameKey="stage"
                                        stroke="none"
                                    >
                                        {stats?.charts?.byStage.map((entry, index) => {
                                            const stageColors = {
                                                new: '#3B82F6', // Blue
                                                in_progress: '#F59E0B', // Amber
                                                repaired: '#22C55E', // Green
                                                scrap: '#EF4444' // Red
                                            };
                                            return <Cell key={`cell-${index}`} fill={stageColors[entry.stage] || '#9CA3AF'} />;
                                        })}
                                    </Pie>
                                    <Tooltip
                                        cursor={false}
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                            backgroundColor: tooltipBg,
                                            color: tooltipText,
                                            padding: '12px'
                                        }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                        formatter={(value) => <span className="capitalize text-gray-600 dark:text-gray-300 ml-1">{value.replace('_', ' ')}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Central Label */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                    {stats?.overview?.total || 0}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                                    Requests
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card padding="none" className="overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Requests</h3>
                        <Link to="/requests" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center">
                            View All <FaArrowRight className="ml-1 text-xs" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Request ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Message Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {stats?.recentRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{req.request_number}</code>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{req.subject}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{req.equipment?.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                            {req.team?.name || 'Unassigned'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant="priority" type={req.priority} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge
                                                variant="status"
                                                type={
                                                    req.stage === 'scrap' ? 'danger' :
                                                        req.stage === 'repaired' ? 'success' :
                                                            req.stage === 'in_progress' ? 'warning' : 'info'
                                                }
                                            >
                                                {req.stage.replace('_', ' ')}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
