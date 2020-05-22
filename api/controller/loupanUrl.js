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
  pool.query(`CREATE TABLE IF NOT EXISTS houses (
    ID     serial     NOT NULL,
    NAME   CHAR(20)   NOT NULL,
    URL    CHAR(50)   NOT NULL
  );`);

  return pool;
}

const pool = initPgPool();

module.exports = {

  /** 查询列表 */
  async getHouseList() {
    try {
      const client = await pool.connect();
      const { rows } = await client.query({
        text: 'select * from houses',
      });
      await client.end();
      return rows;
    } catch (error) {
      throw new ApiError(1000, error)
    }
  },

  /** 通过名称获取楼盘信息 */
  async getHouseByName(name) {
    try {
      const client = await pool.connect();
      const { rows } = await client.query({
        text: 'SELECT * FROM houses WHERE name = $1',
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

  /** 新建楼盘信息 */
  async createHouse(house) {
    const { name, url } = house;
    const existUser = await this.getHouseByName(name);
    if (existUser) {
      throw new ApiError(1002, `house ${name} exist.`);
    }
    const client = await pool.connect();
    const { rowCount } = await client.query({
      text: 'INSERT INTO houses(name, url) VALUES($1, $2)',
      values: [name, url],
    });
    await client.end();
    return rowCount === 1;
  },

  /** 更新楼盘信息 */
  async updateHouse(house) {
    const { name, url } = house
    try {
      const client = await pool.connect()
      const { rows } = await client.query({
        text: '',
        values: [name, url],
      })
      await client.end();
      if (rows.length > 0) {
        return rows
      }
      return false;
    } catch (error) {
      throw new ApiError(1003, error)
    }
  },

  /** 删除某楼盘 */
  async deleteHouseByName(name) {
    try {
      const client = await pool.connect();
      const { rows } = await client.query({
        text: 'DELETE FROM houses WHERE name = $1',
        values: [name],
      });
      await client.end();
      return rows;
    } catch (error) {
      throw new ApiError(1004, error)
    }
  },
};
