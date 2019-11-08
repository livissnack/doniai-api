'use strict'
const {
  httpGet,
  parseBaiduHotNews,
  parseToutiaoHotNews,
  isOk
} = require('../../../Utils/Helpers')
const cheerio = require('cheerio')

class CrawlerController {
  async crawlerBaiduHotNews() {
    let crawlerData = await httpGet('http://news.baidu.com/')
    if (isOk(crawlerData.status)) {
      let hotNews = await parseBaiduHotNews(crawlerData.data)
      return hotNews
    }
  }

  async crawlerToutiaoHotNews() {
    let crawlerData = await httpGet('https://www.toutiao.com/ch/news_hot/')
    if (isOk(crawlerData.status)) {
      let hotNews = await parseToutiaoHotNews(crawlerData.data)
      return hotNews
    }
  }

  async crawlerFreeProxy() {
    try {
      let crawlerData = await httpGet(
        'http://free-proxy.cz/zh/proxylist/country/all/socks5/ping/level1'
      )
      if (isOk(crawlerData.status)) {
        let proxyList = await parseFreeProxy(crawlerData.data)
        return proxyList
      }
    } catch (error) {
      return error.toString()
    }
  }

  async astro({ request }) {
    const url = request.input('url')
    let data = await httpGet(url)
    let arr = []
    let title = ''
    if (data.status === 'ok') {
      let $ = cheerio.load(data.data)
      title = $('div.TODAY_CONTENT h3').text()
      $('div.TODAY_CONTENT p').each((idx, ele) => {
        arr.push($(ele).text())
      })
    }
    let res = {
      title: title,
      content: arr
    }
    return res
  }
}

module.exports = CrawlerController
