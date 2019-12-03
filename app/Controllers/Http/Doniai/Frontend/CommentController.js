"use strict";

const Comment = use("App/Models/Comment");
const { isEmpty } = require("../../../../Utils/Helpers");

class CommentController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const user_id = request.input("user_id");
      if (!isEmpty(user_id)) {
        Object.assign(iWhere, { user_id: user_id });
      }
      const data = await Comment.query()
        .where(iWhere)
        .with("user")
        .paginate(page, perPage);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async store({ request }) {
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
      return Object.assign({
        result1: commentResult,
        result2: commentRelationResult
      });
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = CommentController;
