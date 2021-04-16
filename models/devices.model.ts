import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Devices extends Model { }

Devices.init({
    // Id generado automaticamente
    // Usuarios
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, modelName: "devices",
});