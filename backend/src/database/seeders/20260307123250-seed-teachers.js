/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('teachers', [
      {
        id: 'b1b2c3d4-0001-0001-0001-000000000001',
        userId: 'a1b2c3d4-0002-0002-0002-000000000002',
        specialization: 'Mathematics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b1b2c3d4-0002-0002-0002-000000000002',
        userId: 'a1b2c3d4-0003-0003-0003-000000000003',
        specialization: 'French',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('teachers', null, {})
  }
}