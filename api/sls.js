'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const URLListCB = require('./callbacks/urlList');
const CountCB = require('./callbacks/count');
const { spiderValue } = require('./tool');
const { getHouseList } = require('./controller/loupanUrl');
const { createCount } = require('./controller/count');


async function spiderUrlList() {
  try {
    const countList = [];
    const houseList = await getHouseList();
    for (const house of houseList) {
      const { id, url } = house;
      const number = await spiderValue(url);
      const count = {
        houseId: id,
        num: number,
        date: new Date().toDateString(),
      }
      await createCount(count);
      countList.push(count);
    }
    return countList;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(
    JSON.stringify({
      code: 0,
      message: `Server time: ${new Date().toString()}`,
    }),
  );
});

app.get('/spider', async (req, res) => {
  const data = await spiderUrlList();
  res.send(JSON.stringify({
    code: 0,
    message: `spider time: ${new Date().toString()}`,
    data,
  }))
});

/** 获取楼盘列表信息 */
app.get('/house', URLListCB.getHouseList);

/** 获取某个楼盘 */
app.get('/house/:name', URLListCB.getHouseByName);

/** 新增楼盘 */
app.post('/house', URLListCB.createHouse);

/** 修改楼盘信息 */
app.put('/house', URLListCB.updateHouse);

/** 根据id删除楼盘 */
app.delete('/house/:id', URLListCB.deleteHouseById);


/** 获取所有数量信息 */
app.get('/count', CountCB.getCountList);

/** 通过名字获取某个楼盘在售数量列表信息 */
app.get('/count/name=:houseName', CountCB.getCountListByHouseName);

/** 通过id获取某个楼盘在售数量列表信息 */
app.get('/count/id=:houseId', CountCB.getCountListByHouseId);

/** 通过日期获取在售数量 */
app.get('/count/date=:date', CountCB.getCountListByDate);

/** 插入或更新数量 */
app.post('/count', CountCB.createCount);

/** 删除数量 */
app.delete('/count/:houseId', CountCB.deleteCountByHouseId);



module.exports = app;
