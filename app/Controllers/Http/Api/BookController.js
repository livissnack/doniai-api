"use strict";

const Book = use("App/Models/Book");
const { isEmpty } = require("../../../Utils/Helpers");

class BookController {
  async index({ request, response }) {
    try {
      const { page, pageSize } = request.only(["page", "pageSize"]);
      let iWhere = {};
      const name = request.input("name");
      if (!isEmpty(name)) {
        Object.assign(iWhere, { name: name });
      }
      const is_recommend = request.input("is_recommend");
      if (!isEmpty(is_recommend)) {
        Object.assign(iWhere, { is_recommend: is_recommend });
      }
      const data = await Book.query()
        .where(iWhere)
        .paginate(page, pageSize);
      return response.json({
        status: "success",
        msg: "书籍列表数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "书籍列表数据获取失败",
        data: error.toString()
      });
    }
  }

  async store({ request, response }) {
    const data = request.only(["name", "intro", "is_recommend", "image"]);
    try {
      const book = new Book();
      book.fill(data);
      const result = await book.save();
      return response.json({
        status: "success",
        msg: "书籍保存成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "书籍保存失败",
        data: error.toString()
      });
    }
  }

  async show({ params, response }) {
    const { id } = params;
    try {
      const data = await Book.query()
        .where("id", id)
        .fetch();
      return response.json({
        status: "success",
        msg: "书籍数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "书籍数据获取失败",
        data: error.toString()
      });
    }
  }

  async update({ params, request, response }) {
    const { id } = params;
    const data = request.only(["name", "intro", "is_recommend", "image"]);
    try {
      const result = await Comment.query()
        .where("id", id)
        .update(data);
      return response.json({
        status: "success",
        msg: "书籍数据修改成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "书籍数据修改失败",
        data: error.toString()
      });
    }
  }

  async destroy({ params, response }) {
    const { id } = params;
    try {
      const book = await Book.find(id);
      const result = await book.delete();
      return response.json({
        status: "success",
        msg: "书籍数据删除成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "书籍数据删除失败",
        data: error.toString()
      });
    }
  }
}

module.exports = BookController;
