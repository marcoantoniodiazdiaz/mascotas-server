import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Users extends Model { }

Users.init({
    // Id generado automaticamente
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z\s]{3,}$/
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 5,
        },
    },
}, {
    sequelize, modelName: "users",
});

export default Users;