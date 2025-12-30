import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import EquipmentForm from '../components/equipment/EquipmentForm';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useNotifications } from '../context/NotificationContext';
import { FaPlus, FaSearch, FaFilter, FaWrench, FaHistory, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [activeRequests, setActiveRequests] = useState({});
    const { addNotification } = useNotifications();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            const response = await api.get('/equipment');
            const equipmentData = response.data.data;
            setEquipment(equipmentData);
            equipmentData.forEach(eq => fetchRequestCount(eq.id));
        } catch (error) {
            console.error('Error fetching equipment:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRequestCount = async (id) => {
        try {
            const res = await api.get(`/equipment/${id}/requests`);
            setActiveRequests(prev => ({ ...prev, [id]: res.data.data.length }));
        } catch (err) {
            console.error(err);
        }
    }

    const handleCreate = async (data) => {
        await api.post('/equipment', data);
        addNotification(`New equipment added: ${data.name}`, 'success');
        fetchEquipment();
        setIsFormOpen(false);
    };

    const filteredEquipment = equipment.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.serial_number.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        // Assuming location or a 'department' field exists. If not, filtered by location for now as proxy or exact field if added.
        // The mock data usually has 'location' like "Zone A". Let's assume user wants to filter by that or add a department field.
        // Since I don't recall precise department field in seed.js on Equipment (it had assignedTeam), I will check item.department logic.
        // Actually earlier 'Equipment.jsx' showed `item.assignedTeam?.name`.
        const matchesDept = departmentFilter === 'all' || (item.location && item.location.includes(departmentFilter)) || (item.assignedTeam?.name && item.assignedTeam.name.includes(departmentFilter));
        return matchesSearch && matchesStatus && matchesDept;
    });

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="spinner"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-12 transition-colors duration-200">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-slide-up">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Equipments</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage machinery, assets, and tracking.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto relative z-10">
                        {/* Search */}
                        <div className="relative flex-grow md:flex-grow-0 md:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
                                placeholder="Search..."
                            />
                        </div>

                        {/* Filter Toggle */}
                        <div className="relative">
                            <Button
                                variant={showFilters ? 'primary' : 'secondary'}
                                icon={FaFilter}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                Filter
                            </Button>

                            {showFilters && (
                                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 z-50 animate-scale-up origin-top-right">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Status</label>
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                                            >
                                                <option value="all">All Statuses</option>
                                                <option value="active">Active</option>
                                                <option value="under_maintenance">Under Maintenance</option>
                                                <option value="scrapped">Scrapped</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Assigned Team</label>
                                            <select
                                                value={departmentFilter}
                                                onChange={(e) => setDepartmentFilter(e.target.value)}
                                                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                                            >
                                                <option value="all">All Teams</option>
                                                <option value="Unassigned">Unassigned</option>
                                                <option value="Electrical">Electrical</option>
                                                <option value="Hydraulic">Hydraulic</option>
                                                <option value="Logistics">Logistics</option>
                                                <option value="Mechanical">Mechanical</option>
                                                <option value="Safety Inspectors">Safety Inspectors</option>
                                            </select>
                                        </div>
                                        <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                                            <button onClick={() => { setStatusFilter('all'); setDepartmentFilter('all'); }} className="text-xs text-gray-500 hover:text-gray-700">Reset</button>
                                            <button onClick={() => setShowFilters(false)} className="text-xs text-primary-600 font-bold">Done</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Add Asset Button */}
                        <Button
                            variant="primary"
                            icon={FaPlus}
                            onClick={() => {
                                console.log('Opening Form');
                                setIsFormOpen(true);
                            }}
                        >
                            Add Asset
                        </Button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    {filteredEquipment.map((item) => (
                        <Card key={item.id} variant="equipment" padding="none" className="group overflow-hidden">
                            {/* Card Header Illustration */}
                            <div className="h-24 bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center relative transition-colors duration-200">
                                <div className="absolute top-3 right-3">
                                    <Badge
                                        variant="status"
                                        type={item.status === 'active' ? 'success' : item.status === 'scrapped' ? 'neutral' : 'warning'}
                                    >
                                        {item.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm">
                                    <FaWrench className="text-gray-400 dark:text-gray-300" />
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{item.name}</h3>
                                    <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">{item.serial_number}</p>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                                        {item.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <FaUsers className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                                        {item.assignedTeam?.name || 'Unassigned'}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        className="flex-1 text-xs relative dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                                        onClick={() => navigate(`/equipment/${item.id}/maintenance`)}
                                    >
                                        <FaHistory className="mr-1" /> History
                                    </Button>

                                    {/* Smart Button */}
                                    <Button
                                        variant="primary"
                                        className="flex-1 text-xs relative"
                                        onClick={() => navigate(`/equipment/${item.id}/maintenance`)}
                                    >
                                        <FaWrench className="mr-1" /> Issues
                                        {activeRequests[item.id] > 0 && (
                                            <Badge variant="count">{activeRequests[item.id]}</Badge>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <EquipmentForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleCreate}
                />
            </div>
        </div>
    );
};

export default Equipment;
