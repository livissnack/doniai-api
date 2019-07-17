"use strict";
const Env = use("Env");

module.exports = {
  ali: {
    /*
    |--------------------------------------------------------------------------
    | Ali Bucket
    |--------------------------------------------------------------------------
    |
    |
    */
    region: Env.get("ALI_REGION"),
    accessKeyId: Env.get("ALI_ACCESS_KEY_ID"),
    accessKeySecret: Env.get("ALI_ACCESS_KEY_SECRET"),
    bucket: Env.get("ALI_BUCKET")
  },

  cdn: {
    domian: Env.get("ALI_CDN_DOMAIN", "")
  },

  ali_cluster: {
    cluster: [
      {
        host: "host1",
        accessKeyId: "id1",
        accessKeySecret: "secret1"
      },
      {
        host: "host2",
        accessKeyId: "id2",
        accessKeySecret: "secret2"
      }
    ],
    schedule: "masterSlave" //default is `roundRobin`
  }
};
