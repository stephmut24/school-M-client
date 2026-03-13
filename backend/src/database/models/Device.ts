import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { DeviceStatus } from "./enums";


interface DeviceAttributes {
    id: string
    userId: string
    deviceFingerprint: string
    deviceName?: string
    ipAddress?:string
    status: DeviceStatus
    verifiedBy?: string
    verifiedAt?: Date
    createdAt?: Date
    updatedAt?: Date
}

type DeviceCreationAttributes = Optional<DeviceAttributes, 'id' | 'status'>

class Device extends Model<DeviceAttributes, DeviceCreationAttributes> implements DeviceAttributes {
    public id!: string
    public userId!: string
    public deviceFingerprint!: string;
    public deviceName!: string;
    public ipAddress!: string;
    public status!: DeviceStatus;
    public verifiedBy!: string;
    public verifiedAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) =>{
    Device.init (
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {model: 'users', key:'id'}
            },
            deviceFingerprint:{
                type: DataTypes.STRING,
                allowNull: false
            },
            deviceName:{
                type: DataTypes.STRING,
                allowNull: true
            },
            ipAddress:{
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM(...Object.values(DeviceStatus)),
                defaultValue: DeviceStatus.PENDING
            },
            verifiedBy: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {model: 'users', key: 'id'}
            },
            verifiedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'devices',
            timestamps: true
        }

    );
    return Device;
}