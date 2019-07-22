"use strict";
const {
  httpGet,
  parseBaiduHotNews,
  parseToutiaoHotNews,
  isOk
} = require("../../../Utils/Helpers");

class CrawlerController {
  /**
   * 开始执行爬虫--爬取百度热门新闻
   * @param {response} object
   */
  async crawlerBaiduHotNews({ response }) {
    let crawlerData = await httpGet("http://news.baidu.com/");
    if (isOk(crawlerData.status)) {
      let hotNews = await parseBaiduHotNews(crawlerData.data);
      return response.json(hotNews);
    }
  }

  /**
   * 开始执行爬虫--爬取头条热门新闻
   * @param {response} object
   */
  async crawlerToutiaoHotNews({ response }) {
    let crawlerData = await httpGet("https://www.toutiao.com/ch/news_hot/");
    if (isOk(crawlerData.status)) {
      let hotNews = await parseToutiaoHotNews(crawlerData.data);
      return response.json(hotNews);
    }
  }

  /**
   * 开始执行爬虫--爬取免费的高匿名代理
   * @param {reponse} object 
   */
  async crawlerFreeProxy({ response }) {
    try{
      let crawlerData = await httpGet("http://free-proxy.cz/zh/proxylist/country/all/socks5/ping/level1");
      if (isOk(crawlerData.status)) {
        let proxyList = await parseFreeProxy(crawlerData.data);
        return response.json(proxyList);
      }
    }catch(error) {
      return response.json({
        status: "failure",
        msg: "数据抓取失败",
        data: error.toString()
      });
    }
    
  }

  async index() {
    return "dadadas";
  }
}

module.exports = CrawlerController;
