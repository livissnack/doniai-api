'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReplaySchema extends Schema {
  up () {
    this.create('replays', (table) => {
      table.increments()
      table.integer('question_id').notNullable().comment('问题ID')
      table.integer('pid').notNullable().comment('回复父ID')
      table.integer('user_id').notNullable().comment('回复用户ID')
      table.string('content').notNullable().comment('回复内容')
      table.timestamps()
    })
  }

  down () {
    this.drop('replays')
  }
}

module.exports = ReplaySchema
