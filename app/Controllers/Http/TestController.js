"use strict";

const {
  utilsPath,
  securtFileName,
  betweenDiffTime
} = require("../../Utils/Helpers");
const Helpers = use("Helpers");
const crypto = use("crypto");
const fs = use("fs");
const Hash = use("Hash");
const moment = require("moment");

class TestController {
  async test({ request }) {
    const currentTime = moment()
      .locale("zh-cn")
      .format("YYYY-MM-DD HH:mm:ss");
    const lastTime = "2019-10-22 10:19:26";
    const result = betweenDiffTime(currentTime, lastTime);

    return result;
  }

  /**
   * 生成密码
   * @param {request} param0
   */
  async makePassword({ request }) {
    const password = request.input("text", "abcd");
    return await Hash.make(password);
  }

  /**
   * 将文件以流方法传输到客户端
   * @param {*} param0
   */
  async download({ response }) {
    return await response.download(utilsPath("Helpers.js"));
  }

  /**
   * 浏览器以附件形式下载文件
   * @param {request} object
   * @param {response} object
   */
  async attachment({ request, response }) {
    const customName = securtFileName(utilsPath("Helpers.js"));
    return await response.attachment(utilsPath("Helpers.js"), customName);
  }

  /**
   * RSA字符串加密
   * @param {request} object
   * @param {response} object
   */
  async encrypt({ request, response }) {
    try {
      const data = request.input("data");
      const pubkeypath = Helpers.resourcesPath("rsas/publickey.pem");
      const pubkey = fs.readFileSync(pubkeypath, "utf8").toString();
      return crypto.privateEncrypt(data, Buffer.from(pubkey, "utf8"));
    } catch (error) {
      return error.message;
    }
  }

  /**
   * RSA字符串解密
   * @param {request} object
   * @param {response} object
   */
  async decrypt({ request, response }) {
    try {
      const data = request.input("data");
      const prikeypath = Helpers.resourcesPath("rsas/privatekey.pem");
      const prikey = fs.readFileSync(prikeypath, "utf8").toString();
      return crypto.publicDecrypt(data, Buffer.from(prikey));
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = TestController;
