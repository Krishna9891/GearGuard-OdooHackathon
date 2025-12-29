const { sequelize, User, Team, Equipment, MaintenanceRequest, WorkCenter } = require('./models');
const bcrypt = require('bcryptjs');

// Helper to get random item from array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper to get random date within last N days
const getRandomDate = (daysBack) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
    return date;
};

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('✅ Database synced (force: true)');

        // 1. Create Users (Admin, Manager, Technicians)
        const passwordHash = await bcrypt.hash('Password123!', 10);

        const admin = await User.create({
            username: 'admin',
            email: 'admin@gearguard.com',
            password_hash: passwordHash,
            role: 'admin',
            full_name: 'Admin User'
        });

        const manager = await User.create({
            username: 'manager',
            email: 'manager@gearguard.com',
            password_hash: passwordHash,
            role: 'manager',
            full_name: 'Mike Manager'
        });

        console.log('✅ Admins & Managers created');

        // 2. Create Teams & Technicians
        const strategies = [
            { name: 'Electrical', spec: 'High Voltage', techName: 'Eddie Electric', email: 'eddie@gearguard.com' },
            { name: 'Mechanical', spec: 'Gears & Motors', techName: 'Mitch Mechanic', email: 'mitch@gearguard.com' },
            { name: 'Hydraulic', spec: 'Fluids & Pressure', techName: 'Harry Hydraulic', email: 'harry@gearguard.com' },
            { name: 'Safety Inspectors', spec: 'Risk & Compliance', techName: 'Amy Safety', email: 'amy@gearguard.com' },
            { name: 'Logistics', spec: 'Supply Chain', techName: 'Bob Logistics', email: 'bob@gearguard.com' }
        ];

        const teams = [];
        const techs = []; // Keep track of all techs
        const teamTechMap = {}; // Map team_id -> [technician_objects]

        for (const strategy of strategies) {
            // Create Team
            const team = await Team.create({
                name: strategy.name,
                specialization: strategy.spec,
                description: `Handles ${strategy.spec} issues`
            });
            teams.push(team);

            // Create Technician for this team
            const tech = await User.create({
                username: strategy.email.split('@')[0],
                email: strategy.email,
                password_hash: passwordHash,
                role: 'technician',
                full_name: strategy.techName
            });
            techs.push(tech);

            // Initialize map
            teamTechMap[team.id] = [tech];
        }

        console.log('✅ Teams & Technicians created');

        // 3. Create Work Centers (NEW)
        const workCentersData = [
            { name: 'Assembly Line A', code: 'WC-001', description: 'Building 1, Floor 1', capacity: 100 },
            { name: 'Packaging Station', code: 'WC-002', description: 'Building 1, Floor 2', capacity: 50 },
            { name: 'Foundry', code: 'WC-003', description: 'Building 2', capacity: 200 },
            { name: 'Warehouse Zone C', code: 'WC-004', description: 'Building 3', capacity: 500 }
        ];

        const workCenters = [];
        for (const wc of workCentersData) {
            const createdWC = await WorkCenter.create(wc);
            workCenters.push(createdWC);
        }
        console.log('✅ Work Centers created');


        // 4. Create Equipment (Assigned to Teams/Default Techs)
        const equipmentList = [];

        // Define some specific equipment per team for realism
        const equipmentDefinitions = {
            'Electrical': ['Main Transformer', 'Circuit Breaker array', 'Backup Generator'],
            'Mechanical': ['Conveyor Motor', 'Robotic Arm Joint', 'Industrial Fan'],
            'Hydraulic': ['Hydraulic Press', 'Forklift Lift Cylinder', 'Coolant Pump'],
            'Safety Inspectors': ['Fire Alarm System', 'Gas Detector Array', 'Emergency Sprinkler'],
            'Logistics': ['Delivery Truck TA-55', 'Pallet Wrapper', 'Conveyor Belt System']
        };

        for (const team of teams) {
            const tech = teamTechMap[team.id][0]; // Default tech
            const items = equipmentDefinitions[team.name] || ['Generic Machine'];

            for (const itemName of items) {
                const eq = await Equipment.create({
                    name: itemName,
                    serial_number: `SN-${Math.floor(Math.random() * 10000)}`,
                    category: team.name === 'Electrical' ? 'Electronics' : 'Machinery',
                    location: getRandom(['Zone A', 'Zone B', 'Zone C', 'Yard']),
                    status: getRandom(['active', 'active', 'active', 'under_maintenance']),
                    assigned_to_team: team.id,
                    default_technician: tech.id
                });
                equipmentList.push(eq);
            }
        }
        console.log('✅ Equipment created');

        // 5. Create Maintenance Requests (Properly Assigned)
        console.log('Generating requests for graph data...');
        const statuses = ['new', 'in_progress', 'repaired', 'scrap'];
        const priorities = ['low', 'medium', 'high', 'critical'];
        const types = ['corrective', 'preventive'];

        // Guarantee distinct distribution for graphs
        // Electrical: 3, Mechanical: 5, Hydraulic: 2, Safety: 3, Logistics: 2
        const distribution = [
            { team: 'Electrical', count: 3 },
            { team: 'Mechanical', count: 5 },
            { team: 'Hydraulic', count: 2 },
            { team: 'Safety Inspectors', count: 3 },
            { team: 'Logistics', count: 2 }
        ];

        let reqCounter = 1000;

        for (const dist of distribution) {
            const teamObj = teams.find(t => t.name === dist.team);
            const techObj = teamTechMap[teamObj.id][0];

            for (let i = 0; i < dist.count; i++) {
                reqCounter++;
                const isWorkCenter = Math.random() > 0.8;

                let equipmentId = null;
                let workCenterId = null;
                let targetName = 'Unknown';

                if (isWorkCenter) {
                    const wc = getRandom(workCenters);
                    workCenterId = wc.id;
                    targetName = wc.name;
                } else {
                    // Pick equipment belonging to this team!
                    const teamEquip = equipmentList.filter(e => e.assigned_to_team === teamObj.id);
                    const eq = getRandom(teamEquip);
                    equipmentId = eq.id;
                    targetName = eq.name;
                }

                const type = getRandom(types);
                const createdDate = getRandomDate(30);

                // Add scheduled date for calendar
                let scheduledDate = new Date(createdDate);
                scheduledDate.setDate(createdDate.getDate() + Math.floor(Math.random() * 5));

                await MaintenanceRequest.create({
                    request_number: `REQ-${reqCounter}`,
                    subject: `${type === 'preventive' ? 'Routine Check' : 'Repair'} - ${targetName}`,
                    description: `Automated maintenance request for ${targetName}.`,
                    request_type: type,
                    priority: getRandom(priorities),
                    stage: getRandom(statuses),
                    equipment_id: equipmentId,
                    work_center_id: workCenterId,
                    team_id: teamObj.id, // FORCE TEAM ID
                    assigned_to: techObj.id, // FORCE TECH ID
                    created_by: admin.id,
                    scheduled_date: scheduledDate,
                    created_at: createdDate,
                    updated_at: createdDate
                });
            }
        }

        console.log('✅ Maintenance Requests created (Assignments Fixed)');
        console.log('✅ Seeding Complete!');

    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();
