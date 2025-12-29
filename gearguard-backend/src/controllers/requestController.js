const { MaintenanceRequest, Equipment, WorkCenter, Team, User } = require('../models');
const { Op } = require('sequelize');
const { generateRequestNumber } = require('../utils/generateRequestNumber');
const { getAutoFillData } = require('../services/autoFillService');

// Get all requests
const getRequests = async (req, res) => {
    try {
        const { stage, request_type, team_id, priority, equipment_id, work_center_id } = req.query;

        const where = {};
        if (stage) where.stage = stage;
        if (request_type) where.request_type = request_type;
        if (team_id) where.team_id = team_id;
        if (priority) where.priority = priority;
        if (equipment_id) where.equipment_id = equipment_id;
        if (work_center_id) where.work_center_id = work_center_id;

        const requests = await MaintenanceRequest.findAll({
            where,
            include: [
                { model: Equipment, as: 'equipment' },
                { model: WorkCenter, as: 'workCenter' },
                { model: Team, as: 'team' },
                { model: User, as: 'assignedTo', attributes: ['id', 'full_name', 'avatar_url'] },
                { model: User, as: 'createdBy', attributes: ['id', 'full_name'] }
            ],
            order: [['created_at', 'DESC']]
        });

        // Add is_overdue field
        const requestsWithOverdue = requests.map(r => ({
            ...r.toJSON(),
            is_overdue: r.isOverdue()
        }));

        res.json({
            success: true,
            data: requestsWithOverdue
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching requests',
            error: error.message
        });
    }
};

// Get single request
const getRequestById = async (req, res) => {
    try {
        const { id } = req.params;

        const request = await MaintenanceRequest.findByPk(id, {
            include: [
                { model: Equipment, as: 'equipment' },
                { model: WorkCenter, as: 'workCenter' },
                { model: Team, as: 'team' },
                { model: User, as: 'assignedTo', attributes: ['id', 'full_name', 'avatar_url'] },
                { model: User, as: 'createdBy', attributes: ['id', 'full_name'] }
            ]
        });

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        res.json({
            success: true,
            data: {
                ...request.toJSON(),
                is_overdue: request.isOverdue()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching request',
            error: error.message
        });
    }
};

// Create request
const createRequest = async (req, res) => {
    try {
        const { equipment_id, work_center_id, ...requestData } = req.body;

        if (!equipment_id && !work_center_id) {
            return res.status(400).json({
                success: false,
                message: 'Either Equipment or Work Center is required'
            });
        }

        // Generate request number
        const request_number = await generateRequestNumber();

        let autoFillData = {};
        if (equipment_id) {
            // Get auto-fill data only if equipment is selected
            autoFillData = await getAutoFillData(equipment_id);
        }

        // Create request with auto-filled data
        const request = await MaintenanceRequest.create({
            ...requestData,
            equipment_id,
            work_center_id,
            request_number,
            team_id: requestData.team_id || autoFillData.team_id,
            assigned_to: requestData.assigned_to || autoFillData.technician_id,
            created_by: req.user.id
        });

        const requestWithRelations = await MaintenanceRequest.findByPk(request.id, {
            include: [
                { model: Equipment, as: 'equipment' },
                { model: WorkCenter, as: 'workCenter' },
                { model: Team, as: 'team' },
                { model: User, as: 'assignedTo', attributes: ['id', 'full_name', 'avatar_url'] }
            ]
        });

        res.status(201).json({
            success: true,
            data: {
                ...requestWithRelations.toJSON(),
                is_overdue: requestWithRelations.isOverdue()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating request',
            error: error.message
        });
    }
};

// Update request
const updateRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const request = await MaintenanceRequest.findByPk(id);
        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        await request.update(req.body);

        const updatedRequest = await MaintenanceRequest.findByPk(id, {
            include: [
                { model: Equipment, as: 'equipment' },
                { model: WorkCenter, as: 'workCenter' },
                { model: Team, as: 'team' },
                { model: User, as: 'assignedTo', attributes: ['id', 'full_name', 'avatar_url'] }
            ]
        });

        res.json({
            success: true,
            data: {
                ...updatedRequest.toJSON(),
                is_overdue: updatedRequest.isOverdue()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating request',
            error: error.message
        });
    }
};

// Change stage (CRITICAL: Includes scrap automation)
const changeStage = async (req, res) => {
    try {
        const { id } = req.params;
        const { stage, duration_minutes, resolution_notes } = req.body;

        const request = await MaintenanceRequest.findByPk(id);
        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Update stage
        const updates = { stage };

        if (stage === 'in_progress' && !request.started_at) {
            updates.started_at = new Date();
        }

        if (stage === 'repaired') {
            updates.completed_at = new Date();
            if (duration_minutes) updates.duration_minutes = duration_minutes;
            if (resolution_notes) updates.resolution_notes = resolution_notes;
        }

        await request.update(updates);

        // CRITICAL: Scrap automation
        if (stage === 'scrap') {
            await Equipment.update(
                { status: 'scrapped' },
                { where: { id: request.equipment_id } }
            );
            console.log(`✅ Equipment ${request.equipment_id} automatically marked as scrapped`);
        }

        const updatedRequest = await MaintenanceRequest.findByPk(id, {
            include: [
                { model: Equipment, as: 'equipment' },
                { model: WorkCenter, as: 'workCenter' },
                { model: Team, as: 'team' },
                { model: User, as: 'assignedTo', attributes: ['id', 'full_name', 'avatar_url'] }
            ]
        });

        res.json({
            success: true,
            data: {
                ...updatedRequest.toJSON(),
                is_overdue: updatedRequest.isOverdue()
            },
            message: stage === 'scrap' ? 'Request scrapped and equipment marked as scrapped' : 'Stage updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error changing stage',
            error: error.message
        });
    }
};

// Get calendar requests (preventive maintenance)
const getCalendarRequests = async (req, res) => {
    try {
        const requests = await MaintenanceRequest.findAll({
            where: {
                scheduled_date: { [Op.ne]: null }
            },
            include: [
                { model: Equipment, as: 'equipment' },
                { model: WorkCenter, as: 'workCenter' },
                { model: User, as: 'assignedTo', attributes: ['id', 'full_name'] }
            ],
            order: [['scheduled_date', 'ASC']]
        });

        res.json({
            success: true,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching calendar requests',
            error: error.message
        });
    }
};

module.exports = {
    getRequests,
    getRequestById,
    createRequest,
    updateRequest,
    changeStage,
    getCalendarRequests
};
