'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenuItemSchema extends Schema {
  up() {
    this.create('menu_items', table => {
      table.increments()
      table
        .string('item_name', 80)
        .unique()
        .comment('菜单项名称')
      table.string('icon', 80).comment('菜单项图标')
      table.string('url', 80).comment('菜单项地址')
      table.integer('group_id').comment('菜单组ID')
      table.integer('display_order').comment('显示排序')
      table.string('creator_name', 80).comment('创建者名字')
      table.string('updator_name', 80).comment('更新者名字')
      table.timestamps()
    })
  }

  down() {
    this.drop('menu_items')
  }
}

module.exports = MenuItemSchema
