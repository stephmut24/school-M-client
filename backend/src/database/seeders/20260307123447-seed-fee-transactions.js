/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('fee_transactions', [
      {
        id: 'a1b2c3d4-0001-0001-0001-000000000031',
        studentId: 'e1b2c3d4-0001-0001-0001-000000000001',
        initiatedBy: 'a1b2c3d4-0006-0006-0006-000000000006',
        type: 'DEPOSIT',
        amount: 500.00,
        balanceBefore: 0.00,
        balanceAfter: 500.00,
        status: 'COMPLETED',
        description: 'Initial fee payment',
        processedBy: 'a1b2c3d4-0001-0001-0001-000000000001',
        processedAt: new Date(),
        createdAt: new Date()
      },
      {
        id: 'a1b2c3d4-0002-0002-0002-000000000032',
        studentId: 'e1b2c3d4-0002-0002-0002-000000000002',
        initiatedBy: 'a1b2c3d4-0007-0007-0007-000000000007',
        type: 'DEPOSIT',
        amount: 150.00,
        balanceBefore: 0.00,
        balanceAfter: 150.00,
        status: 'COMPLETED',
        description: 'Initial fee payment',
        processedBy: 'a1b2c3d4-0001-0001-0001-000000000001',
        processedAt: new Date(),
        createdAt: new Date()
      },
      {
        id: 'a1b2c3d4-0003-0003-0003-000000000033',
        studentId: 'e1b2c3d4-0001-0001-0001-000000000001',
        initiatedBy: 'a1b2c3d4-0006-0006-0006-000000000006',
        type: 'WITHDRAWAL',
        amount: 50.00,
        balanceBefore: 500.00,
        balanceAfter: 450.00,
        status: 'PENDING',
        description: 'Refund request',
        processedBy: null,
        processedAt: null,
        createdAt: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('fee_transactions', null, {})
  }
}