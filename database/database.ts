import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'perros',
    host: 'localhost',
    password: '123456',
    username: 'root',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;