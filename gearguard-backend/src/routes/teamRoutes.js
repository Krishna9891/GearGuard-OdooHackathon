const express = require('express');
const router = express.Router();
const { getTeams, createTeam } = require('../controllers/teamController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, getTeams);
router.post('/', authenticateToken, createTeam);

module.exports = router;
