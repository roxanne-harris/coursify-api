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
  db.createTable('course_professor', {
    cp_id: {
      type: 'int',
      primaryKey: true,
    },
    course_id: {
      type: 'int',
      foreignKey: {
        name: 'cp_course_id',
        table: 'course',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'course_id'
      }
    },
    professor_id: {
      type: 'int',
      foreignKey: {
        name: 'cp_professor_id',
        table: 'professor',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'professor_id'
      }
    }
  }, cb);
};

exports.down = function (db, cb) {
  db.dropTable('course_professor', cb);
};

exports._meta = {
  "version": 1
};