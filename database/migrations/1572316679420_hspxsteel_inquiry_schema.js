'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HspxsteelInquirySchema extends Schema {
  up() {
    this.create('hspxsteel_inquiries', table => {
      table.increments()
      table
        .string('name')
        .notNullable()
        .comment('姓名')
      table
        .string('company')
        .notNullable()
        .comment('公司')
      table
        .string('address')
        .notNullable()
        .comment('地址')
      table
        .string('email')
        .notNullable()
        .comment('邮箱')
      table
        .string('phone')
        .notNullable()
        .comment('手机号码')
      table.string('question').comment('咨询内容')
      table
        .integer('status')
        .notNullable()
        .default(0)
        .comment('消息通知推送状态0：未推送，1：已推送')
      table.timestamps()
    })
  }

  down() {
    this.drop('hspxsteel_inquiries')
  }
}

module.exports = HspxsteelInquirySchema
