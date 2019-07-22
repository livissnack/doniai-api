'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique().comment('用户名')
      table.string('nikename', 80).notNullable().unique().comment('用户昵称')
      table.string('email', 254).notNullable().unique().comment('用户邮箱')
      table.string('phone', 100).unique().comment('手机号')
      table.string('password', 60).notNullable().comment('用户密码')
      table.string('intro', 254).comment('用户简介')
      table.string('githup', 200).comment('Githup')
      table.string('sina', 200).comment('新浪微博')
      table.integer('access_nums').default(0).comment('访问次数')
      table.integer('empiric_value').comment('经验值')
      table.integer('status').notNullable().default(1).comment('用户状态0：激活，1：待激活')
      table.integer('type').notNullable().default(2).comment('用户类别1：超管用户，2：普通用户')
      table.string('website', 200).comment('个人网站')
      table.string('referral_code', 128).unique().comment('用户推荐码')
      table.string('avatar', 254).notNullable().unique().comment('用户图像')
      table.string('wechat_receipt_qr').unique().comment('微信打赏二维码')
      table.string('alipay_receipt_qr').unique().comment('支付宝打赏二维码')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
