'use strict'

const Config = use('Config')
const sms = use('@alicloud/pop-core')
const smsConfig = Config.get('sms.ali')

class SmsController {
  /**
   * @method query
   * ali query send details
   * @param {request} object
   * @param {response} object
   */
  async query({ request, response }) {
    try {
      const params = request.only(
        'RegionId',
        'PhoneNumber',
        'SendDate',
        'PageSize',
        'CurrentPage',
        'BizId'
      )
      const client = new sms({ smsConfig })
      const data = await client.request('QuerySendDetails', params, {
        method: 'POST'
      })
      return response.json({
        status: 'success',
        msg: '发送短信详情查询成功',
        data: data
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '发送短信详情查询失败',
        data: error.toString()
      })
    }
  }

  /**
   * @method send
   * ali send sms
   * @param {request} object
   * @param {response} object
   */
  async send({ request, response }) {
    try {
      const params = request.only(
        'RegionId',
        'PhoneNumber',
        'SignName',
        'TemplateCode',
        'TemplateParam',
        'SmsUpExtendCode',
        'OutId'
      )
      const client = new sms({ smsConfig })
      const data = await client.request('SendSms', params, {
        method: 'POST'
      })
      return response.json({
        status: 'success',
        msg: '短信发送成功',
        data: data
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '短信发送失败',
        data: error.toString()
      })
    }
  }

  /**
   * @method sendBatch
   * ali send batch sms
   * @param {request} object
   * @param {response} object
   */
  async sendBatch({ request, response }) {
    try {
      const params = request.only(
        'RegionId',
        'PhoneNumberJson',
        'SignNameJson',
        'TemplateCode',
        'TemplateParamJson',
        'SmsUpExtendCodeJson'
      )
      const client = new sms({ smsConfig })
      const data = await client.request('SendBatchSms', params, {
        method: 'POST'
      })
      return response.json({
        status: 'success',
        msg: '短信批量发送成功',
        data: data
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '短信批量发送失败',
        data: error.toString()
      })
    }
  }
}

module.exports = SmsController
