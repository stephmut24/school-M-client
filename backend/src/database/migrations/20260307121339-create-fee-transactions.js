/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fee_transactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      initiatedBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('DEPOSIT', 'WITHDRAWAL'),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      balanceBefore: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      balanceAfter: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'COMPLETED', 'REJECTED'),
        defaultValue: 'PENDING'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      processedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      processedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('fee_transactions')
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_fee_transactions_type";')
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_fee_transactions_status";')
  }
}