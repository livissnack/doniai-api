'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OssObjectsSchema extends Schema {
  up() {
    this.create('oss_objects', table => {
      table.increments()
      table
        .string('path')
        .notNullable()
        .comment('对象路径')
      table
        .integer('bucket_id')
        .notNullable()
        .comment('存取桶id')
      table
        .string('bucket_name')
        .notNullable()
        .comment('存取桶名称')
      table
        .string('original_name')
        .notNullable()
        .comment('原对象名称')
      table
        .string('mime_type')
        .notNullable()
        .comment('原对象mime类型')
      table
        .string('extension')
        .notNullable()
        .comment('对象扩展名')
      table
        .string('acl_str')
        .notNullable()
        .comment('对象权限标识')
      table
        .integer('width')
        .notNullable()
        .comment('宽')
      table
        .integer('height')
        .notNullable()
        .comment('高')
      table
        .integer('size')
        .notNullable()
        .comment('对象大小')
      table
        .string('ip')
        .notNullable()
        .comment('操作IP')
      table
        .string('md5')
        .notNullable()
        .comment('md5值')
      table.timestamps()
    })
  }

  down() {
    this.drop('oss_objects')
  }
}

module.exports = OssObjectsSchema
