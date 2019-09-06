'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionTagSchema extends Schema {
  up () {
    this.create('question_tags', (table) => {
      table.increments()
      table.string('value', 40).notNullable().unique().comment('tag内容')
      table.integer('question_id').notNullable().comment('关联问题标签ID')
      table.timestamps()
    })
  }

  down () {
    this.drop('question_tags')
  }
}

module.exports = QuestionTagSchema
