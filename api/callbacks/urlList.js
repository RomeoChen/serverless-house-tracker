'use strict';

const HouseController = require('../controller/loupanUrl');

module.exports = {
  async getHouseList(req, res) {
    const data = await HouseController.getHouseList();
    res.send(JSON.stringify({
      code: 0,
      data,
    }))
  },

  async getHouseByName (req, res) {
    let result;
    try {
      const { name } = req.params;
      const data = await HouseController.getHouseByName(name);
      result = {
        code: 0,
        data: data[0]
      }
    } catch (e) {
      result = e;
    }
    res.send(JSON.stringify(result));
  },

  async createHouse (req, res) {
    let result = '';
    try {
      const house = req.body;
      const data = await HouseController.createHouse(house);
      result = {
        code: 0,
        data,
        message: 'Insert Success',
      };
    } catch (e) {
      result = {
        code: e.code,
        message: `Insert Fail: ${e.message}`,
      }
    }
    res.send(JSON.stringify(result))
  },

  async updateHouse (req, res) {
    let result = '';
    try {
      const house = req.body;
      const data = await HouseController.updateHouse(house)
      result = {
        code: 0,
        data,
        message: 'Update Success'
      }
    } catch (error) {
      result = {
        code: error.code,
        message: `Update Fail: ${error.message}`
      }
    }
    res.send(JSON.stringify(result))
  },

  async deleteHouseById (req, res) {
    let result = '';
    try {
      const { id } = req.params;
      const data = await HouseController.deleteHouseById(id);
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