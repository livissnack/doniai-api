'use strict'
const Config = use("Config");
const AliOss = use("ali-oss");
const Helpers = use('Helpers');
const ossConfig = Config.get("oss.ali");
const Course = use("App/Models/Course");
const {formatDate} = require("../../../Utils/Helpers");

class CourseController {
    async index({request, response}) {
        const {page, pageSize} = request.only(['page', 'pageSize']);
        const isFree = request.input('is_free', 0);
        const status = request.input('status', 0);
        const iWhere = { is_free: isFree, course_status: status };
        try {
            const data = await Course.query()
                .where(iWhere)
                .with('courseType')
                .paginate(page, pageSize);
            return response.json({
                status: "success",
                msg: "课程列表数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "课程列表数据获取失败",
                data: error.toString()
            });
        }
    }

    async store({request, response}) {
        const data = request.only(['title', 'intro', 'discuss_qq_group', 'support_wechat', 'course_type_id', 'course_status', 'is_free', 'price']);
        const image = request.file('image', {types: ['image'], size: '2mb'});
        try {
            const filepath = await image.move(Helpers.tmpPath('uploads'), {name: image.clientName, overwrite: true});
            const store = AliOss(ossConfig);
            const ossPutObj = await store.put(`uploads/${formatDate(new Date(), "YYYY-MM-DD")}/${filepath.clientName}`, filepath);
            const ossObjUrl = await store.getObjectUrl(ossPutObj.name, Config.get("oss.cdn").domian);
            const course = new Course();
            course.fill(data);
            course.merge(course, ossObjUrl);
            const result = await course.save();
            return response.json({
                status: "success",
                msg: "课程保存成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "课程保存失败",
                data: error.toString()
            });
        }
    }

    async show({params, response}) {
        const {id} = params;
        try {
            const data = await Course.query()
                .where("id", id)
                .fetch();
            return response.json({
                status: "success",
                msg: "课程数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "课程数据获取失败",
                data: error.toString()
            });
        }
    }

    async update({params, request, response}) {
        const {id} = params;
        const data = request.only(['title', 'intro', 'image', 'discuss_qq_group', 'support_wechat', 'course_type_id', 'course_status', 'is_free', 'price']);
        try {
            const result = await Course.query().where('id', id).update(data);
            return response.json({
                status: "success",
                msg: "课程数据修改成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "课程数据修改失败",
                data: error.toString()
            });
        }

    }

    async destroy({params, response}) {
        const {id} = params;
        try {
            const course = await Course.find(id);
            const result = await course.delete();
            return response.json({
                status: "success",
                msg: "课程数据删除成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "课程数据删除失败",
                data: error.toString()
            });
        }
    }
}

module.exports = CourseController
