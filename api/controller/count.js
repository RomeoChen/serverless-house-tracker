'use strict';

const pool = require('./pool');

module.exports = {

  async getCountList() {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'SELECT * FROM counts',
    })
    await client.end();
    return rows;
  },

  async getCountListByHouseName(houseName) {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'SELECT * FROM counts WHERE house_id=(select id from house where name=$1);',
      values: [houseName]
    })
    await client.end();
    return rows;
  },

  async getCountListByHouseId(houseId) {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'SELECT * FROM counts WHERE house_id=$1;',
      values: [houseId]
    })
    await client.end();
    return rows;
  },

  async getCountListByDate(date) {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'SELECT * FROM counts WHERE c_date=$1;',
      values: [date]
    })
    await client.end();
    return rows;
  },

  async createCount(count) {
    const { houseId, num, date } = count;
    const client = await pool.connect();
    const text = `insert into counts (house_id, c_date, c_num) values ($1, ${date ? '$2' : 'current_date'}, $3)`
    const { rowCount } = await client.query({
      text: text,
      values: [houseId, date, num],
    })
    await client.end();
    return rowCount === 1;
  },

  async deleteCountByHouseId(houseId) {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'DELETE FROM COUNTS WHERE house_id = $1',
      values: [houseId],
    })
    await client.end();
    return rows;
  }
};
