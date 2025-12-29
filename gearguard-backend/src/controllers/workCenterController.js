const { WorkCenter } = require('../models');

exports.getAllWorkCenters = async (req, res) => {
    try {
        const workCenters = await WorkCenter.findAll({
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: workCenters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createWorkCenter = async (req, res) => {
    try {
        const workCenter = await WorkCenter.create(req.body);
        res.status(201).json({ success: true, data: workCenter });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getWorkCenterById = async (req, res) => {
    try {
        const workCenter = await WorkCenter.findByPk(req.params.id);
        if (!workCenter) {
            return res.status(404).json({ success: false, message: 'Work Center not found' });
        }
        res.json({ success: true, data: workCenter });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateWorkCenter = async (req, res) => {
    try {
        const workCenter = await WorkCenter.findByPk(req.params.id);
        if (!workCenter) {
            return res.status(404).json({ success: false, message: 'Work Center not found' });
        }
        await workCenter.update(req.body);
        res.json({ success: true, data: workCenter });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteWorkCenter = async (req, res) => {
    try {
        const workCenter = await WorkCenter.findByPk(req.params.id);
        if (!workCenter) {
            return res.status(404).json({ success: false, message: 'Work Center not found' });
        }
        await workCenter.destroy();
        res.json({ success: true, message: 'Work Center deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
