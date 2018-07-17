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
  db.createTable('student', {
    student_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    university_id: {
      type: 'int',
      foreignKey: {
        name: 'student_university_id',
        table: 'university',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'university_id'
      }
    },
    first_name: {
      type: 'string',
      length: 45
    },
    last_name: {
      type: 'string',
      length: 45
    },
    email: {
      type: 'string',
      length: 45,
      unique: true
    },
    password: {
      type: 'string',
      length: 1000
    },
    paid: {
      type: 'boolean'
    }

  }, cb);
};

exports.down = function (db, cb) {
  db.dropTable('student', cb);
};

exports._meta = {
  "version": 1
};
