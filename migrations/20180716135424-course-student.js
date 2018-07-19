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
  db.createTable('course_student', {
    cs_id: {
      type: 'int',
      primaryKey: true,
    },
    course_id: {
      type: 'int',
      foreignKey: {
        name: 'cs_course_id',
        table: 'course',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'course_id'
      }
    },
    student_id: {
      type: 'int',
      foreignKey: {
        name: 'cs_student_id',
        table: 'student',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'student_id'
      }
    }
  }, cb);
};

exports.down = function (db, cb) {
  db.dropTable('course_student', cb);
};

exports._meta = {
  "version": 1
};