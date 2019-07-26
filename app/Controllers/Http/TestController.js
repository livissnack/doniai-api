"use strict";

const fs = require("fs");
const {
  formatDate,
  httpApiPath,
  utilsPath,
  securtFileName
} = require("../../Utils/Helpers");

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
}

module.exports = TestController;
