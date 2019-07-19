"use strict";
const Env = use("Env");

module.exports = {
  config: {
    baseUrl: Env.get("BANWA_BASE_URL"),
    veid: Env.get("BANWA_VEID"),
    api_key: Env.get("BANWA_API_KEY")
  }
};
