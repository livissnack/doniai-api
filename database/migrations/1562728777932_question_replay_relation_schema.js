'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionReplayRelationSchema extends Schema {
  up () {
    this.create('question_replay_relations', (table) => {
      table.increments()
      table.integer('parent_id').notNullable().comment('问题回复父ID')
      table.integer('child_id').notNullable().comment('问题回复子ID')
      table.timestamps()
    })
  }

  down () {
    this.drop('question_replay_relations')
  }
}

module.exports = QuestionReplayRelationSchema
