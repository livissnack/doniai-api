'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('pid').notNullable().comment('父ID')
      table.integer('type').notNullable().comment('评论类型 1:文章评论，2：视频评论')
      table.integer('user_id').notNullable().comment('用户ID')
      table.string('content', 200).notNullable().comment('评论内容')
      table.integer('is_show').notNullable().default(0).comment('0：显示，1：隐藏')
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentSchema
