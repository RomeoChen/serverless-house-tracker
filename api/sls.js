'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserController = require('./controller/user');
const HouseController = require('./controller/loupanUrl');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(
    JSON.stringify({
      code: 0,
      message: `Server time: ${new Date().toString()}`,
    }),
  );
});

// get user list
app.get('/user', async (req, res) => {
  const data = await UserController.getUserList();
  res.send(
    JSON.stringify({
      code: 0,
      data,
    }),
  );
});

// add new user
app.post('/user', async (req, res) => {
  let result = '';
  try {
    const user = req.body;
    const data = await UserController.createUser(user);
    result = {
      code: 0,
      data,
      message: 'Insert Success',
    };
  } catch (e) {
    result = {
      code: e.code,
      message: `Insert Fail: ${e.message}`,
    };
  }

  res.send(JSON.stringify(result));
});

// delete user
app.delete('/user/:name', async (req, res) => {
  let result = '';
  try {
    const { name } = req.params;
    const data = await UserController.deleteUserByName(name);
    result = {
      code: 0,
      data,
      message: 'Delete Success',
    };
  } catch (e) {
    result = {
      code: 1002,
      data: e,
      message: 'Delete Fail',
    };
  }

  res.send(JSON.stringify(result));
});

/** 获取楼盘列表信息 */
app.get('/house', async (req, res) => {
  const data = await HouseController.getHouseList();
  res.send(JSON.stringify({
    code: 0,
    data,
  }))
})

/** 获取某个楼盘 */
app.get('/house/:name', async (req, res) => {
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
})

/** 新增楼盘 */
app.post('/house', async (req, res) => {
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
})

/** 修改楼盘信息 */
app.put('/house', async (req, res) => {
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
})

/** 根据id删除楼盘 */
app.delete('/house/:id', async (req, res) => {
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
})

module.exports = app;
