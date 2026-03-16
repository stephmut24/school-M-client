import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { DayOfWeek } from "./enums";

interface TimetableAttributes {
    id: string
    classId: string
    teacherId: string
    subject: string
    dayOfWeek: DayOfWeek
    startTime: string
    endTime: string
    room?: string
    createdAt?: Date
    updatedAt?: Date
}

type TimetableCreationAttributes = Optional<TimetableAttributes, 'id'>

class TimeTable extends Model<TimetableAttributes, TimetableCreationAttributes> implements TimetableAttributes {
    public id!: string
    public classId!: string;
    public teacherId!: string;
    public subject!: string;
    public dayOfWeek!: DayOfWeek;
    public startTime!: string;
    public endTime!: string;
    public room!: string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize:Sequelize) =>{
    TimeTable.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            classId:{
                type: DataTypes.UUID,
                allowNull: false,
                references: {model: 'classes', key:'id'}
            },
            teacherId:{
                type: DataTypes.UUID,
                allowNull: false,
                references: {model: 'teachers', key: 'id'}
            },
            subject:{
                type: DataTypes.STRING,
                allowNull: false
            },
            dayOfWeek:{
                type: DataTypes.ENUM(...Object.values(DayOfWeek)),
                allowNull: false
            },
            startTime: {
                type: DataTypes.STRING,
                allowNull: false
            },
            endTime:{
                type: DataTypes.STRING,
                allowNull: false
            },
            room: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'timetables',
            timestamps: true
        }
    )
    return TimeTable
}