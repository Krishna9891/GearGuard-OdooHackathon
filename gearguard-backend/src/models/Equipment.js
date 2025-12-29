const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Equipment = sequelize.define('Equipment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    serial_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    department: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    assigned_to_team: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'teams',
            key: 'id'
        }
    },
    default_technician: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    purchase_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    warranty_expiry: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'active',
        validate: {
            isIn: [['active', 'under_maintenance', 'scrapped']]
        }
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'equipment',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Equipment;
