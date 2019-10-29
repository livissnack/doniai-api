'use strict'
const HspxsteelInquiry = use('App/Models/HspxsteelInquiry')

class InquiryController {
  async create({ request, response }) {
    const data = request.only([
      'name',
      'company',
      'address',
      'email',
      'phone',
      'question'
    ])
    try {
      const hspxsteelInquiry = new HspxsteelInquiry()
      hspxsteelInquiry.fill(data)
      const result = await hspxsteelInquiry.save()
      return response.json({
        status: 'success',
        msg: '保存成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '保存失败',
        data: error.toString()
      })
    }
  }
}

module.exports = InquiryController
