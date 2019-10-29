'use strict'

class User {
  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': '邮箱地址不能为空。',
      'email.email': '邮箱格式不正确。',
      'email.unique': '邮箱已经被注册。',
      'password.required': '密码不能为空'
    }
  }
}

module.exports = User
