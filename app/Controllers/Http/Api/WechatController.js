'use strict'
const Tenpay = use('tenpay')
const config = {
  appid: '公众号ID',
  mchid: '微信商户号',
  partnerKey: '微信支付安全密钥',
  pfx: require('fs').readFileSync('证书文件路径'),
  notify_url: '支付回调网址',
  spbill_create_ip: 'IP地址'
}

class WechatController {
  async unifiedOrder({ request, response }) {
    let result = await api.unifiedOrder({
      out_trade_no: '商户内部订单号',
      body: '商品简单描述',
      total_fee: '订单金额(分)',
      openid: '用户openid'
    })
    return result
  }

  async paidNotify({ request, response }) {
    let result = await api.unifiedOrder({
      out_trade_no: '商户内部订单号',
      body: '商品简单描述',
      total_fee: '订单金额(分)',
      openid: '用户openid'
    })
    return result
  }
}

module.exports = WechatController
