import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface ClassAttributes {
    id: string
    name: string
    level: string
    schoolYear: string
    mainTeacherId?: string
    capacity?: number
    createdAt?: Date
    updatedAt?: Date
}

type ClassCreationAttributes = Optional<ClassAttributes, 'id'>

class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
    public id!: string
    public name!: string
    public level!: string
    public schoolYear!: string;
    public mainTeacherId!: string;
    public capacity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    Class.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            level: {
                type: DataTypes.STRING,
                allowNull: false
            },
            schoolYear: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mainTeacherId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            capacity: {
                type: DataTypes.NUMBER,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: 'classes',
            timestamps: true
        }

    );
    return Class;
}