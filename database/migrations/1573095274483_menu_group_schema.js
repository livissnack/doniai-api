'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenuGroupSchema extends Schema {
  up() {
    this.create('menu_groups', table => {
      table.increments()
      table
        .string('group_name', 80)
        .unique()
        .comment('菜单组名称')
      table.string('icon', 80).comment('菜单组图标')
      table.integer('display_order').comment('显示排序')
      table.string('creator_name', 80).comment('创建者名字')
      table.string('updator_name', 80).comment('更新者名字')
      table.timestamps()
    })
  }

  down() {
    this.drop('menu_groups')
  }
}

module.exports = MenuGroupSchema
