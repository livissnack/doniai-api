"use strict";

const Replay = use("App/Models/Replay");

class ReplayController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const data = await Replay.query()
        .where(iWhere)
        .with("user")
        .paginate(page, perPage);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async store({ request }) {
    const data = request.only(["question_id", "pid", "user_id", "content"]);
    try {
      const replay = new Replay();
      replay.fill(data);
      const result = await replay.save();
      return result;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = ReplayController;
