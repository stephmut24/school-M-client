import {DataTypes, Model, Optional, Sequelize } from "sequelize";


interface ClassTeacherAttributes {
    id: string
    classId: string
    teacherId: string
    subject: string
}

type ClassTeacherCreationAttributes = Optional<ClassTeacherAttributes, 'id'>

class ClassTeacher extends Model<ClassTeacherAttributes, ClassTeacherCreationAttributes> implements ClassTeacherAttributes {
    public id!: string
    public classId!: string
    public teacherId!: string;
    public subject!:string
}

export default (sequelize: Sequelize) =>{
    ClassTeacher.init(
        {
            id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            classId:{
                type: DataTypes.UUID,
                allowNull: false,
                references: {model: 'classes', key:'id'}
            },
            teacherId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {model: 'teachers', key:'id'}
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: 'class_teachers',
            timestamps: false
        }

    );
    return ClassTeacher
}