import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Tags extends Model { }

Tags.init({
    // Id generado automaticamente
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, modelName: "tags",
});

export default Tags;