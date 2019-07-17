'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LinkSchema extends Schema {
  up () {
    this.create('links', (table) => {
      table.increments()
      table.string('name', 40).notNullable().unique().comment('链接名字')
      table.string('url').notNullable().comment('链接地址')
      table.integer('is_show').notNullable().comment('是否推荐，0：显示，1：不显示')
      table.integer('type').notNullable().comment('链接类别')
      table.timestamps()
    })
  }

  down () {
    this.drop('links')
  }
}

module.exports = LinkSchema
