import { DataTypes, Model, Optional, Sequelize } from 'sequelize'
import { TransactionType, TransactionStatus } from './enums'

interface FeeTransactionAttributes {
    id: string
    studentId: string
    initiatedBy: string
    type: TransactionType
    amount: number
    balanceBefore: number
    balanceAfter: number
    status: TransactionStatus
    description?: string
    processedBy?: string
    processedAt?: Date
    createdAt?: Date
}

type FeeTransactionCreationAttributes = Optional<FeeTransactionAttributes, 'id' | 'status'>

class FeeTransaction extends Model<FeeTransactionAttributes, FeeTransactionCreationAttributes>
    implements FeeTransactionAttributes {
    public id!: string
    public studentId!: string
    public initiatedBy!: string
    public type!: TransactionType
    public amount!: number
    public balanceBefore!: number
    public balanceAfter!: number
    public status!: TransactionStatus
    public description!: string
    public processedBy!: string
    public processedAt!: Date
    public readonly createdAt!: Date
}

export default (sequelize: Sequelize) => {
    FeeTransaction.init(
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
            initiatedBy: {
                type: DataTypes.UUID,
                allowNull: false,
                references: { model: 'users', key: 'id' }
            },
            type: {
                type: DataTypes.ENUM(...Object.values(TransactionType)),
                allowNull: false
            },
            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: { min: 0.01 }
            },
            balanceBefore: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            balanceAfter: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM(...Object.values(TransactionStatus)),
                defaultValue: TransactionStatus.PENDING
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            processedBy: {
                type: DataTypes.UUID,
                allowNull: true,
                references: { model: 'users', key: 'id' }
            },
            processedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'fee_transactions',
            timestamps: true,
            updatedAt: false
        }
    )
    return FeeTransaction

}

