/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('students', [
      {
        id: 'e1b2c3d4-0001-0001-0001-000000000001',
        userId: 'a1b2c3d4-0004-0004-0004-000000000004',
        studentNumber: 'STU-001',
        dateOfBirth: '2010-05-15',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'e1b2c3d4-0002-0002-0002-000000000002',
        userId: 'a1b2c3d4-0005-0005-0005-000000000005',
        studentNumber: 'STU-002',
        dateOfBirth: '2010-08-20',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('students', null, {})
  }
}