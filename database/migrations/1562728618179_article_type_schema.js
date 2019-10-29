'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleTypeSchema extends Schema {
  up() {
    this.create('article_types', table => {
      table.increments()
      table
        .string('value', 40)
        .notNullable()
        .unique()
        .comment('文章类型')
      table
        .integer('article_id')
        .notNullable()
        .comment('关联文章类别ID')
      table.timestamps()
    })
  }

  down() {
    this.drop('article_types')
  }
}

module.exports = ArticleTypeSchema
