/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('timetables', [
      {
        id: 'a1b2c3d4-0001-0001-0001-000000000004',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        teacherId: 'b1b2c3d4-0001-0001-0001-000000000001',
        subject: 'Mathematics',
        dayOfWeek: 'MONDAY',
        startTime: '08:00',
        endTime: '10:00',
        room: 'Room 101',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a1b2c3d4-0002-0002-0002-000000000005',
        classId: 'c1b2c3d4-0001-0001-0001-000000000001',
        teacherId: 'b1b2c3d4-0002-0002-0002-000000000002',
        subject: 'French',
        dayOfWeek: 'TUESDAY',
        startTime: '10:00',
        endTime: '12:00',
        room: 'Room 102',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a1b2c3d4-0003-0003-0003-000000000003',
        classId: 'c1b2c3d4-0002-0002-0002-000000000002',
        teacherId: 'b1b2c3d4-0001-0001-0001-000000000001',
        subject: 'Mathematics',
        dayOfWeek: 'WEDNESDAY',
        startTime: '08:00',
        endTime: '10:00',
        room: 'Room 201',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('timetables', null, {})
  }
}