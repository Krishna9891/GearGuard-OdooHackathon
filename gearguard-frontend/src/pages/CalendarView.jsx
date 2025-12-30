import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CalendarView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, [currentDate]);

    const fetchEvents = async () => {
        const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
        const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();

        try {
            const response = await api.get('/requests', { params: { start, end } });
            setEvents(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const renderCalendar = () => {
        const days = [];
        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-32 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"></div>);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.scheduled_date?.startsWith(dateStr));
            const isToday = new Date().toISOString().startsWith(dateStr);

            days.push(
                <div key={i} className={`h-32 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${isToday ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-semibold rounded-full w-7 h-7 flex items-center justify-center ${isToday
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-700 dark:text-gray-300'
                            }`}>
                            {i}
                        </span>
                    </div>
                    <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                        {dayEvents.map(ev => {
                            let colorClass = 'bg-primary-50 text-priority-700 border-primary-100';
                            if (ev.priority === 'critical') colorClass = 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
                            else if (ev.priority === 'high') colorClass = 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800';
                            else if (ev.priority === 'medium') colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
                            else if (ev.stage === 'repaired') colorClass = 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
                            else colorClass = 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';

                            return (
                                <div key={ev.id} className={`text-[10px] px-1.5 py-1 rounded truncate border ${colorClass}`}>
                                    {ev.subject}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return days;
    };

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Maintenance Schedule</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">View upcoming and past maintenance activities.</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                                    <FaChevronLeft />
                                </button>
                                <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>

                        {/* Month Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg border border-primary-100 dark:border-primary-800">
                                <span className="text-xs text-primary-600 dark:text-primary-400 font-bold uppercase">Total Requests</span>
                                <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                                    {events.filter(e => new Date(e.scheduled_date).getMonth() === currentDate.getMonth()).length}
                                </div>
                            </div>
                            <div className="bg-success-50 dark:bg-success-900/20 p-3 rounded-lg border border-success-100 dark:border-success-800">
                                <span className="text-xs text-success-600 dark:text-success-400 font-bold uppercase">Completed</span>
                                <div className="text-2xl font-bold text-success-700 dark:text-success-300">
                                    {events.filter(e => new Date(e.scheduled_date).getMonth() === currentDate.getMonth() && e.stage === 'repaired').length}
                                </div>
                            </div>
                            <div className="bg-warning-50 dark:bg-warning-900/20 p-3 rounded-lg border border-warning-100 dark:border-warning-800">
                                <span className="text-xs text-warning-600 dark:text-warning-400 font-bold uppercase">In Progress</span>
                                <div className="text-2xl font-bold text-warning-700 dark:text-warning-300">
                                    {events.filter(e => new Date(e.scheduled_date).getMonth() === currentDate.getMonth() && e.stage === 'in_progress').length}
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Month</span>
                                <div className="text-xl font-bold text-gray-700 dark:text-gray-200">
                                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid Header */}
                    <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Grid Body */}
                    <div className="grid grid-cols-7 bg-gray-200 dark:bg-gray-700 gap-px">
                        {renderCalendar()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
