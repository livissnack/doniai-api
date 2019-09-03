"use strict";

const {
  formatDate,
  utilsPath,
  httpPost,
  getBaiduAiAccessToken,
  securtFileName
} = require("../../Utils/Helpers");
const Helpers = use("Helpers");
const crypto = use("crypto");
const fs = use("fs");
const AipNlpClient = require("baidu-aip-sdk").nlp;
const Env = use("Env");
const qs = require("querystring");

class TestController {
  async test({ request, response }) {
    const time = new Date();
    return formatDate(time);
  }

  /**
   * 将文件以流方法传输到客户端
   * @param {*} param0
   */
  async download({ request, response }) {
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

  /**
   * 文本审核
   * @param {request} object
   * @param {response} object
   */
  async filterText({ request, response }) {
    const url = `https://aip.baidubce.com/oauth/2.0/token?${qs.stringify({
      grant_type: "client_credentials",
      client_id: Env.get("BAIDU_API_KEY"),
      client_secret: Env.get("BAIDU_SECRET_KEY")
    })}`;
    const accessToken = await getBaiduAiAccessToken(url);
    const url1 = `https://aip.baidubce.com/rest/2.0/antispam/v2/spam?access_token=${accessToken.data.access_token}`;
    const data = await httpPost(url1, {content: "vpn翻墙"}, {'Content-Type': 'application/x-www-form-urlencoded'});
    return data;
  }

  /**
   * 图片审核
   * @param {request} object
   * @param {response} object
   */
  async filterImage({ request, response }) {
    const url = `https://aip.baidubce.com/oauth/2.0/token?${qs.stringify({
      grant_type: "client_credentials",
      client_id: Env.get("BAIDU_API_KEY"),
      client_secret: Env.get("BAIDU_SECRET_KEY")
    })}`;
    const accessToken = await getBaiduAiAccessToken(url);
    const url1 = `https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined?access_token=${accessToken.data.access_token}`;
    const data = await httpPost(url1, {image: "Base64 or image url"}, {'Content-Type': 'application/json;charset=utf-8'});
    return data;
  }
}

module.exports = TestController;
