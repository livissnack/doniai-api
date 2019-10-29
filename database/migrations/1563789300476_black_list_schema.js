'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlackListSchema extends Schema {
  up() {
    this.create('black_lists', table => {
      table.increments()
      table
        .string('ip', 60)
        .notNullable()
        .comment('ip地址')
      table
        .integer('status')
        .default(0)
        .comment('是否放行 0：放行，1：禁止访问')
      table.timestamp('release_start_time').comment('放行开始时间')
      table.timestamp('release_end_time').comment('放行结束时间')
      table.timestamps()
    })
  }

  down() {
    this.drop('black_lists')
  }
}

module.exports = BlackListSchema
