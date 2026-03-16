import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import {Term} from './enums'

interface GradeAttributes {
    id: string
    studentId: string
    teacherId: string
    classId: string
    subject: string
    grade: number
    maxGrade: number
    term: Term
    schoolYear: string
    comment?: string
    createdAt?: Date
    updatedAt?: Date
}

type GradeCreationAttributes = Optional<GradeAttributes, 'id'>

class Grade extends Model<GradeAttributes, GradeCreationAttributes> implements GradeAttributes {
    public id!: string
    public studentId!: string
    public teacherId!: string
    public classId!: string
    public subject!: string
    public grade!: number
    public maxGrade!: number
    public term!: Term
    public schoolYear!: string;
    public comment!: string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize:Sequelize) =>{
    Grade.init(
        {
            id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            studentId:{
                type:DataTypes.UUID,
                allowNull: false,
                references: {model:'students', key:'id'}
            },
            
            teacherId:{
                type:DataTypes.UUID,
                allowNull: false,
                references: {model:'teachers', key:'id'}
            },
            classId:{
                type:DataTypes.UUID,
                allowNull: false,
                references: {model:'classes', key:'id'}
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false
            },
             grade: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false
            },
             maxGrade: {
                type: DataTypes.DECIMAL(5,2),
                allowNull: false
            },
             term: {
                type: DataTypes.ENUM(...Object.values(Term)),
                allowNull: false
            },
             schoolYear: {
                type: DataTypes.STRING,
                allowNull: false
            },
             comment: {
                type: DataTypes.STRING,
                allowNull: true
            }
           
        },
        {
            sequelize,
            tableName: 'grades',
            timestamps: true
        }
    )
    return Grade
}