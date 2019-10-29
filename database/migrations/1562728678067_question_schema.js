'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up() {
    this.create('questions', table => {
      table.increments()
      table
        .string('title')
        .notNullable()
        .unique()
        .comment('问题标题')
      table
        .string('content')
        .notNullable()
        .unique()
        .comment('问题描述')
      table
        .integer('question_tag_id')
        .notNullable()
        .comment('问题tag关联ID')
      table
        .integer('question_type_id')
        .notNullable()
        .comment('问题type关联ID')
      table
        .integer('user_id')
        .notNullable()
        .comment('用户ID')
      table
        .integer('replay_count')
        .notNullable()
        .default(0)
        .comment('问题总回复数量')
      table
        .integer('is_show')
        .notNullable()
        .default(0)
        .comment('0：显示，1：隐藏')
      table.timestamps()
    })
  }

  down() {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
