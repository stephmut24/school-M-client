import { DataTypes, Model, Optional, Sequelize } from 'sequelize'
import { AttendanceStatus } from './enums'

interface AttendanceAttributes {
    id: string
    studentId: string
    teacherId: string
    classId: string
    date: Date
    status: AttendanceStatus
    subject: string
    comment?: string
    createdAt?: Date
}

type AttendanceCreationAttributes = Optional<AttendanceAttributes, 'id'>

class Attendance extends Model<AttendanceAttributes, AttendanceCreationAttributes>
    implements AttendanceAttributes {
    public id!: string
    public studentId!: string
    public teacherId!: string
    public classId!: string
    public date!: Date
    public status!: AttendanceStatus
    public subject!: string
    public comment!: string
    public readonly createdAt!: Date
}

export default (sequelize: Sequelize) => {
    Attendance.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            studentId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: { model: 'students', key: 'id' }
            },
            teacherId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: { model: 'teachers', key: 'id' }
            },
            classId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: { model: 'classes', key: 'id' }
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM(...Object.values(AttendanceStatus)),
                allowNull: false
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'attendances',
            timestamps: true,
        }

    )
    return Attendance

}


