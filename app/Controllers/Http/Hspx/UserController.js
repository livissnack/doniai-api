'use strict'
const User = use('App/Models/User')

class UserController {
  async register({ request }) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = new User()
      user.email = email
      user.password = password
      //品信官网类别：6
      user.type = 6
      const result = await user.save()
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async login({ auth, request }) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const result = await auth.withRefreshToken().attempt(email, password)
      const user = await User.query()
        .where('email', email)
        .fetch()
      return {
        data: result,
        user: user
      }
    } catch (error) {
      return error.toString()
    }
  }

  async logout({ auth, request }) {
    try {
      const refreshToken = request.input('refresh_token')
      await auth.generateForRefreshToken(refreshToken, true)
      return true
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = UserController
