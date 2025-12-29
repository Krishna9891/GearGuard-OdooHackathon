const express = require('express');
const router = express.Router();
const {
    getRequests,
    getRequestById,
    createRequest,
    updateRequest,
    changeStage,
    getCalendarRequests
} = require('../controllers/requestController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, getRequests);
router.post('/', authenticateToken, createRequest);
router.get('/calendar', authenticateToken, getCalendarRequests);
router.get('/:id', authenticateToken, getRequestById);
router.put('/:id', authenticateToken, updateRequest);
router.patch('/:id/stage', authenticateToken, changeStage);

module.exports = router;
