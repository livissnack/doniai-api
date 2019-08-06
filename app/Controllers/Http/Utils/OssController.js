"use strict";
const fs = use("fs");
const Path = use("path");
const Config = use("Config");
const AliOss = use("ali-oss");
const Helpers = use("Helpers");
const ossConfig = Config.get("oss.ali");
const ossClusterConfig = Config.get("oss.ali_cluster");

/**
 * all ali-oss operations
 */
class OssController {
  async getBucketConfig() {
    return ossConfig;
  }
  
  /**
   * query buckets list
   * @param {request} query options
   */
  async listBuckets({ request }) {
    const query = request.input("query", {});
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.listBuckets(Object.assign(query, options));
    return result;
  }

  /**
   * put bucket
   * @param {request} name options
   */
  async putBucket({ request }) {
    const name = request.input("name");
    const options = request.input("options"); //{timeout: 6000, StorageClass: 'Standard'}
    const store = AliOss(ossConfig);
    const result = await store.putBucket(name, options);
    return result;
  }

  /**
   * delete bucket
   * @param {request} name
   */
  async deleteBucket({ request }) {
    const name = request.input("name");
    const store = AliOss(ossConfig);
    const result = await store.deleteBucket(name);
    return result;
  }

  /**
   * use bucket
   * @param {request} name
   */
  async useBucket({ request }) {
    const name = request.input("name");
    const store = AliOss(ossConfig);
    const result = await store.useBucket(name);
    return result;
  }

  /**
   * get bucket info
   * @param {request} name
   */
  async getBucketInfo({ request }) {
    const name = request.input("name");
    const store = AliOss(ossConfig);
    const result = await store.getBucketInfo(name);
    return result;
  }

  /**
   * get bucket location
   * @param {request} name
   */
  async getBucketLocation({ request }) {
    const name = request.input("name");
    const store = AliOss(ossConfig);
    const result = await store.getBucketLocation(name);
    return result;
  }

  /**
   * put bucket acl
   * @param {request} name acl options
   */
  async putBucketAcl({ request }) {
    const name = request.input("name");
    const acl = request.input("acl", "public-read-write"); //public-read-write public-read private
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.putBucketACL(name, acl, options);
    return result;
  }

