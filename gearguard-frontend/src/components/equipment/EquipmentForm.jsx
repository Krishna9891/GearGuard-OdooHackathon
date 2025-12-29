import { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

const EquipmentForm = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        serial_number: '',
        category: '',
        department: '',
        location: '',
        status: 'active',
        purchase_date: '',
        warranty_expiry: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const footer = (
        <>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>Add Equipment</Button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Equipment"
            footer={footer}
            size="lg"
        >
            <form id="equipment-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Equipment Name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Hydraulic Press 01"
                    />
                    <Input
                        label="Serial Number"
                        name="serial_number"
                        required
                        value={formData.serial_number}
                        onChange={handleChange}
                        placeholder="SN-2024-XXXX"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Category"
                        type="select"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        options={[
                            { value: '', label: 'Select Category...' },
                            { value: 'Heavy Machinery', label: 'Heavy Machinery' },
                            { value: 'Electronics', label: 'Electronics' },
                            { value: 'Vehicles', label: 'Vehicles' },
                            { value: 'Tools', label: 'Tools' },
                            { value: 'Lab', label: 'Lab Equipment' }
                        ]}
                    />
                    <Input
                        label="Location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Floor 2, Zone B"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Purchase Date"
                        type="date"
                        name="purchase_date"
                        value={formData.purchase_date}
                        onChange={handleChange}
                    />
                    <Input
                        label="Warranty Expiry"
                        type="date"
                        name="warranty_expiry"
                        value={formData.warranty_expiry}
                        onChange={handleChange}
                    />
                </div>

                <Input
                    label="Description & Notes"
                    type="textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter any additional details..."
                />
            </form>
        </Modal>
    );
};

export default EquipmentForm;
