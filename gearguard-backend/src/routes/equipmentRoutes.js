const express = require('express');
const router = express.Router();
const {
    getEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    getEquipmentRequests
} = require('../controllers/equipmentController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, getEquipment);
router.post('/', authenticateToken, createEquipment);
router.get('/:id', authenticateToken, getEquipmentById);
router.put('/:id', authenticateToken, updateEquipment);
router.get('/:id/requests', authenticateToken, getEquipmentRequests);

module.exports = router;
