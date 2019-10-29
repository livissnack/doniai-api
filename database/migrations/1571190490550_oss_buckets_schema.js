'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OssBucketsSchema extends Schema {
  up() {
    this.create('oss_buckets', table => {
      table.increments()
      table
        .string('bucket_name')
        .notNullable()
        .comment('存取桶名称')
      table
        .string('acl_str')
        .notNullable()
        .comment('存取桶权限标识')
      table
        .string('base_url')
        .notNullable()
        .comment('基本url')
      table.timestamps()
    })
  }

  down() {
    this.drop('oss_buckets')
  }
}

module.exports = OssBucketsSchema
