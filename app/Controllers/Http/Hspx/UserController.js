'use strict'
const User = use('App/Models/User')

class UserController {
  async register({ request, response }) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = new User()
      user.email = email
      user.password = password
      //品信官网类别：6
      user.type = 6
      const result = await user.save()
      return response.json({
        status: 'success',
        msg: '保存成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '保存失败',
        data: error.toString()
      })
    }
  }

  async login({ auth, request, response }) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const result = await auth.withRefreshToken().attempt(email, password)
      const user = await User.query()
        .where('email', email)
        .fetch()
      return response.json({
        status: 'success',
        msg: '登录成功',
        data: result,
        user: user
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '登录失败',
        data: error.toString()
      })
    }
  }

  async logout({ auth, request, response }) {
    try {
      const refreshToken = request.input('refresh_token')
      await auth.generateForRefreshToken(refreshToken, true)
      return response.json({
        status: 'success',
        msg: '登出成功',
        data: user
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '登出失败',
        data: error.toString()
      })
    }
  }
}

module.exports = UserController
