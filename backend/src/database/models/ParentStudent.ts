import {DataTypes, Model, Optional, Sequelize} from 'sequelize'
import { Relationship } from './enums'


interface ParentStudentAttributes {
    id: string
    parentId: string
    studentId: string
    relationship: Relationship
}

type ParentStudentCreationAttributes = Optional<ParentStudentAttributes, 'id'>

class ParentStudent extends Model<ParentStudentAttributes, ParentStudentCreationAttributes> implements ParentStudentAttributes{
    public id!: string
    public parentId!: string
    public studentId!: string
    public relationship!: Relationship
}

export default (sequelize:Sequelize) =>{
    ParentStudent.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            parentId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {model: 'parents', key:'id'}
            },
            studentId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {model: 'student', key:'id'}
            },
            relationship: {
                type: DataTypes.ENUM(...Object.values(Relationship)),
                allowNull: false
            }
           
        },
        {
            sequelize,
            tableName: 'parent_student',
            timestamps: false
        }
    )
    return ParentStudent
}