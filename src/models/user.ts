import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";

// Definir la interfaz para los atributos del usuario
interface UserAttributes {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  credential: string;
  status: number;
}

// Definir una interfaz para los atributos opcionales (cuando se crea un nuevo usuario, el id no se pasa)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Crear la clase User que extiende Model, pasando los tipos de atributos y creación
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public credential!: string;
  public status!: number;
}

// Definir el modelo User en Sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    credential: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize, // la instancia de sequelize
    modelName: 'User', // nombre del modelo
    tableName: 'users', // nombre de la tabla
    timestamps: false, // si no usas los campos createdAt y updatedAt
    underscored: true, // si prefieres usar snake_case
  }
);
