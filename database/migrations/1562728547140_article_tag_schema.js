'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleTagSchema extends Schema {
  up() {
    this.create('article_tags', table => {
      table.increments()
      table
        .string('value', 40)
        .notNullable()
        .unique()
        .comment('tag内容')
      table
        .integer('article_id')
        .notNullable()
        .comment('关联文章标签ID')
      table.timestamps()
    })
  }

  down() {
    this.drop('article_tags')
  }
}

module.exports = ArticleTagSchema
