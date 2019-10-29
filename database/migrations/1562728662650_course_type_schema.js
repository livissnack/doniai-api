'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseTypeSchema extends Schema {
  up() {
    this.create('course_types', table => {
      table.increments()
      table
        .string('value', 40)
        .notNullable()
        .unique()
        .comment('系列课程类别')
      table
        .integer('course_type_id')
        .notNullable()
        .comment('系列课程类别ID')
      table.timestamps()
    })
  }

  down() {
    this.drop('course_types')
  }
}

module.exports = CourseTypeSchema
