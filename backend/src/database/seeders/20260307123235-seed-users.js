/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
'use strict'

const crypto = require('crypto')

const hashPassword = (password) => {
  return crypto.createHash('sha512').update(password).digest('hex')
}

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      // Admin
      {
        id: 'a1b2c3d4-0001-0001-0001-000000000001',
        email: 'admin@school.com',
        password: hashPassword('Admin@123'),
        role: 'ADMIN',
        firstName: 'Super',
        lastName: 'Admin',
        phoneNumber: '+1234567890',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Teachers
      {
        id: 'a1b2c3d4-0002-0002-0002-000000000002',
        email: 'teacher.math@school.com',
        password: hashPassword('Teacher@123'),
        role: 'TEACHER',
        firstName: 'Jean',
        lastName: 'Dupont',
        phoneNumber: '+1234567891',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a1b2c3d4-0003-0003-0003-000000000003',
        email: 'teacher.french@school.com',
        password: hashPassword('Teacher@123'),
        role: 'TEACHER',
        firstName: 'Marie',
        lastName: 'Martin',
        phoneNumber: '+1234567892',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Students
      {
        id: 'a1b2c3d4-0004-0004-0004-000000000004',
        email: 'student1@school.com',
        password: hashPassword('Student@123'),
        role: 'STUDENT',
        firstName: 'Alice',
        lastName: 'Johnson',
        phoneNumber: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a1b2c3d4-0005-0005-0005-000000000005',
        email: 'student2@school.com',
        password: hashPassword('Student@123'),
        role: 'STUDENT',
        firstName: 'Bob',
        lastName: 'Smith',
        phoneNumber: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Parents
      {
        id: 'a1b2c3d4-0006-0006-0006-000000000006',
        email: 'parent1@school.com',
        password: hashPassword('Parent@123'),
        role: 'PARENT',
        firstName: 'Robert',
        lastName: 'Johnson',
        phoneNumber: '+1234567893',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a1b2c3d4-0007-0007-0007-000000000007',
        email: 'parent2@school.com',
        password: hashPassword('Parent@123'),
        role: 'PARENT',
        firstName: 'Sarah',
        lastName: 'Smith',
        phoneNumber: '+1234567894',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {})
  }
}