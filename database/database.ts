import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'perros',
    host: 'localhost',
    password: 'root',
    username: 'root',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;