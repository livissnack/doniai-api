'use strict'

const axios = use('axios')
const Config = use('Config')
const ticketConfig = Config.get('12306.config')

class TicketController {
  /**
   * 12306余票查询
   * @param {request} param0
   * @param {response} param0
   */
  async query({ request, response }) {
    try {
      const {
        train_date,
        from_station,
        to_station,
        purpose_codes
      } = request.only([
        'train_date',
        'from_station',
        'to_station',
        'purpose_codes'
      ])
      const url = `${ticketConfig.queryUrl}?${ticketConfig.prefix}.train_date=${
        train_date ? train_date : ticketConfig.train_date
      }&${ticketConfig.prefix}.from_station=${
        from_station ? from_station : ticketConfig.from_station
      }&${ticketConfig.prefix}.to_station=${
        to_station ? to_station : ticketConfig.to_station
      }&purpose_codes=${
        purpose_codes ? purpose_codes : ticketConfig.purpose_codes
      }`
      const result = await axios.get(url)
      if (result.data.httpstatus === 200) {
        let queryRes = result.data.data.result
        let doQueryRes = []
        queryRes.forEach((value, index) => {
          let car = value.split('|')
          //   doQueryRes[index] = car;
          doQueryRes[index] = {
            secure_str: car[0], //安全字符串
            train_no: car[2], //车次编号
            train_type_no: car[3], //车次类型编号
            start_time: car[8], //起始时间
            end_time: car[9], //结束时间
            long_time: car[10], //历时时间
            train_date: car[13], //发车日期
            from_station: car[6], //出发站
            from_station_no: car[16], //出发站编号
            to_station: car[7], //到达站
            to_station_no: car[17], //到达站编号
            seat_types: car[35], //座位类别集合
            senior_soft_sleeper: car[22], //高级软卧
            soft_sleeper: car[23], //软卧
            move_sleeper: car[24], //动卧
            unknown: car[25], //未知
            no_seat: car[26], //无座
            soft_seat: car[27], //软座
            hard_seat: car[28], //硬座
            hard_sleeper: car[29], //硬卧
            business_seat: car[32], //商务座特等座
            first_class_seat: car[31], //一等座
            second_class_seat: car[30] //二等座
          }
        })

        return doQueryRes
      } else {
        throw new '请求出错'()
      }
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '数据获取失败',
        data: error.toString()
      })
    }
  }

  /**
   * 12306查询票价
   * @param {request} param0
   * @param {response} param0
   */
  async price({ request, response }) {
    try {
      const {
        train_no,
        from_station_no,
        to_station_no,
        seat_types,
        train_date
      } = request.only([
        'train_no',
        'from_station_no',
        'to_station_no',
        'seat_types',
        'train_date'
      ])
      const url = `${ticketConfig.priceUrl}?train_no=${
        train_no ? train_no : '65000K16200G'
      }&from_station_no=${
        from_station_no ? from_station_no : '01'
      }&to_station_no=${to_station_no ? to_station_no : '17'}&seat_types=${
        seat_types ? seat_types : '1413'
      }&train_date=${train_date ? train_date : '2019-10-01'}`
      const result = await axios.get(url)
      if (result.data.httpstatus === 200) {
        let queryRes = result.data.data
        return queryRes
      } else {
        throw new '请求出错'()
      }
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '数据获取失败',
        data: error.toString()
      })
    }
  }

  /**
   * 12306查找两车站之间经过的站点
   * @param {request} param0
   * @param {response} param0
   */
  async train({ request, response }) {
    try {
      const {
        train_no,
        from_station_telecode,
        to_station_telecode,
        depart_date
      } = request.only([
        'train_no',
        'from_station_telecode',
        'to_station_telecode',
        'depart_date'
      ])
      const url = `${ticketConfig.trainUrl}?train_no=${
        train_no ? train_no : '65000K16200G'
      }&from_station_telecode=${
        from_station_telecode ? from_station_telecode : 'BJQ'
      }&to_station_telecode=${
        to_station_telecode ? to_station_telecode : 'QRN'
      }&depart_date=${depart_date ? depart_date : '2019-10-01'}`
      const result = await axios.get(url)
      if (result.data.httpstatus === 200) {
        let queryRes = result.data.data
        return queryRes
      } else {
        throw new '请求出错'()
      }
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '数据获取失败',
        data: error.toString()
      })
    }
  }

  /**
   * 12306下订单
   * @param {request} param0
   * @param {response} param0
   */
  async order({ request, response }) {
    return 'order'
  }

  /**
   * 12306用户登录
   * @param {request} param0
   * @param {response} param0
   */
  async login({ request, response }) {
    return 'login'
  }

  /**
   * 12306用户登录状态检查
   * @param {request} param0
   * @param {response} param0
   */
  async check({ request, response }) {
    return 'check'
  }

  /**
   * 12306查找所有或者单个站点信息
   * @param {request} param0
   * @param {response} param0
   */
  async station({ request, response }) {
    try {
      const cityCode = request.input('city_code', 'QRN')
      const url = `${ticketConfig.stationsUrl}`
      const result = await axios.get(url)
      const stationStr = result.data.split('=')[1]
      const stationArrStr = stationStr.split('@')
      let allStation = []
      stationArrStr.shift()
      stationArrStr.forEach((value, index) => {
        allStation[index] = value.split('|')
      })
      if (cityCode === 'ALL') {
        return allStation
      } else {
        const findStation = allStation.filter(element => {
          if (element[2] === cityCode) {
            return element
          }
        })
        return findStation
      }
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '数据获取失败',
        data: error.toString()
      })
    }
  }
}

module.exports = TicketController
