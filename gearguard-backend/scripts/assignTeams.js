const { Team, Equipment, MaintenanceRequest, sequelize } = require('../src/models');

const assignTeams = async () => {
    try {
        console.log('🔧 Starting Team Assignment Script...');

        // 1. Ensure Teams Exist
        const teamsData = [
            { name: 'Mechanics', specialization: 'Machinery & Vehicles', description: 'Maintains heavy machinery and fleet.' },
            { name: 'Electrical', specialization: 'Electronics & Power', description: 'Handles power systems and electronics.' },
            { name: 'HVAC', specialization: 'Heating & Cooling', description: 'Climate control systems maintenance.' },
            { name: 'General Maintenance', specialization: 'General', description: 'General repairs and facility upkeep.' }
        ];

        let teams = await Team.findAll();
        if (teams.length === 0) {
            console.log('⚠️ No teams found. Creating teams...');
            teams = await Team.bulkCreate(teamsData);
            console.log(`✅ Created ${teams.length} teams.`);
        } else {
            console.log(`ℹ️ Found ${teams.length} existing teams.`);
            // Ensure we have enough teams for variety, if not add the missing ones
            for (const tData of teamsData) {
                const exists = teams.find(t => t.name === tData.name);
                if (!exists) {
                    const newTeam = await Team.create(tData);
                    teams.push(newTeam);
                    console.log(`   + Created missing team: ${tData.name}`);
                }
            }
        }

        // 2. Assign Teams to Equipment (if unassigned)
        const unassignedEquipment = await Equipment.findAll({ where: { assigned_to_team: null } });
        console.log(`\n🔍 Found ${unassignedEquipment.length} unassigned equipment items.`);

        for (const eq of unassignedEquipment) {
            // Pick a random team
            const randomTeam = teams[Math.floor(Math.random() * teams.length)];
            await eq.update({ assigned_to_team: randomTeam.id });
            console.log(`   > Assigned '${eq.name}' to Team '${randomTeam.name}'`);
        }

        // 3. Assign Teams to Requests (if unassigned)
        const unassignedRequests = await MaintenanceRequest.findAll({ where: { team_id: null } });
        console.log(`\n🔍 Found ${unassignedRequests.length} unassigned maintenance requests.`);

        for (const req of unassignedRequests) {
            let teamIdToAssign;

            // Try to match equipment's team first
            if (req.equipment_id) {
                const equipment = await Equipment.findByPk(req.equipment_id);
                if (equipment && equipment.assigned_to_team) {
                    teamIdToAssign = equipment.assigned_to_team;
                }
            }

            // Fallback to random team if equipment has no team
            if (!teamIdToAssign) {
                const randomTeam = teams[Math.floor(Math.random() * teams.length)];
                teamIdToAssign = randomTeam.id;
            }

            await req.update({ team_id: teamIdToAssign });
            console.log(`   > Assigned Request '${req.subject}' to Team ID ${teamIdToAssign}`);
        }

        console.log('\n✅ Team assignment complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error assigning teams:', error);
        process.exit(1);
    }
};

assignTeams();
