/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('classes', [
      {
        id: 'c1b2c3d4-0001-0001-0001-000000000001',
        name: '6ème A',
        level: '6ème',
        schoolYear: '2024-2025',
        mainTeacherId: 'b1b2c3d4-0001-0001-0001-000000000001',
        capacity: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c1b2c3d4-0002-0002-0002-000000000002',
        name: 'Terminale B',
        level: 'Terminale',
        schoolYear: '2024-2025',
        mainTeacherId: 'b1b2c3d4-0002-0002-0002-000000000002',
        capacity: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('classes', null, {})
  }
}