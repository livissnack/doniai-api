'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
  up() {
    this.create('articles', table => {
      table.increments()
      table
        .string('title', 200)
        .notNullable()
        .unique()
        .comment('标题')
      table
        .integer('user_id')
        .notNullable()
        .comment('作者ID')
      table
        .integer('article_type_id')
        .notNullable()
        .comment('文章类别')
      table
        .integer('article_tag_id')
        .notNullable()
        .comment('文章tag的ID')
      table
        .integer('comment_nums')
        .notNullable()
        .comment('文章评论总数')
      table
        .text('content')
        .notNullable()
        .comment('文章内容')
      table.string('image').comment('文章封面图片')
      table
        .integer('status')
        .notNullable()
        .comment('文章状态 0：上线，1：下线')
      table
        .integer('is_free')
        .notNullable()
        .comment('文章是否免费，0：免费，1：收费')
      table
        .integer('price')
        .notNullable()
        .comment('文字阅读价格-单位分')
      table
        .timestamp('publish_at')
        .notNullable()
        .comment('发布时间')
      table.timestamps()
    })
  }

  down() {
    this.drop('articles')
  }
}

module.exports = ArticleSchema
