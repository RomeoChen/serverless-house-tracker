'use strict';

const CountController = require('../controller/count.js')

module.exports = {

  async getCountList(req, res) {
    const data = await CountController.getCountList();
    res.send(JSON.stringify({
      code: 0,
      data,
    }))
  },

  async getCountListByHouseName(req, res) {
    const { name } = req.params;
    const data = await CountController.getCountListByHouseName(name);
    res.send(JSON.stringify({
      code: 0,
      data,
    }))
  },

  async getCountListByHouseId(req, res) {
    const { id } = req.params;
    const data = await CountController.getCountListByHouseId(id);
    res.send(JSON.stringify({
      code: 0,
      data,
    }))
  },

  async getCountListByDate(req, res) {
    const { date } = req.params;
    const data = await CountController.getCountListByDate(date);
    res.send(JSON.stringify({
      code: 0,
      data,
    }))
  },

  async createCount(req, res) {
    let result = '';
    try {
      const count = req.body;
      const data = await CountController.createCount(count);
      result = {
        code: 0,
        data,
        message: 'Insert Count Success'
      }
    } catch (error) {
      result = {
        code: error.code,
        message: `Insert Count Fail: ${error.message}`,
      }
    }
    res.send(JSON.stringify(result));
  },

  async deleteCountById (req, res) {
    let result = '';
    try {
      const { id } = req.params;
      const data = await CountController.deleteCountByHouseId(id);
      result = {
        code: 0,
        data,
        message: 'Delete Success'
      }
    } catch (error) {
      result = {
        code: error.code,
        message: `Delete Fail: ${error.message}`
      }
    }
    res.send(JSON.stringify(result))
  }
}