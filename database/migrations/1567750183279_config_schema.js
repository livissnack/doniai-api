'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfigSchema extends Schema {
  up() {
    this.create('configs', table => {
      table.increments()
      table
        .string('key')
        .notNullable()
        .unique()
        .comment('键名')
      table
        .string('value')
        .notNullable()
        .comment('具体值')
      table.timestamps()
    })
  }

  down() {
    this.drop('configs')
  }
}

module.exports = ConfigSchema
