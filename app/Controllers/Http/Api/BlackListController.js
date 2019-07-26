"use strict";

const BlackList = use("App/Models/BlackList");
const { isEmpty } = require("../../../Utils/Helpers");

class BlackListController {
  async index({ request, response }) {
    try {
      const { page, pageSize } = request.only(["page", "pageSize"]);
      let iWhere = {};
      const ip = request.input("ip");
      if (!isEmpty(ip)) {
        Object.assign(iWhere, { ip: ip });
      }
      const status = request.input("status");
      if (!isEmpty(status)) {
        Object.assign(iWhere, { status: status });
      }
      const data = await BlackList.query()
        .where(iWhere)
        .paginate(page, pageSize);
      return response.json({
        status: "success",
        msg: "黑名单列表数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "黑名单列表数据获取失败",
        data: error.toString()
      });
    }
  }

  async store({ request, response }) {
    const data = request.only([
      "ip",
      "status",
      "release_start_time",
      "release_end_time"
    ]);
    try {
      const blackList = new BlackList();
      blackList.fill(data);
      const result = await blackList.save();
      return response.json({
        status: "success",
        msg: "黑名单保存成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "黑名单保存失败",
        data: error.toString()
      });
    }
  }

  async show({ params, response }) {
    const { id } = params;
    try {
      const data = await BlackList.query()
        .where("id", id)
        .fetch();
      return response.json({
        status: "success",
        msg: "黑名单数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "黑名单数据获取失败",
        data: error.toString()
      });
    }
  }

  async update({ params, request, response }) {
    const { id } = params;
    const data = request.only([
      "ip",
      "status",
      "release_start_time",
      "release_end_time"
    ]);
    try {
      const result = await BlackList.query()
        .where("id", id)
        .update(data);
      return response.json({
        status: "success",
        msg: "黑名单数据修改成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "黑名单数据修改失败",
        data: error.toString()
      });
    }
  }

  async destroy({ params, response }) {
    const { id } = params;
    try {
      const book = await BlackList.find(id);
      const result = await book.delete();
      return response.json({
        status: "success",
        msg: "黑名单数据删除成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "黑名单数据删除失败",
        data: error.toString()
      });
    }
  }
}

module.exports = BlackListController;
