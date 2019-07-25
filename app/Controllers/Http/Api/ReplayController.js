'use strict'
const Replay = use("App/Models/Replay");

class ReplayController {
    async index({ request, response }) {
        const { page, pageSize } = request.only(["page", "pageSize"]);
        const questionId = request.input("question_id", 0);
        const iWhere = { question_id: questionId };
        try {
            const data = await Replay.query()
                .where(iWhere)
                .with("user")
                .paginate(page, pageSize);
            return response.json({
                status: "success",
                msg: "问题回复数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "问题回复数据获取失败",
                data: error.toString()
            });
        }
    }

    async store({ request, response }) {
        const data = request.only([
            "question_id",
            "pid",
            "user_id",
            "content"
        ]);
        try {
            const replay = new Replay();
            replay.fill(data);
            const result = await replay.save();
            return response.json({
                status: "success",
                msg: "问题回复数据保存成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "问题回复数据保存失败",
                data: error.toString()
            });
        }
    }

    async show({ params, response }) {
        const { id } = params;
        try {
            const data = await Replay.query()
                .where("id", id)
                .fetch();
            return response.json({
                status: "success",
                msg: "问题回复数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "问题回复数据获取失败",
                data: error.toString()
            });
        }
    }

    async update({ params, request, response }) {
        const { id } = params;
        const data = request.only([
            "content"
        ]);
        try {
            const result = await Replay.query()
                .where("id", id)
                .update(data);
            return response.json({
                status: "success",
                msg: "问题回复数据修改成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "问题回复数据修改失败",
                data: error.toString()
            });
        }
    }

    async destroy({ params, response }) {
        const { id } = params;
        try {
            const replay = await Replay.find(id);
            const result = await replay.delete();
            return response.json({
                status: "success",
                msg: "问题回复数据删除成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "问题回复数据删除失败",
                data: error.toString()
            });
        }
    }
}

module.exports = ReplayController
