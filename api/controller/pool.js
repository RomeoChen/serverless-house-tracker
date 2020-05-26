'use strict';

const { Pool } = require('pg');

// init mysql connection
function initPgPool() {
  const pool = new Pool({
    connectionString: process.env.PG_CONNECT_STRING,
  });
  // init table
  try {
    pool.query(`
      CREATE TABLE IF NOT EXISTS houses (
        ID     serial     primary key  NOT NULL,
        NAME   CHAR(20)   NOT NULL,
        URL    CHAR(50)   NOT NULL
      );
      CREATE TABLE IF NOT EXISTS counts (
        ID        serial  primary key  NOT NULL,
        house_id  int     REFERENCES houses(id),
        c_date    date    NOT NULL,
        c_num     int     NOT NULL
      );
    `);
  } catch (error) {
    console.log(error)
  }

  return pool;
}

const pool = initPgPool();

module.exports = pool;