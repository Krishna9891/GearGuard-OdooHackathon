import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([
        { id: 1, text: "Welcome to GearGuard!", time: "Just now", read: false, type: 'info' }
    ]);

    const [toast, setToast] = useState(null);

    const addNotification = (text, type = 'info') => {
        const newNotif = {
            id: Date.now(),
            text,
            time: 'Just now',
            read: false,
            type
        };
        setNotifications(prev => [newNotif, ...prev]);

        // Trigger Toast
        setToast({ text, type, id: Date.now() });

        // Clear toast after 3 seconds
        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    // Simulation: Random notifications every 60 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const events = [
                "Low coolant level detected in Hydraulic Press",
                "New maintenance request assigned to you",
                "Shift report generated",
                "Backup completed successfully"
            ];
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            // Only add occasionally
            if (Math.random() > 0.7) {
                addNotification(randomEvent, 'warning');
            }
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllRead }}>
            {children}
            {/* Toast Component */}
            {toast && (
                <div className={`fixed top-20 right-5 z-50 px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-left transition-all duration-300 border border-white/10 ${toast.type === 'error' ? 'bg-red-500 text-white' :
                        toast.type === 'success' ? 'bg-green-500 text-white' :
                            toast.type === 'warning' ? 'bg-orange-500 text-white' :
                                'bg-gray-800 text-white'
                    }`} style={{ minWidth: '300px' }}>
                    <div className="flex-1">
                        <h4 className="font-bold text-sm capitalize">{toast.type}</h4>
                        <p className="text-xs opacity-90">{toast.text}</p>
                    </div>
                    <button onClick={() => setToast(null)} className="text-white/70 hover:text-white">✕</button>
                </div>
            )}
        </NotificationContext.Provider>
    );
};
