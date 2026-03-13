/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('parents', [
      {
        id: 'f1b2c3d4-0001-0001-0001-000000000001',
        userId: 'a1b2c3d4-0006-0006-0006-000000000006',
        occupation: 'Engineer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'f1b2c3d4-0002-0002-0002-000000000002',
        userId: 'a1b2c3d4-0007-0007-0007-000000000007',
        occupation: 'Doctor',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('parents', null, {})
  }
}