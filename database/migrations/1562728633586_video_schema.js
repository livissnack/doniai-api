'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideoSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments()
      table.integer('course_id').notNullable().comment('视频所属系列课程ID')
      table.string('name').notNullable().comment('视频名称')
      table.string('intro').notNullable().comment('视频简介')
      table.string('image').comment('视频封面图')
      table.integer('duration').notNullable().comment('视频时长')
      table.integer('comment_nums').notNullable().comment('视频评论总数')
      table.timestamp('publish_at').notNullable().comment('视频发布时间')
      table.string('url').notNullable().comment('视频地址')
      table.integer('status').notNullable().comment('视频状态ID 0：上线，1：下线')
      table.integer('is_free').notNullable().comment('视频是否免费，0：免费，1：收费')
      table.integer('price').notNullable().comment('单个视频价格')
      table.timestamps()
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideoSchema
