"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
// Crear la clase User que extiende Model, pasando los tipos de atributos y creación
class User extends sequelize_1.Model {
}
exports.User = User;
// Definir el modelo User en Sequelize
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    credential: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: connection_1.default, // la instancia de sequelize
    modelName: 'User', // nombre del modelo
    tableName: 'users', // nombre de la tabla
    timestamps: false, // si no usas los campos createdAt y updatedAt
    underscored: true, // si prefieres usar snake_case
});
