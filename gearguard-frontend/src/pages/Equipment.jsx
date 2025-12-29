import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import EquipmentForm from '../components/equipment/EquipmentForm';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { FaPlus, FaSearch, FaFilter, FaWrench, FaHistory, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeRequests, setActiveRequests] = useState({});
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
        fetchEquipment();
        setIsFormOpen(false);
    };

    const filteredEquipment = equipment.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serial_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Search by name or serial..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="secondary" icon={FaFilter} className="hidden sm:flex">Filter</Button>
                        <Button variant="primary" icon={FaPlus} onClick={() => setIsFormOpen(true)}>
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
