const { sequelize } = require('../config/database');
const User = require('./User');
const Team = require('./Team');
const Equipment = require('./Equipment');
const MaintenanceRequest = require('./MaintenanceRequest');

const WorkCenter = require('./WorkCenter');

// Define associations
Equipment.belongsTo(Team, { as: 'assignedTeam', foreignKey: 'assigned_to_team' });
Equipment.belongsTo(User, { as: 'defaultTechnician', foreignKey: 'default_technician' });

MaintenanceRequest.belongsTo(Equipment, { as: 'equipment', foreignKey: 'equipment_id' });
MaintenanceRequest.belongsTo(WorkCenter, { as: 'workCenter', foreignKey: 'work_center_id' });
MaintenanceRequest.belongsTo(Team, { as: 'team', foreignKey: 'team_id' });
MaintenanceRequest.belongsTo(User, { as: 'assignedTo', foreignKey: 'assigned_to' });
MaintenanceRequest.belongsTo(User, { as: 'createdBy', foreignKey: 'created_by' });

Equipment.hasMany(MaintenanceRequest, { as: 'maintenanceRequests', foreignKey: 'equipment_id' });
WorkCenter.hasMany(MaintenanceRequest, { as: 'maintenanceRequests', foreignKey: 'work_center_id' });
Team.hasMany(MaintenanceRequest, { as: 'requests', foreignKey: 'team_id' });

// Sync database
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('✅ Database synced successfully');
    } catch (error) {
        console.error('❌ Error syncing database:', error);
    }
};

module.exports = {
    sequelize,
    User,
    Team,
    Equipment,
    WorkCenter,
    MaintenanceRequest,
    syncDatabase
};
