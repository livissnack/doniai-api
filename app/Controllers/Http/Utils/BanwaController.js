"use strict";

const Config = use("Config");
const qs = use("querystring");
const banwaConfig = Config.get("banwa.config");
const { httpGet, isOk } = require("../../../Utils/Helpers");

class BanwaController {
  /**
   * 查询搬瓦工服务信息
   * @param {rsponse} param0
   */
  async getServiceInfo({ response }) {
    let qstring = qs.stringify({
      veid: banwaConfig.veid,
      api_key: banwaConfig.api_key
    });
    let url = `${banwaConfig.baseUrl}/getServiceInfo?${qstring}`;
    try {
      let result = await httpGet(url);
      if (isOk(result.status)) {
        result.data = JSON.parse(result.data);
        return response.json(result);
      }
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "数据获取失败",
        data: error.toString()
      });
    }
  }

  /**
   * 创建服务器快照
   * @param {response} param0
   */
  async snapshot({ response }) {
    let qstring = qs.stringify({
      description: "Automatic_Snapshot",
      veid: banwaConfig.veid,
      api_key: banwaConfig.api_key
    });
    let url = `${banwaConfig.baseUrl}/snapshot/create?${qstring}`;
    try {
      let result = await httpGet(url);
      if (isOk(result.status)) {
        result.data = JSON.parse(result.data);
        return response.json(result);
      }
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "快照创建失败",
        data: error.toString()
      });
    }
  }

  /**
   * 重启VPS服务器
   * @param {response} param0
   */
  async restartVps({ response }) {
    let qstring = qs.stringify({
      veid: banwaConfig.veid,
      api_key: banwaConfig.api_key
    });
    let url = `${banwaConfig.baseUrl}/restart?${qstring}`;
    try {
      let result = await httpGet(url);
      if (isOk(result.status)) {
        result.data = JSON.parse(result.data);
        return response.json(result);
      }
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "vPS重启失败",
        data: error.toString()
      });
    }
  }

  /**
   * 设置PTR record记录
   * @param {request} param0
   * @param {response} param0
   */
  async setPtrRecord({ request, response }) {
    let ip = request.input("ip");
    let ptr = request.input("ptr");
    let qstring = qs.stringify({
      ip: ip,
      ptr: ptr,
      veid: banwaConfig.veid,
      api_key: banwaConfig.api_key
    });
    let url = `${banwaConfig.baseUrl}/setPTR?${qstring}`;
    try {
      let result = await httpGet(url);
      if (isOk(result.status)) {
        result.data = JSON.parse(result.data);
        return response.json(result);
      }
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "vPS重启失败",
        data: error.toString()
      });
    }
  }
}

module.exports = BanwaController;
