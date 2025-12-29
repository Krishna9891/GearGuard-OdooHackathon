const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const WorkCenter = sequelize.define('WorkCenter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tags: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'active',
        validate: {
            isIn: [['active', 'inactive']]
        }
    },
    // Adding fields from the screenshots/outline if visible or standard Odoo fields
    capacity: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 1.00
    },
    time_efficiency: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 100.00
    },
    oee_target: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 90.00
    },
    cost_per_hour: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    tableName: 'work_centers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = WorkCenter;
