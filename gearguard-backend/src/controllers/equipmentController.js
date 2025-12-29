const { Equipment, Team, User, MaintenanceRequest } = require('../models');

// Get all equipment
const getEquipment = async (req, res) => {
    try {
        const { status, category, department } = req.query;

        const where = {};
        if (status) where.status = status;
        if (category) where.category = category;
        if (department) where.department = department;

        const equipment = await Equipment.findAll({
            where,
            include: [
                { model: Team, as: 'assignedTeam' },
                { model: User, as: 'defaultTechnician', attributes: ['id', 'full_name'] }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: equipment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching equipment',
            error: error.message
        });
    }
};

// Get single equipment
const getEquipmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const equipment = await Equipment.findByPk(id, {
            include: [
                { model: Team, as: 'assignedTeam' },
                { model: User, as: 'defaultTechnician', attributes: ['id', 'full_name', 'email'] }
            ]
        });

        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: 'Equipment not found'
            });
        }

        res.json({
            success: true,
            data: equipment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching equipment',
            error: error.message
        });
    }
};

// Create equipment
const createEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.create(req.body);

        const equipmentWithRelations = await Equipment.findByPk(equipment.id, {
            include: [
                { model: Team, as: 'assignedTeam' },
                { model: User, as: 'defaultTechnician', attributes: ['id', 'full_name'] }
            ]
        });

        res.status(201).json({
            success: true,
            data: equipmentWithRelations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating equipment',
            error: error.message
        });
    }
};

// Update equipment
const updateEquipment = async (req, res) => {
    try {
        const { id } = req.params;

        const equipment = await Equipment.findByPk(id);
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: 'Equipment not found'
            });
        }

        await equipment.update(req.body);

        const updatedEquipment = await Equipment.findByPk(id, {
            include: [
                { model: Team, as: 'assignedTeam' },
                { model: User, as: 'defaultTechnician', attributes: ['id', 'full_name'] }
            ]
        });

        res.json({
            success: true,
            data: updatedEquipment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating equipment',
            error: error.message
        });
    }
};

// Get requests for equipment (Smart Button)
const getEquipmentRequests = async (req, res) => {
    try {
        const { id } = req.params;

        const requests = await MaintenanceRequest.findAll({
            where: {
                equipment_id: id,
                stage: ['new', 'in_progress'] // Only open requests
            },
            include: [
                { model: User, as: 'assignedTo', attributes: ['id', 'full_name'] },
                { model: Team, as: 'team' }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching equipment requests',
            error: error.message
        });
    }
};

module.exports = {
    getEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    getEquipmentRequests
};
