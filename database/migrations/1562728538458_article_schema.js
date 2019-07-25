'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
  up () {
    this.create('articles', (table) => {
      table.increments()
      table.string('title', 200).notNullable().unique().comment('标题')
      table.integer('user_id').notNullable().comment('作者ID')
      table.integer('article_type_id').notNullable().comment('文章类别')
      table.integer('article_tag_id').notNullable().comment('文章tag的ID')
      table.text('content').notNullable().comment('文章内容')
      table.string('image').comment('文章封面图片')
      table.timestamp('publish_at').notNullable().comment('发布时间')
      table.timestamps()
    })
  }

  down () {
    this.drop('articles')
  }
}

module.exports = ArticleSchema
