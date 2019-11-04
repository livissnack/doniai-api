'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HspxsteelProductSchema extends Schema {
  up() {
    this.create('hspxsteel_products', table => {
      table.increments()
      table
        .string('image')
        .notNullable()
        .comment('图片')

      // 中文内容
      table
        .string('name')
        .notNullable()
        .comment('中文名称')

      table
        .text('content')
        .notNullable()
        .comment('中文内容')

      table
        .string('width')
        .notNullable()
        .comment('宽度')
      table
        .string('thickness')
        .notNullable()
        .comment('厚度')
      table
        .string('length')
        .notNullable()
        .comment('长度')

      // 英语内容
      table
        .text('en_content')
        .notNullable()
        .comment('英语内容')

      table
        .integer('instock')
        .notNullable()
        .comment('库存')

      table
        .integer('product_type_id')
        .notNullable()
        .comment('产品类别ID')

      table
        .integer('status')
        .notNullable()
        .default(1)
        .comment('产品状态0：存库，1：上线')
      table.timestamps()
    })
  }

  down() {
    this.drop('hspxsteel_products')
  }
}

module.exports = HspxsteelProductSchema
