const { MaintenanceRequest, Equipment } = require('../models');
const { Op } = require('sequelize');

// Generate request number (REQ-2024-0001)
const generateRequestNumber = async () => {
    const year = new Date().getFullYear();

    const lastRequest = await MaintenanceRequest.findOne({
        where: {
            request_number: { [Op.like]: `REQ-${year}-%` }
        },
        order: [['created_at', 'DESC']]
    });

    let sequence = 1;
    if (lastRequest) {
        const parts = lastRequest.request_number.split('-');
        sequence = parseInt(parts[2]) + 1;
    }

    return `REQ-${year}-${String(sequence).padStart(4, '0')}`;
};

module.exports = { generateRequestNumber };
