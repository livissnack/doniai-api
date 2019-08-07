"use strict";

const Config = use("Config");
const ossConfig = Config.get("oss.ali");

/**
 * all ali-oss operations
 */
class OssController {
  async getBucketConfig() {
    return ossConfig;
  }
}

module.exports = OssController;
