import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Snapshots extends Model { }

Snapshots.init({
    // Id generado automaticamente
    // Devices
    // Locations
}, {
    sequelize, modelName: "snapshots",
});

export default Snapshots;