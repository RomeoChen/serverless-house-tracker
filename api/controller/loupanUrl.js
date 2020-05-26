'use strict';

const pool = require('./pool');
const { ApiError } = require('../tool')

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
      throw ApiError(1000, error)
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
    } catch (e) {
      throw ApiError(1001, e);
    }
  },

  /** 新建楼盘信息 */
  async createHouse(house) {
    const { name, url } = house;
    const existUser = await this.getHouseByName(name);
    if (existUser) {
      throw ApiError(1002, `house ${name} exist.`);
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
      throw ApiError(1003, error)
    }
  },

  /** 删除某楼盘 */
  async deleteHouseById(id) {
    try {
      const client = await pool.connect();
      const { rows } = await client.query({
        text: 'DELETE FROM houses WHERE id = $1',
        values: [id],
      });
      await client.end();
      return rows;
    } catch (error) {
      throw ApiError(1004, error)
    }
  },
};
