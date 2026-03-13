'use strict'

// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('class_teachers', [
      {
        id: 'd1b2c3d4-0001-0001-0001-000000000001',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        teacherId: 'b1b2c3d4-0001-0001-0001-000000000001',
        subject: 'Mathematics'
      },
      {
        id: 'd1b2c3d4-0002-0002-0002-000000000002',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        teacherId: 'b1b2c3d4-0002-0002-0002-000000000002',
        subject: 'French'
      },
      {
        id: 'd1b2c3d4-0003-0003-0003-000000000003',
        classId: 'c1b2c3d4-0002-0002-0002-000000000002',
        teacherId: 'b1b2c3d4-0001-0001-0001-000000000001',
        subject: 'Mathematics'
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('class_teachers', null, {})
  }
}