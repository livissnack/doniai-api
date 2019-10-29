'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HspxsteelProductTypeSchema extends Schema {
  up() {
    this.create('hspxsteel_product_types', table => {
      table.increments()
      table
        .string('ar_value')
        .notNullable()
        .unique()
        .comment('产品类别阿拉伯语名称')
      table
        .string('en_value')
        .notNullable()
        .unique()
        .comment('产品类别英语名称')
      table
        .string('ja_value')
        .notNullable()
        .unique()
        .comment('产品类别日语名称')
      table
        .string('ko_value')
        .notNullable()
        .unique()
        .comment('产品类别韩语名称')
      table
        .string('tr_value')
        .notNullable()
        .unique()
        .comment('产品类别土耳其语名称')
      table
        .string('zh_value')
        .notNullable()
        .unique()
        .comment('产品类别中文名称')
      table.timestamps()
    })
  }

  down() {
    this.drop('hspxsteel_product_types')
  }
}

module.exports = HspxsteelProductTypeSchema
