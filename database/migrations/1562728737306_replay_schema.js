'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReplaySchema extends Schema {
  up () {
    this.create('replays', (table) => {
      table.increments()
      table.integer('reply_id').notNullable().comment('问题回复ID')
      table.integer('reply_user_id').notNullable().comment('回复用户ID')
      table.string('content', 200).notNullable().comment('回复内容')
      table.timestamps()
    })
  }

  down () {
    this.drop('replays')
  }
}

module.exports = ReplaySchema
