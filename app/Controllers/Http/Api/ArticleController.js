"use strict";

const User = use("App/Models/User");
const Article = use("App/Models/Article");
const ArticleTag = use("App/Models/ArticleTag");
const ArticleType = use("App/Models/ArticleType");
const { isEmpty } = require("../../../Utils/Helpers");

class ArticleController {
  async index({ request, response }) {
    try {
      const { page, pageSize } = request.only(["page", "pageSize"]);
      let iWhere = {};
      const articleType = request.input("article_type");
      if (!isEmpty(articleType)) {
        const articleTypeData = await ArticleType.findBy("value", articleType);
        Object.assign(iWhere, { article_type_id: articleTypeData.id });
      }
      const articleTag = request.input("article_tag");
      if (!isEmpty(articleTag)) {
        const articleTagData = await ArticleTag.findBy("value", articleTag);
        Object.assign(iWhere, { article_tag_id: articleTagData.id });
      }
      const username = request.input("username");
      if (!isEmpty(username)) {
        const userData = await User.findBy("username", username);
        Object.assign(iWhere, { id: userData.id });
      }
      const data = await Article.query()
        .where(iWhere)
        .with("user")
        .with("articleTag")
        .with("articleType")
        .paginate(page, pageSize);
      return response.json({
        status: "success",
        msg: "文章列表数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "文章列表数据获取失败",
        data: error.toString()
      });
    }
  }

  async store({ request, response }) {
    const data = request.only([
      "title",
      "image",
      "user_id",
      "article_type_id",
      "article_tag_id",
      "content"
    ]);
    const image = request.file("image", { types: ["image"], size: "2mb" });
    const publish_at = request.input("publish_at", new Date().getTime());
    try {
      const article = new Article();
      article.fill(data);
      article.merge(article, publish_at);
      const result = await article.save();
      return response.json({
        status: "success",
        msg: "文章保存成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "文章保存失败",
        data: error.toString()
      });
    }
  }

  async show({ params, response }) {
    const articleId = params.id;
    try {
      const data = await Article.query()
        .where("id", articleId)
        .with("user")
        .with("articleTag")
        .with("articleType")
        .fetch();
      return response.json({
        status: "success",
        msg: "文章数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "文章数据获取成功",
        data: error.toString()
      });
    }
  }

  async update({ params, request, response }) {
    const { id } = params;
    const content = request.input("content");
    try {
      const result = await Article.query()
        .where("id", id)
        .update({ content: content });
      return response.json({
        status: "success",
        msg: "文章修改成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "文章修改失败",
        data: error.toString()
      });
    }
  }

  async destroy({ params, response }) {
    const { id } = params;
    try {
      const article = await Article.find(id);
      const result = await article.delete();
      return response.json({
        status: "success",
        msg: "文章删除成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "文章删除失败",
        data: error.toString()
      });
    }
  }
}

module.exports = ArticleController;
