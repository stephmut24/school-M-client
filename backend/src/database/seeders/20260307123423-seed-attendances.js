/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('attendances', [
      {
        id: 'a1b2c3d4-0001-0001-0001-000000000011',
        studentId: 'e1b2c3d4-0001-0001-0001-000000000001',
        teacherId: 'b1b2c3d4-0001-0001-0001-000000000001',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        date: '2024-11-01',
        status: 'PRESENT',
        subject: 'Mathematics',
        comment: null,
        createdAt: new Date()
      },
      {
        id: 'a1b2c3d4-0002-0002-0002-000000000009',
        studentId: 'e1b2c3d4-0002-0002-0002-000000000002',
        teacherId: 'b1b2c3d4-0001-0001-0001-000000000001',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        date: '2024-11-01',
        status: 'ABSENT',
        subject: 'Mathematics',
        comment: 'No justification provided',
        createdAt: new Date()
      },
      {
        id: 'a1b2c3d4-0002-0002-0002-000000000008',
        studentId: 'e1b2c3d4-0001-0001-0001-000000000001',
        teacherId: 'b1b2c3d4-0002-0002-0002-000000000002',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        date: '2024-11-02',
        status: 'LATE',
        subject: 'French',
        comment: '10 minutes late',
        createdAt: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('attendances', null, {})
  }
}