'use strict'
const Link = use("App/Models/Link");
class LinkController {
    async index({ request, response }) {
        const { page, pageSize } = request.only(["page", "pageSize"]);
        try {
            const data = await Link.query()
                .paginate(page, pageSize);
            return response.json({
                status: "success",
                msg: "链接列表数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "链接列表数据获取失败",
                data: error.toString()
            });
        }
    }

    async store({ request, response }) {
        const data = request.only([
            "name",
            "url",
            "is_show",
            "type"
        ]);
        try {
            const link = new Link();
            link.fill(data);
            const result = await link.save();
            return response.json({
                status: "success",
                msg: "链接保存成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "链接保存失败",
                data: error.toString()
            });
        }
    }

    async show({ params, response }) {
        const { id } = params;
        try {
            const data = await Link.query()
                .where("id", id)
                .fetch();
            return response.json({
                status: "success",
                msg: "链接数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "链接数据获取失败",
                data: error.toString()
            });
        }
    }

    async update({ params, request, response }) {
        const { id } = params;
        const data = request.only([
            "name",
            "url",
            "is_show",
            "type"
        ]);
        try {
            const result = await Link.query()
                .where("id", id)
                .update(data);
            return response.json({
                status: "success",
                msg: "链接数据修改成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "链接数据修改失败",
                data: error.toString()
            });
        }
    }

    async destroy({ params, response }) {
        const { id } = params;
        try {
            const link = await Link.find(id);
            const result = await link.delete();
            return response.json({
                status: "success",
                msg: "链接数据删除成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "链接数据删除失败",
                data: error.toString()
            });
        }
    }
}

module.exports = LinkController
