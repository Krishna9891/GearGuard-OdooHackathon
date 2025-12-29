const { MaintenanceRequest, Equipment, Team, sequelize } = require('../models');
const { Op } = require('sequelize');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        // Overview stats
        const totalRequests = await MaintenanceRequest.count();
        const newRequests = await MaintenanceRequest.count({ where: { stage: 'new' } });
        const inProgressRequests = await MaintenanceRequest.count({ where: { stage: 'in_progress' } });
        const repairedRequests = await MaintenanceRequest.count({ where: { stage: 'repaired' } });

        // Overdue requests
        const overdueRequests = await MaintenanceRequest.count({
            where: {
                stage: { [Op.in]: ['new', 'in_progress'] },
                scheduled_date: { [Op.lt]: new Date() }
            }
        });

        // Equipment stats
        const totalEquipment = await Equipment.count();
        const activeEquipment = await Equipment.count({ where: { status: 'active' } });

        // Requests by team
        const requestsByTeam = await MaintenanceRequest.findAll({
            attributes: [
                'team_id',
                [sequelize.fn('COUNT', sequelize.col('MaintenanceRequest.id')), 'count']
            ],
            include: [{
                model: Team,
                as: 'team',
                attributes: ['name']
            }],
            group: ['team_id', 'team.id', 'team.name'],
            raw: false
        });

        // Requests by stage
        const requestsByStage = await MaintenanceRequest.findAll({
            attributes: [
                'stage',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['stage']
        });

        // Requests by priority
        const requestsByPriority = await MaintenanceRequest.findAll({
            attributes: [
                'priority',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['priority']
        });

        // Requests by type (Corrective vs Preventive)
        const requestsByType = await MaintenanceRequest.findAll({
            attributes: [
                'request_type',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['request_type']
        });

        // Requests Trend (JS Grouping for compatibility)
        const allRequestsDates = await MaintenanceRequest.findAll({
            attributes: ['created_at'],
            order: [['created_at', 'ASC']]
        });

        const trendMap = {};
        allRequestsDates.forEach(req => {
            const date = new Date(req.created_at).toISOString().split('T')[0];
            trendMap[date] = (trendMap[date] || 0) + 1;
        });

        const requestsTrend = Object.keys(trendMap).map(date => ({
            date,
            count: trendMap[date]
        }));

        // Recent Requests (Limit 5)
        const recentRequests = await MaintenanceRequest.findAll({
            limit: 5,
            order: [['created_at', 'DESC']],
            include: [
                { model: Equipment, as: 'equipment', attributes: ['name', 'serial_number'] },
                { model: Team, as: 'team', attributes: ['name'] }
            ]
        });

        res.json({
            success: true,
            data: {
                overview: {
                    total: totalRequests,
                    new: newRequests,
                    in_progress: inProgressRequests,
                    repaired: repairedRequests,
                    overdue: overdueRequests
                },
                equipment: {
                    total: totalEquipment,
                    active: activeEquipment
                },
                recentRequests: recentRequests,
                charts: {
                    byTeam: requestsByTeam.map(r => ({
                        team_name: r.team?.name || 'Unassigned',
                        count: parseInt(r.dataValues.count)
                    })),
                    byStage: requestsByStage.map(r => ({
                        stage: r.stage,
                        count: parseInt(r.dataValues.count)
                    })),
                    byPriority: requestsByPriority.map(r => ({
                        priority: r.priority,
                        count: parseInt(r.dataValues.count)
                    })),
                    byType: requestsByType.map(r => ({
                        type: r.request_type,
                        count: parseInt(r.dataValues.count)
                    })),
                    trend: requestsTrend
                }
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard stats',
            error: error.message
        });
    }
};

module.exports = { getDashboardStats };
