"use strict";

const Article = use("App/Models/Article");

class ArticleController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
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
}

module.exports = ArticleController;
