'use strict'

/*
|--------------------------------------------------------------------------
| CommentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Comment = use('App/Models/Comment')

class CommentSeeder {
  async run () {
    const comments = [{
      comment_id: 1,
      comment_type: 1,
      user_id: 1,
      content: '性能优化没有穷尽啊',
    },
      {
        comment_id: 2,
        comment_type: 1,
        user_id: 2,
        content: '努力每天都是新的开始！',
      },
      {
        comment_id: 2,
        comment_type: 1,
        user_id: 2,
        content: '图像压缩确实是 一个非常值得学习的方向。至少在项目中也要学会使用，现在流量最贵，能省则省 ',
      },
    ]
    await Comment.createMany(comments)
  }
}
module.exports = CommentSeeder
