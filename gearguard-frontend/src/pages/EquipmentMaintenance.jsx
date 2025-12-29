import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { FaArrowLeft, FaTools, FaCalendarAlt, FaUser, FaHistory } from 'react-icons/fa';

const EquipmentMaintenance = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [equipment, setEquipment] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [eqRes, reqRes] = await Promise.all([
                api.get(`/equipment/${id}`),
                api.get(`/requests?equipment_id=${id}`) // Corrected endpoint logic
            ]);

            setEquipment(eqRes.data.data);
            setRequests(reqRes.data.data);
        } catch (error) {
            console.error('Error fetching details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="spinner"></div>
        </div>
    );

    if (!equipment) return <div className="p-8 dark:text-white">Equipment not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/equipment')}
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Equipment
                    </button>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex justify-between items-start transition-colors duration-200">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{equipment.name}</h1>
                            <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center"><FaTools className="mr-2 text-gray-400" /> {equipment.serial_number}</span>
                                <span className="flex items-center"><FaCalendarAlt className="mr-2 text-gray-400" /> {equipment.category}</span>
                                <span className="flex items-center"><FaUser className="mr-2 text-gray-400" /> {equipment.assignedTeam?.name || 'Unassigned'}</span>
                            </div>
                        </div>
                        <div className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${equipment.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            }`}>
                            {equipment.status}
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-colors duration-200">
                        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Total Requests</div>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{requests.length}</div>
                    </div>
                </div>

                {/* Requests List */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <FaHistory className="mr-2 text-blue-600 dark:text-blue-400" /> Maintenance History
                </h2>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden transition-colors duration-200">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned To</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {requests.length > 0 ? (
                                requests.map((req) => (
                                    <tr key={req.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{req.subject}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{req.request_number}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${req.request_type === 'preventive'
                                                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
                                                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                                                }`}>
                                                {req.request_type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(req.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-gray-700">
                                                    {req.assignedTo?.full_name?.charAt(0) || '?'}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{req.assignedTo?.full_name || 'Unassigned'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${req.stage === 'new' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                                                req.stage === 'in_progress' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                                    req.stage === 'repaired' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                                        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                                }`}>
                                                {req.stage.replace('_', ' ')}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No maintenance requests found for this equipment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EquipmentMaintenance;
