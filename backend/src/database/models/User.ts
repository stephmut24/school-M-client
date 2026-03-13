import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import {Role} from './enums'

interface UserAttributes {
    id: string
    email: string
    password: string
    role: Role
    firstName: string
    lastName: string
    phoneNumber?: string
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'isActive'>

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string
    public email!: string
    public password!: string;
    public role!: Role;
    public firstName!: string;
    public lastName!: string;
    public phoneNumber!: string;
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type : DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail: true}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(...Object.values(Role)),
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true
    }
  );
  return User;
};
