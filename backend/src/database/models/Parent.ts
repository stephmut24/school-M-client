import { DataTypes, Model, Optional, Sequelize } from "sequelize";


interface ParentAttributes {
    id: string
    userId: string
    occupation?: string
    createdAt?: Date
    updatedAt?: Date
}

type ParentCreationAttributes = Optional<ParentAttributes, 'id'>

class Parent extends Model<ParentAttributes, ParentCreationAttributes> implements ParentAttributes {
    public id!: string
    public userId!: string
    public occupation!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) =>{
    Parent.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                references: {model: 'users', key:'id'}
            },
            occupation:{
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'parents',
            timestamps: true
        }

    )
    return Parent
}