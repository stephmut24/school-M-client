/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('parent_students', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      parentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'parents', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      relationship: {
        type: Sequelize.ENUM('FATHER', 'MOTHER', 'GUARDIAN'),
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('parent_students')
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_parent_students_relationship";')
  }
}