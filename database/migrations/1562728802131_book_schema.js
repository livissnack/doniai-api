'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookSchema extends Schema {
  up() {
    this.create('books', table => {
      table.increments()
      table
        .string('name', 40)
        .notNullable()
        .unique()
        .comment('书名')
      table
        .string('intro')
        .notNullable()
        .comment('书简介')
      table
        .string('image')
        .notNullable()
        .comment('书图片')
      table
        .integer('is_recommend')
        .notNullable()
        .comment('是否推荐，0：推荐，1：不推荐')
      table.timestamps()
    })
  }

  down() {
    this.drop('books')
  }
}

module.exports = BookSchema
