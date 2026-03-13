/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('grades', [
      {
        id: 'c1b2c3d4-0001-0001-0001-000000000006',
        studentId: 'e1b2c3d4-0001-0001-0001-000000000001',
        teacherId: 'b1b2c3d4-0001-0001-0001-000000000001',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        subject: 'Mathematics',
        grade: 15.50,
        maxGrade: 20.00,
        term: 'TERM_1',
        schoolYear: '2024-2025',
        comment: 'Good work',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c1b2c3d4-0002-0002-0002-000000000007',
        studentId: 'e1b2c3d4-0001-0001-0001-000000000001',
        teacherId: 'b1b2c3d4-0002-0002-0002-000000000002',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        subject: 'French',
        grade: 14.00,
        maxGrade: 20.00,
        term: 'TERM_1',
        schoolYear: '2024-2025',
        comment: 'Can do better',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c1b2c3d4-0003-0003-0003-000000000008',
        studentId: 'e1b2c3d4-0002-0002-0002-000000000002',
        teacherId: 'b1b2c3d4-0001-0001-0001-000000000001',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        subject: 'Mathematics',
        grade: 12.00,
        maxGrade: 20.00,
        term: 'TERM_1',
        schoolYear: '2024-2025',
        comment: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('grades', null, {})
  }
}