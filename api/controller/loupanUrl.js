'use strict';

const { Pool } = require('pg');

function ApiError(code, msg) {
  const e = new Error(msg);
  e.code = code;
  return e;
}

// init mysql connection
function initPgPool() {
  const pool = new Pool({
    connectionString: process.env.PG_CONNECT_STRING,
  });
  // init table
  pool.query(`CREATE TABLE IF NOT EXISTS buildings (
    ID     serial     NOT NULL,
    NAME   CHAR(20)   NOT NULL,
    URL    CHAR(50)   NOT NULL
  );`);

  return pool;
}

const pool = initPgPool();

module.exports = {
  async getBuildingList() {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'select * from buildings',
    });
    await client.end();
    return rows;
  },
  async getBuildingByName(name) {
    try {
      const client = await pool.connect();
      const { rows } = await client.query({
        text: 'SELECT * FROM users WHERE name = $1',
        values: [name],
      });
      await client.end();
      if (rows.length > 0) {
        return rows;
      }
      return false;
    } catch (e) {
      throw new ApiError(1001, e);
    }
  },
  async createBuilding(building) {
    const { name, url } = building;
    const existUser = await this.getBuildingByName(name);
    if (existUser) {
      throw new ApiError(1000, `building ${name} exist.`);
    }
    const client = await pool.connect();
    const { rowCount } = await client.query({
      text: 'INSERT INTO buildings(name, url) VALUES($1, $2)',
      values: [name, url],
    });
    await client.end();
    return rowCount === 1;
  },

  async deleteBuildingByName(name) {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'DELETE FROM buildings WHERE name = $1',
      values: [name],
    });
    await client.end();
    return rows;
  },
};
