"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const moment = use("moment");
const BlackList = use("App/Models/BlackList");

class BlackListIpOrTimeLong {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    // call next to advance the request
    const ip = request.ip();
    const data = await BlackList.query()
      .where("ip", ip)
      .fetch();
    if (data.status === 0) {
      let currentTime = moment(Date.now(), "YYYY-MM-DD HH:mm:ss").valueOf();
      if (
        data.release_start_time <= currentTime &&
        data.release_end_time >= currentTime
      ) {
        await next();
      } else {
        return response.json({
          status: "success",
          msg: "黑名单访问过滤",
          data: "black list"
        });
      }
    } else if (data.status === 1) {
      return response.json({
        status: "success",
        msg: "黑名单访问过滤",
        data: "black list"
      });
    } else {
      await next();
    }
  }
}

module.exports = BlackListIpOrTimeLong;
