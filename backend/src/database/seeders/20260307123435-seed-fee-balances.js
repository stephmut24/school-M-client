/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('fee_balances', [
      {
        id: 'a1b2c3d4-0001-0001-0001-000000000022',
        studentId: 'e1b2c3d4-0001-0001-0001-000000000001',
        balance: 500.00,
        updatedAt: new Date()
      },
      {
        id: 'a1b2c3d4-0002-0002-0002-000000000024',
        studentId: 'e1b2c3d4-0002-0002-0002-000000000002',
        balance: 150.00,
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('fee_balances', null, {})
  }
}