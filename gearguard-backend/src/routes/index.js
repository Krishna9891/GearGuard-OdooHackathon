const express = require('express');
const authRoutes = require('./authRoutes');
const equipmentRoutes = require('./equipmentRoutes');
const requestRoutes = require('./requestRoutes');
const teamRoutes = require('./teamRoutes');
const dashboardRoutes = require('./dashboardRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/requests', requestRoutes);
router.use('/teams', teamRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/work-centers', require('./workCenterRoutes'));

module.exports = router;
