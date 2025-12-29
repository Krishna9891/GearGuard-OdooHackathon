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
                        {dayEvents.map(ev => (
                            <div key={ev.id} className="text-[10px] bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-1.5 py-1 rounded truncate border border-primary-100 dark:border-primary-800/50">
                                {ev.subject}
                            </div>
                        ))}
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
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                                <FaChevronLeft />
                            </button>
                            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                                <FaChevronRight />
                            </button>
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
