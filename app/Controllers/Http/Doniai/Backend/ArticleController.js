"use strict";

const Excel = use("exceljs");
const User = use("App/Models/User");
const Article = use("App/Models/Article");
const ArticleTag = use("App/Models/ArticleTag");
const ArticleType = use("App/Models/ArticleType");
const { isEmpty } = require("../../../../Utils/Helpers");

class ArticleController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
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
        .paginate(page, perPage);
      return data;
    } catch (error) {
      error.toString();
    }
  }

  async store({ request }) {
    const data = request.only([
      "title",
      "image",
      "user_id",
      "article_type_id",
      "article_tag_id",
      "content"
    ]);
    try {
      const article = new Article();
      article.fill(data);
      const result = await article.save();
      return result;
    } catch (error) {
      return error.toString();
    }
  }

  async show({ params }) {
    const articleId = params.id;
    try {
      const data = await Article.query()
        .where("id", articleId)
        .with("user")
        .with("articleTag")
        .with("articleType")
        .fetch();
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async update({ params, request }) {
    const { id } = params;
    const content = request.input("content");
    try {
      const result = await Article.query()
        .where("id", id)
        .update({ content: content });
      return result;
    } catch (error) {
      return error.toString();
    }
  }

  async destroy({ params }) {
    const { id } = params;
    try {
      const article = await Article.find(id);
      const result = await article.delete();
      return result;
    } catch (error) {
      return error.toString();
    }
  }

  async batchDel({ request }) {
    try {
      const ids = request.input("ids");
      const result = await Article.query()
        .whereIn("id", ids)
        .delete();
      return result;
    } catch (error) {
      return error.toString();
    }
  }

  async export() {
    try {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet("Sales Data");

      const data = [
        { product: "Product A", week1: 5, week2: 10, week3: 27 },
        { product: "Product B", week1: 5, week2: 5, week3: 11 },
        { product: "Product C", week1: 1, week2: 2, week3: 3 },
        { product: "Product D", week1: 6, week2: 1, week3: 2 }
      ];

      const headers = [
        { header: "Product ID", key: "product", width: 20 },
        { header: "Week 1", key: "week1", width: 10 },
        { header: "Week 2", key: "week2", width: 10 },
        { header: "Week 3", key: "week3", width: 10 },
        { header: "Product Totals", key: "productTotals", width: 12 }
      ];

      data.forEach((item, index) => {
        worksheet.addRow({
          ...item
        });
      });
      await workbook.xlsx.writeFile("sales-report.xlsx");
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = ArticleController;
