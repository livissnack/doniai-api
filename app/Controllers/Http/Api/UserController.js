'use strict'

const Hash = use('Hash')
const Mail = use('Mail')
const User = use('App/Models/User')
const RandomAvatar = use('random-avatar')
const RandomName = use('username-generator')
const { isEmpty } = require('../../../Utils/Helpers')

class UserController {
  /**
   * user login method
   * @auth {object} auth object
   * @request {object} request object
   * @response {object} response object
   */
  async login({ auth, request, response }) {
    const { email, password } = request.all()
    try {
      const loginStatus = await auth.attempt(email, password)
      return response.json({
        status: 'success',
        msg: '登录成功',
        data: loginStatus
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '登录失败' + password,
        data: error.toString()
      })
    }
  }

  /**
   * user register method
   * @request {object} request object
   * @response {object} response object
   */
  async register({ request, response }) {
    const { email, password } = request.all()
    try {
      const userData = {
        username: RandomName.generateUsername(),
        nikeName: RandomName.generateUsername('-'),
        email: email,
        password: password,
        avatar: RandomAvatar()
      }
      const user = await User.create(userData)
      const emailSendStatus = await Mail.send(
        'emails.welcome',
        user.toJSON(),
        message => {
          message
            .to(user.email)
            .from('team@yardstick.io', 'Doniai')
            .subject('Welcome to doniai')
        }
      )
      return response.json({
        status: 'success',
        msg: '注册成功',
        data: user,
        emailSendStatus: emailSendStatus
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '注册失败',
        data: error.toString()
      })
    }
  }

  /**
   * user logout method
   * @reponse {object} response object
   */
  async logout({ auth, response }) {
    try {
      const logoutStatus = await auth.logout()
      return response.json({
        status: 'success',
        msg: '退出成功',
        data: logoutStatus
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '退出失败',
        data: error.toString()
      })
    }
  }

  /**
   * user detail method
   * @auth {object} auth object
   * @params {object} params object
   */
  async detail({ auth, params, response }) {
    if (auth.user.id !== Number(params.id)) {
      return response.json({
        status: 'failure',
        msg: '用户信息获取失败'
      })
    }
    const user = await auth.user
    return response.json({
      status: 'success',
      msg: '用户信息获取成功',
      data: user
    })
  }

  async index({ request, response }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      let iWhere = {}
      const username = request.input('username')
      if (!isEmpty(username)) {
        Object.assign(iWhere, { username: username })
      }
      const nikename = request.input('nikename')
      if (!isEmpty(nikename)) {
        Object.assign(iWhere, { nikename: nikename })
      }
      const email = request.input('email')
      if (!isEmpty(email)) {
        Object.assign(iWhere, { email: email })
      }

      const phone = request.input('phone')
      if (!isEmpty(phone)) {
        Object.assign(iWhere, { phone: phone })
      }

      const githup = request.input('githup')
      if (!isEmpty(githup)) {
        Object.assign(iWhere, { githup: githup })
      }

      const sina = request.input('sina')
      if (!isEmpty(sina)) {
        Object.assign(iWhere, { sina: sina })
      }

      const access_nums = request.input('access_nums')
      if (!isEmpty(access_nums)) {
        Object.assign(iWhere, { access_nums: access_nums })
      }

      const empiric_value = request.input('empiric_value')
      if (!isEmpty(empiric_value)) {
        Object.assign(iWhere, { empiric_value: empiric_value })
      }

      const status = request.input('status')
      if (!isEmpty(status)) {
        Object.assign(iWhere, { status: status })
      }

      const type = request.input('type')
      if (!isEmpty(type)) {
        Object.assign(iWhere, { type: type })
      }

      const website = request.input('website')
      if (!isEmpty(website)) {
        Object.assign(iWhere, { website: website })
      }

      const referral_code = request.input('referral_code')
      if (!isEmpty(referral_code)) {
        Object.assign(iWhere, { referral_code: referral_code })
      }

      const avatar = request.input('avatar')
      if (!isEmpty(avatar)) {
        Object.assign(iWhere, { avatar: avatar })
      }
      const data = await User.query()
        .where(iWhere)
        .paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async store({ request, response }) {
    const data = request.only([
      'username',
      'nikename',
      'email',
      'phone',
      'password',
      'intro',
      'githup',
      'sina',
      'website',
      'referral_code',
      'avatar',
      'wechat_receipt_qr',
      'alipay_receipt_qr'
    ])
    try {
      const user = new User()
      user.fill(data)
      const result = await user.save()
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async show({ params, response }) {
    const { id } = params
    try {
      const data = await User.query()
        .where('id', id)
        .fetch()
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async update({ params, request, response }) {
    const { id } = params
    const data = request.only([
      'username',
      'nikename',
      'email',
      'phone',
      'password',
      'intro',
      'githup',
      'sina',
      'website',
      'referral_code',
      'avatar',
      'wechat_receipt_qr',
      'alipay_receipt_qr'
    ])
    try {
      const result = await User.query()
        .where('id', id)
        .update(data)
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async destroy({ params, response }) {
    const { id } = params
    try {
      const user = await User.find(id)
      const result = await user.delete()
      return result
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = UserController
