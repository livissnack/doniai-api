"use strict";

const {
  formatDate,
  utilsPath,
  securtFileName
} = require("../../Utils/Helpers");
const Encryption = use('Encryption');
const Helpers = use('Helpers')
const crypto = use("crypto");
const fs = use("fs");
const pubkeystring = "hello world";
const prikeystring = "";

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

  async encrypt({ request, response }) {
    const pubkeypath = Helpers.resourcesPath('rsas/publickey.pem');
    const pubkey = fs.readFileSync(pubkeypath).toString();
    return crypto.publicEncrypt(pubkeystring, Buffer.from(pubkey));
  }

  async decrypt({ request, response }) {
    const prikeypath = Helpers.resourcesPath('rsas/privatekey.pem');
    const prikey = fs.readFileSync(prikeypath).toString();
    return crypto.privateDecrypt(prikeystring, Buffer.from(prikey));
  }
}

module.exports = TestController;
