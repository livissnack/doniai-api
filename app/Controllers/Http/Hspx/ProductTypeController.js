'use strict'
const HspxsteelProductType = use('App/Models/HspxsteelProductType')

class ProductTypeController {
  async index({ request, response }) {
    try {
      const { page, pageSize } = request.only(['page', 'pageSize'])
      const data = await HspxsteelProductType.query().paginate(page, pageSize)
      return response.json({
        status: 'success',
        msg: '列表数据获取成功',
        data: data
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '列表数据获取失败',
        data: error.toString()
      })
    }
  }

  async store({ request, response }) {
    const data = request.only([
      'ar_value',
      'en_value',
      'ja_value',
      'ko_value',
      'tr_value',
      'zh_value'
    ])
    try {
      const hspxsteelProductType = new HspxsteelProductType()
      hspxsteelProductType.fill(data)
      const result = await hspxsteelProductType.save()
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

  async destroy({ params, response }) {
    const { id } = params
    try {
      const result = await HspxsteelProductType.find(id).delete()
      return response.json({
        status: 'success',
        msg: '删除成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '删除失败',
        data: error.toString()
      })
    }
  }
}

module.exports = ProductTypeController
