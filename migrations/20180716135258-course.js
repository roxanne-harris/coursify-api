'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, cb) {
  db.createTable('course', {
    course_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    university_id: {
      type: 'int',
      foreignKey: {
        name: 'course_university_id',
        table: 'university',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'university_id'
      }
    },
    subject: {
      type: 'string',
      length: 45
    },
    number: {
      type: 'int'
    },
    title: {
      type: 'string',
      length: 45
    },
    description: {
      type: 'string',
      length: 45
    }
  }, cb);
};

exports.down = function (db, cb) {
  db.dropTable('course', cb);
};

exports._meta = {
  "version": 1
};
