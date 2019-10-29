'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HspxsteelNewsSchema extends Schema {
  up() {
    this.create('hspxsteel_news', table => {
      table.increments()
      table
        .string('image')
        .notNullable()
        .comment('新闻图片')
      table
        .string('zh_title')
        .notNullable()
        .comment('中文标题')
      table
        .text('zh_content')
        .notNullable()
        .comment('中文新闻内容')
      table
        .string('tr_title')
        .notNullable()
        .comment('土耳其语标题')
      table
        .text('tr_content')
        .notNullable()
        .comment('土耳其语内容')

      table
        .string('ko_title')
        .notNullable()
        .comment('韩语标题')
      table
        .text('ko_content')
        .notNullable()
        .comment('韩语新闻内容')
      table
        .string('ja_title')
        .notNullable()
        .comment('土耳其语标题')
      table
        .text('ja_content')
        .notNullable()
        .comment('日语内容')

      table
        .string('en_title')
        .notNullable()
        .comment('英语标题')
      table
        .text('en_content')
        .notNullable()
        .comment('英语新闻内容')
      table
        .string('ar_title')
        .notNullable()
        .comment('阿拉伯语标题')
      table
        .text('ar_content')
        .notNullable()
        .comment('阿拉伯语内容')

      table
        .string('announcer')
        .notNullable()
        .comment('发布者')

      table
        .integer('type')
        .notNullable()
        .default(1)
        .comment('新闻类别0：全部，1：行业新闻，2：品信新闻')

      table
        .integer('status')
        .notNullable()
        .default(1)
        .comment('新闻状态0：草稿，1：发布')
      table.timestamps()
    })
  }

  down() {
    this.drop('hspxsteel_news')
  }
}

module.exports = HspxsteelNewsSchema
