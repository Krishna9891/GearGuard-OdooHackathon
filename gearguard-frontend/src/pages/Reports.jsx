import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const Reports = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const axisColor = isDark ? '#9CA3AF' : '#6B7280';
    const gridColor = isDark ? '#374151' : '#E5E7EB';
    const tooltipBg = isDark ? '#1F2937' : '#FFFFFF';
    const tooltipText = isDark ? '#F3F4F6' : '#111827';

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="spinner"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-12 transition-colors duration-200">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <div className="flex justify-between items-center mb-8 animate-slide-up">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Detailed breakdown of maintenance performance.</p>
                    </div>
                </div>

                {/* Trend Chart */}
                <div className="mb-8 animate-slide-up">
                    <Card padding="lg">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Request Volume Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={stats?.charts?.trend}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: axisColor, fontSize: 12 }}
                                    dy={10}
                                    tickFormatter={(str) => {
                                        const date = new Date(str);
                                        return `${date.getDate()}/${date.getMonth() + 1}`;
                                    }}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ stroke: '#3B82F6', strokeWidth: 2 }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: tooltipBg, color: tooltipText }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>

                    {/* Workload by Team */}
                    <Card padding="lg">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Workload Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats?.charts?.byTeam} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                                <YAxis
                                    dataKey="team_name"
                                    type="category"
                                    width={100}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: axisColor, fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: isDark ? '#374151' : '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: tooltipBg, color: tooltipText }}
                                />
                                <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Request Status */}
                    <Card padding="lg">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Request Status</h3>
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
                                                new: '#3B82F6',
                                                in_progress: '#F59E0B',
                                                repaired: '#22C55E',
                                                scrap: '#EF4444'
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
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                    {stats?.overview?.total || 0}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                                    Total
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {/* Priority Distribution */}
                    <Card padding="lg">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Requests by Priority</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats?.charts?.byPriority}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                                <XAxis dataKey="priority" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} dy={10} tickFormatter={(val) => val.charAt(0).toUpperCase() + val.slice(1)} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: isDark ? '#374151' : '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: tooltipBg, color: tooltipText }}
                                />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                                    {stats?.charts?.byPriority.map((entry, index) => {
                                        const priorityColors = {
                                            low: '#3B82F6',
                                            medium: '#F59E0B',
                                            high: '#EF4444',
                                            critical: '#7F1D1D'
                                        };
                                        return <Cell key={`cell-${index}`} fill={priorityColors[entry.priority] || '#9CA3AF'} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Work Type Distribution (New) */}
                    <Card padding="lg">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Request Type Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={stats?.charts?.byType || []}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius={100}
                                    dataKey="count"
                                    nameKey="type"
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                                        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                                        return (percent * 100).toFixed(0) + '%';
                                    }}
                                    labelLine={false}
                                >
                                    {stats?.charts?.byType?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.type === 'preventive' ? '#10B981' : '#F97316'} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: tooltipBg, color: tooltipText }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value) => <span className="capitalize text-gray-600 dark:text-gray-300 ml-1">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Reports;
