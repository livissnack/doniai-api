"use strict";
const Env = use("Env");
const BaseUrl = "https://kyfw.12306.cn";

module.exports = {
  config: {
    //   https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=2019-12-12&leftTicketDTO.from_station=SZQ&leftTicketDTO.to_station=QRN&purpose_codes=ADULT
    queryUrl: Env.get("TICKET_URL", `${BaseUrl}/otn/leftTicket/query`),
    //   https://kyfw.12306.cn/otn/resources/js/framework/station_name.js
    stationsUrl: Env.get(
      "TICKET_STATIONS_URL",
      `${BaseUrl}/otn/resources/js/framework/station_name.js`
    ),
    //   https://kyfw.12306.cn/otn/leftTicket/queryTicketPrice?train_no=65000K16200G&from_station_no=01&to_station_no=17&seat_types=1413&train_date=2019-10-01
    priceUrl: Env.get(
      "TICKET_PRICE_URL",
      `${BaseUrl}/otn/leftTicket/queryTicketPrice`
    ),
    //   https://kyfw.12306.cn/otn/czxx/queryByTrainNo?train_no=65000K16200G&from_station_telecode=BJQ&to_station_telecode=QRN&depart_date=2019-10-01
    trainUrl: Env.get("TICKET_TRAIN_URL", `${BaseUrl}/otn/czxx/queryByTrainNo`),
    train_date: Env.get("TRAIN_DATE", "2019-10-01"),
    from_station: Env.get("FROM_STATION", "SZQ"),
    to_station: Env.get("TO_STATION", "QRN"),
    purpose_codes: Env.get("PURPOSE_CODES", "ADULT"),
    prefix: Env.get("TICKET_PREFIX", "leftTicketDTO")
  }
};
