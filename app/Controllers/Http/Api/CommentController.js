"use strict";

const User = use("App/Models/User");
const Comment = use("App/Models/Comment");
const { isEmpty } = require("../../../Utils/Helpers");

class CommentController {
  async index({ request, response }) {
    try {
      const { page, pageSize } = request.only(["page", "pageSize"]);
      let iWhere = {};
      const username = request.input("username");
      if (!isEmpty(username)) {
        const userData = await User.findBy("username", username);
        Object.assign(iWhere, { user_id: userData.id });
      }
      const pid = request.input("pid");
      if (!isEmpty(pid)) {
        Object.assign(iWhere, { pid: pid });
      }
      const type = request.input("type");
      if (!isEmpty(type)) {
        Object.assign(iWhere, { type: type });
      }
      const data = await Comment.query()
        .where(iWhere)
        .with("user")
        .paginate(page, pageSize);
      return response.json({
        status: "success",
        msg: "评论列表数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "评论列表数据获取失败",
        data: error.toString()
      });
    }
  }

  async store({ request, response }) {
    const data = request.only([
      "comment_id",
      "comment_type",
      "user_id",
      "content"
    ]);
    try {
      const comment = new Comment();
      comment.fill(data);
      const commentResult = await comment.save();
      const commentRelation = new CommentRelation();
      commentRelation.parent_id = data.comment_id;
      commentRelation.child_id = commentResult;
      const commentRelationResult = await commentRelation.save();
      return response.json({
        status: "success",
        msg: "评论保存成功",
        data: Object.assign({
          result1: commentResult,
          result2: commentRelationResult
        })
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "评论保存失败",
        data: error.toString()
      });
    }
  }

  async show({ params, response }) {
    const { id } = params;
    try {
      const data = await Comment.query()
        .where("id", id)
        .with("user")
        .fetch();
      return response.json({
        status: "success",
        msg: "评论数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "评论数据获取失败",
        data: error.toString()
      });
    }
  }

  async update({ params, request, response }) {
    const { id } = params;
    const content = request.input("content");
    try {
      const result = await Comment.query()
        .where("id", id)
        .update({ content: content });
      return response.json({
        status: "success",
        msg: "评论数据修改成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "评论数据修改失败",
        data: error.toString()
      });
    }
  }

  async destroy({ params, response }) {
    const { id } = params;
    try {
      const comment = await Comment.find(id);
      const result = await comment.delete();
      return response.json({
        status: "success",
        msg: "评论数据删除成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "评论数据删除失败",
        data: error.toString()
      });
    }
  }
}

module.exports = CommentController;
