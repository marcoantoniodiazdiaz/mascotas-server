import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Locations extends Model { }

Locations.init({
    // Id generado automaticamente
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
}, {
    sequelize, modelName: "locations",
});