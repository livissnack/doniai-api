'use strict'

const OSS = use('ali-oss')
const AliOssConfig = use('Config').get('oss.ali')
const OssObject = use('App/Models/OssObject')
const OssBucket = use('App/Models/OssBucket')
const { md5 } = require('../../../Utils/Helpers')

class OssObjectController {
  async putObject({ request, response }) {
    try {
      const oss_obj = request.file('oss_obj')
      const bucket_name = request.input('bucket_name')
      AliOssConfig.bucket = bucket_name
      const client = new OSS(AliOssConfig)

      const fileSize = oss_obj.size

      let oss_obj_name = `uploads/${new Date().getTime()}.${oss_obj.subtype}`
      let result = null
      if (fileSize > 1000000) {
        result = await client.multipartUpload(oss_obj_name, oss_obj, {
          checkpoint: savedCpt,
          progress: function(p, cpt, res) {
            console.log(p)
            console.log(cpt)
            console.log(res.headers['x-oss-request-id'])
          }
        })
      } else {
        result = await client.put(oss_obj_name, oss_obj)
      }

      const aclObj = await client.getACL(oss_obj_name)

      const bucketObj = await OssBucket.findBy('bucket_name', bucket_name)

      const ossObject = new OssObject()
      ossObject.path = oss_obj_name
      ossObject.bucket_id = bucketObj.id
      ossObject.bucket_name = bucketObj.bucket_name
      ossObject.original_name = oss_obj.fileName
      ossObject.mime_type = oss_obj.type
      ossObject.extension = oss_obj.extname
      ossObject.acl_str = aclObj.acl
      ossObject.width = oss_obj.width ? oss_obj.width : 0
      ossObject.height = oss_obj.height ? oss_obj.height : 0
      ossObject.size = fileSize
      ossObject.ip = request.ip
      ossObject.md5 = md5(oss_obj_name)
      await ossObject.save()

      return response.json({
        status: 'success',
        msg: '对象创建成功',
        data: result1
      })
    } catch (err) {
      let msg = null
      if (err.code === 'ConnectionTimeoutError') {
        msg = 'Woops,超时啦!'
      }
      return response.json({
        status: 'failure',
        msg: msg,
        data: error.toString()
      })
    }
  }

  async listObjects() {
    try {
      const { page, pageSize } = request.only(['page', 'pageSize'])
      const data = await OssObject.query().paginate(page, pageSize)
      return response.json({
        status: 'success',
        msg: '存取桶对象获取成功',
        data: data
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '存取桶对象获取失败',
        data: error.toString()
      })
    }
  }

  async deleteObject() {
    try {
      const object_names = request.input('object_names')
      const bucket_name = request.input('bucket_name')
      AliOssConfig.bucket = bucket_name
      const client = new OSS(AliOssConfig)

      const result = await client.deleteMulti(object_names)

      await OssObject.query()
        .whereIn('object_name', object_names)
        .delete()
      return response.json({
        status: 'success',
        msg: '存取桶对象删除成功',
        data: result
      })
    } catch (err) {
      return response.json({
        status: 'failure',
        msg: '存取桶对象删除失败',
        data: error.toString()
      })
    }
  }

  async putObjectACL() {
    try {
      const { object_name, bucket_name, acl_str } = request.only([
        'object_name',
        'bucket_name',
        'acl_str'
      ])
      AliOssConfig.bucket = bucket_name
      const client = new OSS(AliOssConfig)
      const result = await client.putACL(object_name, acl_str)

      await OssObject.query()
        .where('object_name', object_name)
        .update({ acl_str: acl_str })
      return response.json({
        status: 'success',
        msg: '存取桶对象权限设置成功',
        data: result
      })
    } catch (err) {
      return response.json({
        status: 'failure',
        msg: '存取桶对象权限设置失败',
        data: error.toString()
      })
    }
  }
}

module.exports = OssObjectController
