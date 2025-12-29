const { Team } = require('../models');

// Get all teams
const getTeams = async (req, res) => {
    try {
        const teams = await Team.findAll({
            order: [['name', 'ASC']]
        });

        res.json({
            success: true,
            data: teams
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching teams',
            error: error.message
        });
    }
};

// Create team
const createTeam = async (req, res) => {
    try {
        const team = await Team.create(req.body);

        res.status(201).json({
            success: true,
            data: team
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating team',
            error: error.message
        });
    }
};

module.exports = { getTeams, createTeam };
