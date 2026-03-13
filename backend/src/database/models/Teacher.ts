import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface TeacherAttributes {
    id: string
    userId: string
    specialization?: string
    createdAt?: Date
    updatedAt?: Date
}

type TeacherCreationAttributes = Optional<TeacherAttributes, 'id'>

class Teacher extends Model<TeacherAttributes, TeacherCreationAttributes> implements TeacherAttributes {
    public id!: string
    public userId!: string
    public specialization!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
export default (sequelize: Sequelize) =>{
    Teacher.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                references: {model: 'users', key:'id'}
            },
            specialization: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: 'teachers',
            timestamps: true
        }
    );
    return Teacher
}