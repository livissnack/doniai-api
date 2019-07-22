"use strict";
const Env = use("Env");

module.exports = {
  ali: {
    /*
    |--------------------------------------------------------------------------
    | Ali sms config
    |--------------------------------------------------------------------------
    |
    |
    */
    accessKeyId: Env.get("ALI_ACCESS_KEY_ID"),
    accessKeySecret: Env.get("ALI_ACCESS_KEY_SECRET"),
    endpoint: Env.get("ALI_SMS_ENDPOINT"),
    apiVersion: Env.get("ALI_SMS_API_VERSION")
  }
};