  /**
   * get bucket acl
   * @param {request} name options
   */
  async getBucketAcl({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.getBucketACL(Object.assign(name, options));
    return result;
  }

  /**
   * put bucket log
   * @param {request} name prefix options
   */
  async putBucketLog({ request }) {
    const name = request.input("name");
    const prefix = request.input("prefix", "logs/");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.putBucketLogging(name, prefix, options);
    return result;
  }

  /**
   * get bucket log
   * @param {request} name options
   */
  async getBucketLog({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.getBucketLogging(name, options);
    return result;
  }

  /**
   * delete bucket log
   * @param {request} name options
   */
  async deleteBucketLog({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.deleteBucketLogging(name, options);
    return result;
  }

  /**
   * put bucket website
   * @param {request} name config options
   */
  async putBucketWebsite({ request }) {
    const name = request.input("name");
    const config = request.input("config"); //{index: 'index.html', error: 'error.html'}
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.putBucketWebsite(name, config, options);
    return result;
  }

  /**
   * upload file to ali oss bucket
   * @param {request} file type(file, buffer, stream)
   */
  async put({ request }) {
    let filepath = request.file("file");
    const type = request.input("type", "stream");
    var uploadObj = {};
    if (type === "buffer") {
      uploadObj = new Buffer(filepath);
    }
    if (type === "stream") {
      uploadObj = fs.createReadStream(filepath);
    }
    const store = AliOss(ossConfig);
    const result = await store.put(`uploads/${filepath.clientName}`, uploadObj);
    return result;
  }

  /**
   * upload file to ali oss bucket by stream
   * @param {request} file
   */
  async putStream({ request }) {
    const filepath = request.file("file");
    const store = AliOss(ossConfig);
    const result = await store.putStream(
      `uploads/${filepath.clientName}`,
      fs.createReadStream(filepath)
    );
    return result;
  }

  /**
   * append file to ali oss bucket by buffer
   * @param {request} name file options
   */
  async append({ request }) {
    const name = request.input("name");
    const filepath = request.file("file");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.append(name, new Buffer(filepath), options);
    return result;
  }

  /**
   * get object url to ali oss
   * @param {request} name baseUrl
   */
  async getObjectUrl({ request }) {
    const name = request.input("name", "uploads/style.css");
    const baseUrl = request.input("baseUrl");
    const client = new AliOss(ossConfig);
    const result = await client.getObjectUrl(name, baseUrl);
    return result;
  }

  /**
   * generate object url to ali oss
   * @param {request} name baseUrl
   */
  async generateObjectUrl({ request }) {
    const name = request.input("name");
    const baseUrl = request.input("baseUrl");
    const client = new AliOss(ossConfig);
    const result = await client.generateObjectUrl(name, baseUrl);
    return result;
  }

  /**
   * Get an exists object and store it to the local file
   * @param {request} filepath
   */
  async get({ request }) {
    const name = request.input("name");
    const filepath = request.input("filepath"); //local store file path
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.get(`uploads/${name}`, filepath, options);
    return result;
  }

  /**
   * Get an exists object stream and store to the local file
   * @param {request} name options filepath
   */
  async getStream({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const filepath = request.input("filepath"); //local store file path
    const store = AliOss(ossConfig);
    const fileStream = await store.getStream(`uploads/${name}`, options);
    const result = fileStream.stream.pipe(fs.createWriteStream(filepath));
    return result;
  }

  /**
   * Delete an exists object
   * @param {request} name options
   */
  async delete({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.delete(`uploads/${name}`, options);
    return result;
  }

  /**
   * Copy same bucket object
   * @param {request} name sourceName options
   */
  async copy({ request }) {
    const name = request.input("name");
    const sourceName = request.input("sourceName");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.copy(`uploads/${name}`, sourceName, options);
    return result;
  }

  /**
   * Update exists object meta
   * @param {request} name meta options
   */
  async putMeta({ request }) {
    const name = request.input("name");
    const meta = request.input("meta");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.putMeta(name, meta, options);
    return result;
  }

  /**
   * Delete multi objects in quiet mode --Or-- Delete multi objects in verbose mode
   * @param {request} names options {quiet: true} or {quiet: false}
   */
  async deleteMulti({ request }) {
    const names = request.input("names");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.deleteMulti(names, options);
    return result;
  }

  /**
   * List top 10 objects
   * @param {request} query options
   * [query] {Object} query parameters, default is null
   *    [prefix] {String} search object using prefix key
   *    [marker] {String} search start from marker, including marker key
   *    [delimiter] {String} delimiter search scope e.g. / only search current dir, not including subdir
   *    [max-keys] {String|Number} max objects, default is 100, limit to 1000
   */
  async list({ request }) {
    const query = request.input("query", {});
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.list(query, options);
    return result;
  }

  async signatureUrl({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const result = await store.signatureUrl(name, options);
    return result;
  }

  async putACL({ request }) {
    const name = request.input("name");
    const acl = request.input("acl");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.putACL(name, acl, options);
    return result;
  }

  async getACL({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.getACL(name, options);
    return result;
  }

  async restore({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.restore(name, options);
    return result;
  }

  async initMultipartUpload({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.initMultipartUpload(name, options);
    return result;
  }

  async uploadPart({ request }) {
    const name = request.input("name");
    const uploadId = request.input("uploadId");
    const partNo = request.input("partNo");
    const file = request.file("file");
    const start = request.input("start");
    const end = request.input("end");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.uploadPart(
      name,
      uploadId,
      partNo,
      file,
      start,
      end,
      options
    );
    return result;
  }

  async uploadPartCopy({ request }) {
    const name = request.input("name");
    const uploadId = request.input("uploadId");
    const partNo = request.input("partNo");
    const range = request.input("range");
    const sourceData = request.input("sourceData");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.uploadPartCopy(
      name,
      uploadId,
      partNo,
      range,
      sourceData,
      options
    );
    return result;
  }

  async completeMultipartUpload({ request }) {
    const name = request.input("name");
    const uploadId = request.input("uploadId");
    const parts = request.input("parts");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.completeMultipartUpload(
      name,
      uploadId,
      parts,
      options
    );
    return result;
  }

  async multipartUpload({ request }) {
    const name = request.input("name");
    const file = request.file("file");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.multipartUpload(name, file, options);
    return result;
  }

  async multipartUploadCopy({ request }) {
    const name = request.input("name");
    const sourceData = request.file("sourceData");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.multipartUploadCopy(name, sourceData, options);
    return result;
  }

  async listParts({ request }) {
    const name = request.input("name");
    const uploadId = request.input("uploadId");
    const query = request.input("query");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.listParts(name, uploadId, query, options);
    return result;
  }

  async listUploads({ request }) {
    const query = request.input("query");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.listUploads(query, options);
    return result;
  }

  async abortMultipartUpload({ request }) {
    const name = request.input("name");
    const uploadId = request.input("uploadId");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.abortMultipartUpload(name, uploadId, options);
    return result;
  }

  async putChannel({ request }) {
    const cid = request.input("cid");
    const conf = request.input("conf");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.putChannel(cid, conf, options);
    return result;
  }

  async getChannel({ request }) {
    const cid = request.input("cid");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.getChannel(cid, options);
    return result;
  }

  async deleteChannel({ request }) {
    const cid = request.input("cid");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.deleteChannel(cid, options);
    return result;
  }

  async putChannelStatus({ request }) {
    const cid = request.input("cid");
    const status = request.input("status");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.putChannelStatus(cid, status, options);
    return result;
  }

  async getChannelStatus({ request }) {
    const cid = request.input("cid");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.getChannelStatus(cid, options);
    return result;
  }

  async listChannels({ request }) {
    const query = request.input("query");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.listChannels(query, options);
    return result;
  }

  async getChannelHistory({ request }) {
    const cid = request.input("cid");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.getChannelHistory(cid, options);
    return result;
  }

  async createVod({ request }) {
    const cid = request.input("cid");
    const name = request.input("name");
    const time = request.input("time");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.createVod(cid, name, time, options);
    return result;
  }

  async getRtmpUrl({ request }) {
    const cid = request.input("cid");
    const options = request.input("options", {});
    const store = AliOss(ossConfig);
    const result = await store.getRtmpUrl(cid, options);
    return result;
  }

  async getImg({ request }) {
    const name = request.input("name");
    const filepath = request.file("file");
    const options = request.input("options", {});
    const imgClient = AliOss.ImageClient(ossConfig);
    const result = await imgClient.get(name, filepath, options);
    return result;
  }

  async getStreamImg({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const imgClient = AliOss.ImageClient(ossConfig);
    const result = await imgClient.getStream(name, options);
    return result;
  }

  async getExifImg({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const imgClient = AliOss.ImageClient(ossConfig);
    const result = await imgClient.getExif(name, options);
    return result;
  }

  async getInfoImg({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const imgClient = AliOss.ImageClient(ossConfig);
    const result = await imgClient.getInfo(name, options);
    return result;
  }

  async putStyleImg({ request }) {
    const name = request.input("name");
    const style = request.input("style");
    const options = request.input("options", {});
    const imgClient = AliOss.ImageClient(ossConfig);
    const result = await imgClient.putStyle(name, style, options);
    return result;
  }

  async getStyleImg({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const imgClient = AliOss.ImageClient(ossConfig);
    const result = await imgClient.getStyle(name, options);
    return result;
  }

  async getListStyleImg({ request }) {
    const options = request.input("options", {});
    const imgClient = AliOss.ImageClient(ossConfig);
    const result = await imgClient.listStyle(options);
    return result;
  }

  async deleteStyleImg({ request }) {
    const name = request.input("name");
    const options = request.input("options", {});
    const imgClient = AliOss.ImageClient(ossConfig);
    const result = await imgClient.deleteStyle(name, options);
    return result;
  }

  async signatureUrlImg({ request }) {
    const name = request.input("name");
    const imgClient = AliOss.ImageClient(ossConfig);
    const result = await imgClient.signatureUrl(name);
    return result;
  }

  async cluster({ request }) {
    //Cluster Mode
    //Cluster mode now only support object operations.

    const Cluster = AliOss.ClusterClient;

    const client = Cluster(ossClusterConfig);

    // listen error event to logging error
    client.on("error", function(err) {
      console.error(err.stack);
    });

    // client init ready
    client.ready(function() {
      console.log("cluster client init ready, go ahead!");
    });
    // Get Methods
    // Will choose an alive client by schedule(masterSlave or roundRobin).

    // client.get()
    // client.head()
    // client.getStream()
    // client.list()
    // client.signatureUrl()
    // client.chooseAvailable() - choose an available client by schedule.
    // client.getACL()
    // Put Methods
    // Will put to all clients.

    // client.put()
    // client.putStream()
    // client.delete()
    // client.deleteMulti()
    // client.copy()
    // client.putMeta()
    // client.putACL()
    // client.restore()
  }
}

module.exports = OssController;
