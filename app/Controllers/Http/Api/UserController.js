"use strict";
const Mail = use("Mail");
const User = use("App/Models/User");
const RandomAvatar = use("random-avatar");
const RandomName = use("username-generator");

class UserController {
  /**
   * user login method
   * @auth {object} auth object
   * @request {object} request object
   * @response {object} response object
   */
  async login({ auth, request, response }) {
    const { email, password } = request.all();
    try {
      const loginStatus = await auth.attempt(email, password);
      return response.json({
        status: "success",
        msg: "登录成功",
        data: loginStatus
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "登录失败",
        data: error.toString()
      });
    }
  }

  /**
   * user register method
   * @request {object} request object
   * @response {object} response object
   */
  async register({ request, response }) {
    const { email, password } = request.all();
    try {
      const userData = {
        username: RandomName.generateUsername(),
        nikeName: RandomName.generateUsername("-"),
        email: email,
        password: password,
        avatar: RandomAvatar()
      };
      const user = await User.create(userData);
      const emailSendStatus = await Mail.send(
        "emails.welcome",
        user.toJSON(),
        message => {
          message
            .to(user.email)
            .from("team@yardstick.io", "Doniai")
            .subject("Welcome to doniai");
        }
      );
      return response.json({
        status: "success",
        msg: "注册成功",
        data: user,
        emailSendStatus: emailSendStatus
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "注册失败",
        data: error.toString()
      });
    }
  }

  /**
   * user logout method
   * @reponse {object} response object
   */
  async logout({ auth, response }) {
    try {
      const logoutStatus = await auth.logout();
      return response.json({
        status: "success",
        msg: "退出成功",
        data: logoutStatus
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "退出失败",
        data: error.toString()
      });
    }
  }

  /**
   * user detail method
   * @auth {object} auth object
   * @params {object} params object
   */
  async show({ auth, params, response }) {
    if (auth.user.id !== Number(params.id)) {
      return response.json({
        status: "failure",
        msg: "用户信息获取失败"
      });
    }
    const user = await auth.user;
    return response.json({
      status: "success",
      msg: "用户信息获取成功",
      data: user
    });
  }
}

module.exports = UserController;
