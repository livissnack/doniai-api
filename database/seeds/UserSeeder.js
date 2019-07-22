'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const users = [{
      username: '张飞',
      nikename: '九亿少女的梦',
      email: 'zhangfei@gmail.com',
      phone: '15302661170',
      password: 'abcd',
      intro: '努力每天都是新的开始！',
      githup: 'https://githup.com/zhangfei',
      sina: 'https://sina.com/zhangfei',
      access_nums: 0,
      empiric_value: 100,
      status: 0,
      type: 1,
      website: 'https://zhangfei.com',
      referral_code: 'abgffghh1',
      avatar: 'https://gravatar.com/avatar/a2195f4b0a527e934407ce27dee011c0?s=400&d=robohaaa&r=x',
      wechat_receipt_qr: 'https://qrd.by/q/8bgzps',
      alipay_receipt_qr: 'https://blog.qrd.by/wp-content/uploads/2018/04/qr-code-apple-485x600.png',
    },
      {
        username: '刘备',
        nikename: '潇湘书生',
        email: 'liubei@gmail.com',
        phone: '15302661171',
        password: 'abcd',
        intro: '努力每天都是新的开始！',
        githup: 'https://githup.com/liubei',
        sina: 'https://sina.com/liubei',
        access_nums: 0,
        empiric_value: 146,
        status: 0,
        type: 2,
        website: 'https://liubei.com',
        referral_code: 'abgffghh2',
        avatar: 'https://gravatar.com/avatar/a2195f4b0a527e934407ce27dee011c0?s=400&d=robohash&r=x',
        wechat_receipt_qr: 'https://qrd.by/q/8bgzpb',
        alipay_receipt_qr: 'https://blog.qrd.by/wp-content/uploads/2018/06/qr-code-apple-485x600.png',
      },
      {
        username: '关羽',
        nikename: '天亮说晚安',
        email: 'guanyu@gmail.com',
        phone: '15302661172',
        password: 'abcd',
        intro: '努力每天都是新的开始！',
        githup: 'https://githup.com/guanyu',
        sina: 'https://sina.com/guanyu',
        access_nums: 0,
        empiric_value: 172,
        status: 0,
        type: 2,
        website: 'https://guanyu.com',
        referral_code: 'abgffghh3',
        avatar: 'https://gravatar.com/avatar/a2195f4b0a527e934407ce27dee011c0?s=400&d=retro&r=x',
        wechat_receipt_qr: 'https://qrd.by/q/8bgzpp',
        alipay_receipt_qr: 'https://blog.qrd.by/wp-content/uploads/2018/08/qr-code-apple-485x600.png',
      },
      {
        username: '曹操',
        nikename: '荷楚霸主',
        email: 'caocao@gmail.com',
        phone: '15302661173',
        password: 'abcd',
        intro: '努力每天都是新的开始！',
        githup: 'https://githup.com/caocao',
        sina: 'https://sina.com/caocao',
        access_nums: 0,
        empiric_value: 128,
        status: 0,
        type: 2,
        website: 'https://caocao.com',
        referral_code: 'abgffghh4',
        avatar: 'https://gravatar.com/avatar/a2195f4b0a527e934407ce27dee011c0?s=400&d=mp&r=x',
        wechat_receipt_qr: 'https://qrd.by/q/8bgzpsi',
        alipay_receipt_qr: 'https://blog.qrd.by/wp-content/uploads/2018/10/qr-code-apple-485x600.png',
      },
    ]
    await User.createMany(users)
  }
}

module.exports = UserSeeder
