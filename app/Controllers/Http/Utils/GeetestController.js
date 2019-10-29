'use strict'
const Geetest = use('gt3-sdk')
const captcha = new Geetest({
  geetest_id: '091c9140671f5499033b3a2bbc562542',
  geetest_key: 'd6fbd0a30c2f8e4275eb34b3313c3e8c'
})

class GeetestController {
  async geetest({ request, session, response }) {
    // 向极验申请每次验证所需的challenge
    await captcha.register(null, function(err, data) {
      if (err) {
        response.send({ status: 'error', info: err })
      }
      if (!data.success) {
        session.put('fallback', true)
        response.send(data)
      } else {
        session.put('fallback', false)
        response.send({ code: 1, msg: '验证成功', data: data })
      }
    })
  }

  async validate({ request, session, response }) {
    // 对ajax提供的验证凭证进行二次验证
    await captcha.validate(
      session.get('fallback'),
      {
        geetest_challenge: request.input(geetest_challenge),
        geetest_validate: request.input(geetest_validate),
        geetest_seccode: request.input(geetest_seccode)
      },
      function(err, success) {
        if (err) {
          // 网络错误
          response.send({ status: 'error', info: err })
        } else if (!success) {
          // 二次验证失败
          response.send({ status: 'fail', info: '登录失败' })
        } else {
          response.send({ status: 'success', info: '登录成功' })
        }
      }
    )
  }
}

module.exports = GeetestController
