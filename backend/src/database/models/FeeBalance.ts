import { DataTypes, Model, Optional, Sequelize } from 'sequelize'


interface FeeBalanceAttributes {
    id: string
    studentId: string
    balance: number
    updatedAt?: Date
}

type FeeBalanceCreationAttributes = Optional<FeeBalanceAttributes, 'id'>

class FeeBalance extends Model<FeeBalanceAttributes, FeeBalanceCreationAttributes>
    implements FeeBalanceAttributes {
    public id!: string
    public studentId!: string
    public balance!: number
    public readonly updatedAt!: Date
}

export default (sequelize: Sequelize) => {
    FeeBalance.init(
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
                unique: true,
                references: { model: 'students', key: 'id' }
            },
            balance: {
                type: DataTypes.DECIMAL(10, 2),
                defaultValue: 0,
                validate: { min: 0 }
            }
        },
        {
            sequelize,
            tableName: 'fee_balances',
            timestamps: true,
            createdAt: false
        }
    )
    return FeeBalance

}



