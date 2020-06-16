'use strict';

const cheerio = require('cheerio');
const axios = require('axios');

axios.defaults.timeout = 5000;

/** 爬虫 */
async function spiderValue (url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  return $('span', '.total').text();
}

module.exports = {
  ApiError(code, msg) {
    const e = new Error(msg);
    e.code = code;
    return e;
  },

  /** 判断链接是否有效 */
  async checkValidUrl(url) {
    try {
      const count = await spiderValue(url);
      if (count || count === 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  spiderValue,
}