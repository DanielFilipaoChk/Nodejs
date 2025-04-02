import { Sequelize } from "sequelize";

const sequelize = new Sequelize('api_nodejs', 'root', 'Chk@F3l2',{
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize