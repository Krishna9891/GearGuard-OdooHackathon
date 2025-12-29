const { Equipment, Team, User } = require('../models');

// Get auto-fill data when equipment is selected
const getAutoFillData = async (equipmentId) => {
    const equipment = await Equipment.findByPk(equipmentId, {
        include: [
            { model: Team, as: 'assignedTeam' },
            { model: User, as: 'defaultTechnician', attributes: ['id', 'full_name', 'email'] }
        ]
    });

    if (!equipment) {
        throw new Error('Equipment not found');
    }

    return {
        team_id: equipment.assigned_to_team,
        team_name: equipment.assignedTeam?.name,
        technician_id: equipment.default_technician,
        technician_name: equipment.defaultTechnician?.full_name,
        category: equipment.category,
        location: equipment.location
    };
};

module.exports = { getAutoFillData };
