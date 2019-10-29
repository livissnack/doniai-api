'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConstellationsSchema extends Schema {
  up() {
    this.create('constellations', table => {
      table.increments()
      table.string('title').comment('星座解析标题')
      table.text('content').comment('星座解析具体内容')
      table
        .integer('status')
        .notNullable()
        .comment('星座解析状态 0：上线，1：下线')
      table.timestamps()
    })
  }

  down() {
    this.drop('constellations')
  }
}

module.exports = ConstellationsSchema
