const { WorkCenter, sequelize } = require('../src/models');

const seedWorkCenters = async () => {
    try {
        console.log('🌱 Seeding Work Centers...');

        // Ensure table exists
        await sequelize.sync({ alter: true });
        console.log('✅ Database synced');

        const workCenters = [
            {
                name: 'Assembly Line 1',
                code: 'WC-ASM-001',
                description: 'Main assembly line for electronics',
                capacity: 100,
                cost_per_hour: 50.00
            },
            {
                name: 'CNC Milling Station',
                code: 'WC-CNC-002',
                description: 'High precision milling',
                capacity: 50,
                cost_per_hour: 120.00
            },
            {
                name: 'Testing Lab',
                code: 'WC-TST-003',
                description: 'Quality assurance testing',
                capacity: 200,
                cost_per_hour: 80.00
            }
        ];

        for (const wc of workCenters) {
            const [record, created] = await WorkCenter.findOrCreate({
                where: { code: wc.code },
                defaults: wc
            });
            if (created) {
                console.log(`✅ Created Work Center: ${wc.name}`);
            } else {
                console.log(`ℹ️ Work Center exists: ${wc.name}`);
            }
        }

        console.log('🎉 Work Centers seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding work centers:', error);
        process.exit(1);
    }
};

seedWorkCenters();
