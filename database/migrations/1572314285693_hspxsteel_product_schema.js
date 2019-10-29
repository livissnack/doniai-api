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
        .string('zh_name')
        .notNullable()
        .comment('中文名称')

      table
        .text('zh_content')
        .notNullable()
        .comment('中文内容')

      table
        .string('zh_width')
        .notNullable()
        .comment('宽度')
      table
        .string('zh_thickness')
        .notNullable()
        .comment('厚度')
      table
        .string('zh_length')
        .notNullable()
        .comment('长度')

      // 土耳其内容
      table
        .string('tr_name')
        .notNullable()
        .comment('土耳其语名称')

      table
        .text('tr_content')
        .notNullable()
        .comment('土耳其语内容')

      table
        .string('tr_width')
        .notNullable()
        .comment('宽度')
      table
        .string('tr_thickness')
        .notNullable()
        .comment('厚度')
      table
        .string('tr_length')
        .notNullable()
        .comment('长度')

      // 韩语内容
      table
        .string('ko_name')
        .notNullable()
        .comment('韩语名称')
      table
        .text('ko_content')
        .notNullable()
        .comment('韩语内容')
      table
        .string('ko_width')
        .notNullable()
        .comment('宽度')
      table
        .string('ko_thickness')
        .notNullable()
        .comment('厚度')
      table
        .string('ko_length')
        .notNullable()
        .comment('长度')

      // 日语内容
      table
        .string('ja_name')
        .notNullable()
        .comment('日语名称')
      table
        .text('ja_content')
        .notNullable()
        .comment('日语内容')
      table
        .string('ja_width')
        .notNullable()
        .comment('宽度')
      table
        .string('ja_thickness')
        .notNullable()
        .comment('厚度')
      table
        .string('ja_length')
        .notNullable()
        .comment('长度')

      // 英语内容
      table
        .string('en_name')
        .notNullable()
        .comment('英语名称')
      table
        .text('en_content')
        .notNullable()
        .comment('英语内容')
      table
        .string('en_width')
        .notNullable()
        .comment('宽度')
      table
        .string('en_thickness')
        .notNullable()
        .comment('厚度')
      table
        .string('en_length')
        .notNullable()
        .comment('长度')

      // 阿拉伯内容
      table
        .string('ar_name')
        .notNullable()
        .comment('阿拉伯语标题')
      table
        .text('ar_content')
        .notNullable()
        .comment('阿拉伯语内容')
      table
        .string('ar_width')
        .notNullable()
        .comment('宽度')
      table
        .string('ar_thickness')
        .notNullable()
        .comment('厚度')
      table
        .string('ar_length')
        .notNullable()
        .comment('长度')

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
