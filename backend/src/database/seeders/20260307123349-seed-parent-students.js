/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('parent_students', [
      {
        id: 'b1b2c3d4-0001-0001-0001-000000000001',
        parentId: 'f1b2c3d4-0001-0001-0001-000000000001',
        studentId: 'e1b2c3d4-0001-0001-0001-000000000001',
        relationship: 'FATHER'
      },
      {
        id: 'c1b2c3d4-0002-0002-0002-000000000002',
        parentId: 'f1b2c3d4-0002-0002-0002-000000000002',
        studentId: 'e1b2c3d4-0002-0002-0002-000000000002',
        relationship: 'MOTHER'
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('parent_students', null, {})
  }
}