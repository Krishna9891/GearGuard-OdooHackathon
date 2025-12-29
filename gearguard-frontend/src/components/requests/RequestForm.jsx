import { useState, useEffect } from 'react';
import api from '../../services/api';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { FaChevronRight, FaStar, FaGem } from 'react-icons/fa';

const RequestForm = ({ isOpen, onClose, selectedDate, onEventSaved }) => {
    const [activeTab, setActiveTab] = useState('notes');
    const [equipmentList, setEquipmentList] = useState([]);
    const [workCenters, setWorkCenters] = useState([]);

    const [teams, setTeams] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const [formData, setFormData] = useState({
        subject: '',
        request_type: 'corrective', // corrective, preventive
        equipment_id: '',
        work_center_id: '',
        scheduled_date: selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : '',
        priority: 'medium',
        duration: 60,
        description: '',
        instructions: '',
        target_type: 'equipment', // equipment vs work_center toggle
        team_id: '',
        assigned_to: ''
    });

    useEffect(() => {
        if (isOpen) {
            fetchResources();
            if (selectedDate) {
                setFormData(prev => ({
                    ...prev,
                    scheduled_date: new Date(selectedDate).toISOString().split('T')[0]
                }));
            }
        }
    }, [isOpen, selectedDate]);

    // Fetch Resources
    const fetchResources = async () => {
        try {
            const [eqRes, wcRes, teamRes, techRes] = await Promise.all([
                api.get('/equipment'),
                api.get('/work-centers'),
                api.get('/teams'),
                api.get('/auth/users?role=technician')
            ]);
            setEquipmentList(eqRes.data.data);
            setWorkCenters(wcRes.data.data);
            setTeams(teamRes.data.data);
            setTechnicians(techRes.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Auto-fill logic when equipment changes
    const handleEquipmentChange = async (eqId) => {
        setFormData(prev => ({ ...prev, equipment_id: eqId }));

        if (!eqId) return;

        try {
            const res = await api.get(`/equipment/${eqId}`);
            const eq = res.data.data;

            // Auto-select team/technician if available, but allow override
            setFormData(prev => ({
                ...prev,
                equipment_id: eqId,
                team_id: eq.assignedTeam?.id || prev.team_id,
                assigned_to: eq.defaultTechnician?.id || prev.assigned_to
            }));
        } catch (error) {
            console.error("Auto-fill error", error);
        }
    };

    const handleSubmit = async () => {
        try {
            // Prepare payload: convert empty strings to null/undefined
            const payload = { ...formData };

            // Remove auxiliary fields
            if (payload.target_type === 'equipment') {
                payload.work_center_id = null;
            } else {
                payload.equipment_id = null;
            }
            delete payload.target_type;

            // Clean IDs
            if (!payload.team_id) payload.team_id = null;
            if (!payload.assigned_to) payload.assigned_to = null;
            if (!payload.equipment_id) payload.equipment_id = null;
            if (!payload.work_center_id) payload.work_center_id = null;

            await api.post('/requests', payload);
            if (onEventSaved) onEventSaved();
            onClose();
        } catch (error) {
            console.error('Submission error:', error);
            // Show more specific error if available
            const msg = error.response?.data?.message || 'Failed to create request';
            alert(msg);
        }
    };

    const footer = (
        <>
            <Button variant="secondary" onClick={onClose}>Discard</Button>
            <Button variant="primary" onClick={handleSubmit}>Create Request</Button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="New Maintenance Request"
            footer={footer}
            size="lg"
        >
            {/* Header / Breadcrumbs */}
            <div className="flex items-center space-x-2 text-sm mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
                <span className="font-semibold text-primary-600 dark:text-primary-500">New Request</span>
                <FaChevronRight className="text-gray-400 dark:text-slate-600 text-xs" />
                <span className="text-gray-500 dark:text-slate-500">In Progress</span>
                <FaChevronRight className="text-gray-400 dark:text-slate-600 text-xs" />
                <span className="text-gray-500 dark:text-slate-500">Repaired</span>
            </div>

            <div className="space-y-6">
                {/* Subject Line (Large) */}
                <div className="col-span-1">
                    <Input
                        placeholder="e.g. Conveyor Belt Stuck"
                        className="text-lg font-medium !py-4"
                        containerClassName="mb-6"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                </div>

                {/* Main Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Radio Switch */}
                        <div className="flex gap-6">
                            <label className="flex items-center cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border-2 mr-2.5 flex items-center justify-center transition-colors ${formData.target_type === 'equipment' ? 'border-primary-500' : 'border-gray-400 dark:border-slate-500'}`}>
                                    {formData.target_type === 'equipment' && <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                                </div>
                                <span className={`text-sm font-medium ${formData.target_type === 'equipment' ? 'text-gray-900 dark:text-slate-200' : 'text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300'}`}>Equipment</span>
                            </label>
                            <label className="flex items-center cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border-2 mr-2.5 flex items-center justify-center transition-colors ${formData.target_type === 'work_center' ? 'border-primary-500' : 'border-gray-400 dark:border-slate-500'}`}>
                                    {formData.target_type === 'work_center' && <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                                </div>
                                <span className={`text-sm font-medium ${formData.target_type === 'work_center' ? 'text-gray-900 dark:text-slate-200' : 'text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300'}`}>Work Center</span>
                            </label>
                        </div>

                        {formData.target_type === 'equipment' ? (
                            <div className="animate-fade-in">
                                <Input
                                    label="Equipment"
                                    type="select"
                                    value={formData.equipment_id}
                                    onChange={(e) => handleEquipmentChange(e.target.value)}
                                    options={[
                                        { value: '', label: 'Select Equipment...' },
                                        ...equipmentList.map(eq => ({ value: eq.id, label: eq.name }))
                                    ]}
                                />
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <Input
                                    label="Work Center"
                                    type="select"
                                    value={formData.work_center_id}
                                    onChange={(e) => setFormData({ ...formData, work_center_id: e.target.value })}
                                    options={[
                                        { value: '', label: 'Select Work Center...' },
                                        ...workCenters.map(wc => ({ value: wc.id, label: wc.name }))
                                    ]}
                                />
                            </div>
                        )}

                        <Input
                            label="Request Type"
                            type="select"
                            value={formData.request_type}
                            onChange={(e) => setFormData({ ...formData, request_type: e.target.value })}
                            options={[
                                { value: 'corrective', label: 'Corrective' },
                                { value: 'preventive', label: 'Preventive' }
                            ]}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <Input
                            label="Scheduled Date"
                            type="date"
                            value={formData.scheduled_date}
                            onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                        />

                        {/* Priority Buttons */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">Priority</label>
                            <div className="flex gap-3">
                                {['low', 'medium', 'high', 'critical'].map((p) => {
                                    const isSelected = formData.priority === p;
                                    let activeClass = '';
                                    let iconColor = '';

                                    switch (p) {
                                        case 'low':
                                            activeClass = 'border-primary-500 bg-primary-50/10 dark:bg-primary-500/10';
                                            iconColor = isSelected ? 'text-primary-500' : 'text-slate-400';
                                            break;
                                        case 'medium':
                                            activeClass = 'border-primary-500 bg-primary-50/15 dark:bg-primary-500/15';
                                            iconColor = 'text-primary-500';
                                            break;
                                        case 'high':
                                            activeClass = 'border-warning-500 bg-warning-50/15 dark:bg-warning-500/15';
                                            iconColor = 'text-warning-500';
                                            break;
                                        case 'critical':
                                            activeClass = 'border-danger-500 bg-danger-50/15 dark:bg-danger-500/15 shadow-[0_0_12px_rgba(239,68,68,0.4)]';
                                            iconColor = 'text-danger-500';
                                            break;
                                        default: break;
                                    }

                                    return (
                                        <button
                                            key={p}
                                            onClick={() => setFormData({ ...formData, priority: p })}
                                            className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-200 hover:scale-105 ${isSelected
                                                ? activeClass
                                                : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-500'
                                                }`}
                                            title={p.charAt(0).toUpperCase() + p.slice(1)}
                                        >
                                            <Badge variant="priority" type={p} iconOnly className={iconColor} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Team"
                                type="select"
                                value={formData.team_id}
                                onChange={(e) => setFormData({ ...formData, team_id: e.target.value })}
                                options={[
                                    { value: '', label: 'Unassigned' },
                                    ...teams.map(t => ({ value: t.id, label: t.name }))
                                ]}
                            />
                            <Input
                                label="Technician"
                                type="select"
                                value={formData.assigned_to}
                                onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                                options={[
                                    { value: '', label: 'Unassigned' },
                                    ...technicians.map(t => ({ value: t.id, label: t.full_name }))
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="pt-2">
                    <div className="border-b-2 border-gray-200 dark:border-slate-700 flex space-x-8 mb-5">
                        {['notes', 'instructions'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2.5 text-sm font-medium border-b-2 -mb-0.5 transition-colors capitalize ${activeTab === tab
                                    ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                                    : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'notes' ? (
                        <Input
                            type="textarea"
                            placeholder="Describe the issue in detail..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    ) : (
                        <Input
                            type="textarea"
                            placeholder="Add maintenance instructions..."
                            value={formData.instructions}
                            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                        />
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default RequestForm;
