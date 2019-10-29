'use strict'

const AliOssConfig = use('Config')
const ossConfig = AliOssConfig.get('oss.ali')
const Config = use('App/Models/Config')

/**
 * all ali-oss operations
 */
class OssController {
  async getBucketConfig() {
    return ossConfig
  }

  async getImgOssConfig() {
    return await Config.query()
      .select(['key', 'value'])
      .whereIn('key', ['OSSAccessKeyId', 'Expires', 'Signature'])
      .fetch()
  }
}

module.exports = OssController
