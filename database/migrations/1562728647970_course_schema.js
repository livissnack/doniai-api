'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.increments()
      table.string('title').notNullable().unique().comment('系列课程标题')
      table.string('intro').notNullable().comment('系列课程简介')
      table.string('image').notNullable().comment('系列课程封面图片地址')
      table.string('discuss_qq_group').comment('讨论QQ群')
      table.string('support_wechat').comment('技术服务微信号')
      table.integer('course_type_id').notNullable().comment('系列课程类别ID')
      table.integer('status').notNullable().comment('系列课程状态ID 0：上线，1：下线')
      table.integer('is_free').notNullable().comment('系列课程是否免费，0：免费，1：收费')
      table.integer('price').notNullable().comment('系列课程价格')
      table.timestamps()
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CourseSchema
