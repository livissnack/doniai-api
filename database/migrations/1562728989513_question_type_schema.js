'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionTypeSchema extends Schema {
  up () {
    this.create('question_types', (table) => {
      table.increments()
      table.string('value', 40).notNullable().unique().comment('问题类型')
      table.integer('question_id').notNullable().comment('关联问题类别ID')
      table.timestamps()
    })
  }

  down () {
    this.drop('question_types')
  }
}

module.exports = QuestionTypeSchema
