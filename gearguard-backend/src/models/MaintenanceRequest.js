const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MaintenanceRequest = sequelize.define('MaintenanceRequest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    request_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    subject: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    equipment_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Changed to true to allow requests for Work Centers
        references: {
            model: 'equipment',
            key: 'id'
        }
    },
    work_center_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'work_centers',
            key: 'id'
        }
    },
    request_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [['corrective', 'preventive']]
        }
    },
    priority: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'medium',
        validate: {
            isIn: [['low', 'medium', 'high', 'critical']]
        }
    },
    stage: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'new',
        validate: {
            isIn: [['new', 'in_progress', 'repaired', 'scrap']]
        }
    },
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'teams',
            key: 'id'
        }
    },
    assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    scheduled_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    completed_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'maintenance_requests',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Instance method to check if overdue
MaintenanceRequest.prototype.isOverdue = function () {
    if (!this.scheduled_date) return false;
    if (['repaired', 'scrap'].includes(this.stage)) return false;
    return new Date(this.scheduled_date) < new Date();
};

module.exports = MaintenanceRequest;
