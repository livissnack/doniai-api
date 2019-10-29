'use strict'

const OSS = use('ali-oss')
const AliOssConfig = use('Config').get('oss.ali')
delete AliOssConfig.bucket
const client = new OSS(AliOssConfig)
const OssBucket = use('App/Models/OssBucket')

class OssBucketController {
  async putBucket({ request, response }) {
    try {
      const { bucket_name, base_url } = request.only([
        'bucket_name',
        'base_url'
      ])

      const result1 = await client.putBucket(bucket_name)
      const result2 = await client.getBucketACL(bucket_name)

      const ossBucket = new OssBucket()
      ossBucket.bucket_name = bucket_name
      ossBucket.base_url = base_url
      ossBucket.acl_str = result2.acl
      await ossBucket.save()
      return response.json({
        status: 'success',
        msg: '存取桶创建成功',
        data: result1
      })
    } catch (err) {
      return response.json({
        status: 'failure',
        msg: '存取桶创建失败',
        data: error.toString()
      })
    }
  }

  async listBuckets() {
    try {
      const { page, pageSize } = request.only(['page', 'pageSize'])
      const data = await OssBucket.query().paginate(page, pageSize)
      return response.json({
        status: 'success',
        msg: '存取桶数据获取成功',
        data: data
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '存取桶数据获取失败',
        data: error.toString()
      })
    }
  }

  async deleteBucket() {
    try {
      const bucket_name = request.input('bucket_name')
      const result = await client.deleteBucket(bucket_name)

      await OssBucket.query()
        .whereIn('bucket_name', bucket_name)
        .delete()
      return response.json({
        status: 'success',
        msg: '存取桶删除成功',
        data: result
      })
    } catch (err) {
      return response.json({
        status: 'failure',
        msg: '存取桶删除失败',
        data: error.toString()
      })
    }
  }

  async putBucketACL() {
    try {
      const { bucket_name, acl_str } = request.only(['bucket_name', 'acl_str'])
      const result = await client.putBucketACL(bucket_name, acl_str)

      await OssBucket.query()
        .where('bucket_name', bucket_name)
        .update({ acl_str: acl_str })
      return response.json({
        status: 'success',
        msg: '存取桶权限设置成功',
        data: result
      })
    } catch (err) {
      return response.json({
        status: 'failure',
        msg: '存取桶权限设置失败',
        data: error.toString()
      })
    }
  }
}

module.exports = OssBucketController
