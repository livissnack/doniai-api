"use strict";
const Mail = use("Mail");
const User = use("App/Models/User");
const RandomAvatar = use("random-avatar");
const RandomName = use("username-generator");
const Config = use("Config");
const AliOss = use("ali-oss");
const Helpers = use("Helpers");
const ossConfig = Config.get("oss.ali");
const { formatDate } = require("../../../Utils/Helpers");

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
  async detail({ auth, params, response }) {
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



  async index({ request, response }) {
    const { page, pageSize } = request.only(["page", "pageSize"]);
    const username = request.input("username", 0);
    const iWhere = { username: username };
    try {
      const data = await User.query()
          .where(iWhere)
          .paginate(page, pageSize);
      return response.json({
        status: "success",
        msg: "用户列表数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "用户列表数据获取失败",
        data: error.toString()
      });
    }
  }

  async store({ request, response }) {
    const data = request.only([
      "username",
      "nikename",
      "email",
      "phone",
      "password",
      "intro",
      "githup",
      "sina",
      "website",
      "referral_code",
      "avatar",
      "wechat_receipt_qr",
      "alipay_receipt_qr"
    ]);
    const avatar = request.file("avatar", { types: ["image"], size: "2mb" });
    const wechat_receipt_qr = request.file("wechat_receipt_qr", { types: ["image"], size: "2mb" });
    const alipay_receipt_qr = request.file("alipay_receipt_qr", { types: ["image"], size: "2mb" });
    try {
      const avatarpath = await avatar.move(Helpers.tmpPath("uploads"), {
        name: avatar.clientName,
        overwrite: true
      });
      const store1 = AliOss(ossConfig);
      const ossPutAvatarObj = await store1.put(
          `uploads/${formatDate(new Date(), "YYYY-MM-DD")}/${
              avatarpath.clientName
              }`,
          avatarpath
      );
      const ossObjAvatarUrl = await store1.getObjectUrl(
          ossPutAvatarObj.name,
          Config.get("oss.cdn").domian
      );

      const wechatqrpath = await wechat_receipt_qr.move(Helpers.tmpPath("uploads"), {
        name: wechat_receipt_qr.clientName,
        overwrite: true
      });
      const store2 = AliOss(ossConfig);
      const ossPutWechatQrObj = await store2.put(
          `uploads/${formatDate(new Date(), "YYYY-MM-DD")}/${
              wechatqrpath.clientName
              }`,
          wechatqrpath
      );
      const ossObjWechatQrUrl = await store2.getObjectUrl(
          ossPutWechatQrObj.name,
          Config.get("oss.cdn").domian
      );

      const user = new User();
      user.fill(data);
      user.merge(user, ossObjAvatarUrl);
      user.merge(user, ossObjWechatQrUrl);
      const result = await user.save();
      return response.json({
        status: "success",
        msg: "用户保存成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "用户保存失败",
        data: error.toString()
      });
    }
  }

  async show({ params, response }) {
    const { id } = params;
    try {
      const data = await User.query()
          .where("id", id)
          .fetch();
      return response.json({
        status: "success",
        msg: "用户数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "用户数据获取失败",
        data: error.toString()
      });
    }
  }

  async update({ params, request, response }) {
    const { id } = params;
    const data = request.only([
      "username",
      "nikename",
      "email",
      "phone",
      "password",
      "intro",
      "githup",
      "sina",
      "website",
      "referral_code",
      "avatar",
      "wechat_receipt_qr",
      "alipay_receipt_qr"
    ]);
    try {
      const result = await User.query()
          .where("id", id)
          .update(data);
      return response.json({
        status: "success",
        msg: "用户数据修改成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "用户数据修改失败",
        data: error.toString()
      });
    }
  }

  async destroy({ params, response }) {
    const { id } = params;
    try {
      const user = await User.find(id);
      const result = await user.delete();
      return response.json({
        status: "success",
        msg: "用户数据删除成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "用户数据删除失败",
        data: error.toString()
      });
    }
  }
}

module.exports = UserController;
