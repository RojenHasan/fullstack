import { database } from '../../../../util/db.server';
import { usersSeed } from './userSeeds';

async function seedUsers() {
    for (const user of usersSeed) {
        await database.user.create({
            data: user,
        });
    }
    console.log('User seeds are ok ...');

    try {
        await database.$disconnect();
    } catch (e) {
        console.error(e);
        await database.$disconnect();
        process.exit(1);
    }
}

seedUsers();
