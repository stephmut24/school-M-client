import { DataTypes, Model, Optional, Sequelize} from 'sequelize'

interface StudentAttributes {
    id: string
    userId: string
    studentNumber: string
    dateOfBirth?: Date
    classId?: string
    createdAt?: Date
    updatedAt?: Date
}

type StudentCreationAttributes = Optional<StudentAttributes, 'id'>

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
    public id!: string
    public userId!: string
    public studentNumber!: string
    public dateOfBirth!: Date
    public classId!: string
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

export default (sequelize:Sequelize) =>{
    Student.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                references: {model: 'users', key:'id'}
            },
            studentNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            dateOfBirth: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            classId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {model: 'classes', key: 'id'}
            }

        },
        {
            sequelize,
            tableName: 'students',
            timestamps: true
        }
    )
    return Student

}