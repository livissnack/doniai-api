'use strict'
const Video = use("App/Models/Video");
const Config = use("Config");
const AliOss = use("ali-oss");
const Helpers = use("Helpers");
const ossConfig = Config.get("oss.ali");
const {formatDate} = require("../../../Utils/Helpers");
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with videos
 */
class VideoController {
    /**
     * Show a list of all videos.
     * GET videos
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async index({request, response}) {
        const {page, pageSize} = request.only(["page", "pageSize"]);
        const courseId = request.input("course_id", 0);
        const iWhere = {course_id: courseId};
        try {
            const data = await Video.query()
                .where(iWhere)
                .with("course")
                .paginate(page, pageSize);
            return response.json({
                status: "success",
                msg: "视频列表数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "视频列表数据获取失败",
                data: error.toString()
            });
        }
    }

    /**
     * Create/save a new video.
     * POST videos
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({request, response}) {
        const data = request.only([
            "course_id",
            "name",
            "intro",
            "image",
            "duration",
            "publish_at",
            "url",
            "status",
            "is_free"
        ]);
        const image = request.file("image", {types: ["image"], size: "2mb"});
        try {
            const filepath = await image.move(Helpers.tmpPath("uploads"), {
                name: image.clientName,
                overwrite: true
            });
            const store = AliOss(ossConfig);
            const ossPutObj = await store.put(
                `uploads/${formatDate(new Date(), "YYYY-MM-DD")}/${
                    filepath.clientName
                    }`,
                filepath
            );
            const ossObjUrl = await store.getObjectUrl(
                ossPutObj.name,
                Config.get("oss.cdn").domian
            );
            const video = new Video();
            video.fill(data);
            video.merge(video, ossObjUrl);
            const result = await video.save();
            return response.json({
                status: "success",
                msg: "视频保存成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "视频保存失败",
                data: error.toString()
            });
        }
    }

    /**
     * Display a single video.
     * GET videos/:id
     *
     * @param {object} ctx
     * @param {Response} ctx.response
     */
    async show({params, response}) {
        const { id } = params;
        try {
            const data = await Video.query()
                .where("id", id)
                .fetch();
            return response.json({
                status: "success",
                msg: "视频数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "视频数据获取失败",
                data: error.toString()
            });
        }
    }

    /**
     * Update video details.
     * PUT or PATCH videos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({params, request, response}) {
        const { id } = params;
        const data = request.only([
            "course_id",
            "name",
            "intro",
            "image",
            "duration",
            "publish_at",
            "url",
            "status",
            "is_free"
        ]);
        try {
            const result = await Video.query()
                .where("id", id)
                .update(data);
            return response.json({
                status: "success",
                msg: "视频数据修改成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "视频数据修改失败",
                data: error.toString()
            });
        }
    }

    /**
     * Delete a video with id.
     * DELETE videos/:id
     *
     * @param {object} ctx
     * @param {Response} ctx.response
     */
    async destroy({params, response}) {
        const { id } = params;
        try {
            const video = await Video.find(id);
            const result = await video.delete();
            return response.json({
                status: "success",
                msg: "视频数据删除成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "视频数据删除失败",
                data: error.toString()
            });
        }
    }
}

module.exports = VideoController
