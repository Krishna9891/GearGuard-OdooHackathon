const express = require('express');
const router = express.Router();
const workCenterController = require('../controllers/workCenterController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken); // Protect all routes

router.get('/', workCenterController.getAllWorkCenters);
router.post('/', workCenterController.createWorkCenter);
router.get('/:id', workCenterController.getWorkCenterById);
router.put('/:id', workCenterController.updateWorkCenter);
router.delete('/:id', workCenterController.deleteWorkCenter);

module.exports = router;
