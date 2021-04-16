import { Users } from '../models/users.model';
import { Locations } from '../models/locations.model';
import { Snapshots } from '../models/snapshots.model';
import { Devices } from '../models/devices.model';


export const createAssosiations = () => {

    // Usuarios y Heroes
    // Users.hasMany(Heroes, { as: 'heroeOf', foreignKey: 'heroeOfId' });
    // Users.hasMany(Heroes, { as: 'userHero', foreignKey: 'userHeroId' });

    Locations.hasOne(Snapshots);
    Snapshots.belongsTo(Locations);


    Devices.hasMany(Snapshots);
    Snapshots.belongsTo(Devices);

    Users.hasMany(Devices);
    Devices.belongsTo(Users);


}

