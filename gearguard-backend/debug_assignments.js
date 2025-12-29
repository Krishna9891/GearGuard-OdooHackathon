const { sequelize, MaintenanceRequest, Team } = require('./src/models');

const debug = async () => {
    try {
        console.log('--- Debugging Assignments (Summary) ---');
        const requests = await MaintenanceRequest.findAll({
            include: [{ model: Team, as: 'team' }]
        });

        console.log(`Total Requests: ${requests.length}`);

        const counts = {};
        let unassigned = 0;

        requests.forEach(r => {
            if (!r.team) {
                unassigned++;
                console.log(`[Unassigned] Req #${r.request_number} TeamID=${r.team_id}`);
            } else {
                counts[r.team.name] = (counts[r.team.name] || 0) + 1;
            }
        });

        console.log('--- Counts per Team ---');
        console.log(counts);
        console.log(`Unassigned: ${unassigned}`);

    } catch (e) {
        console.error(e);
    }
};

debug();
