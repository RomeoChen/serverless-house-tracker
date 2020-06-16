export function convertDate(dateWithTime) {
  return dateWithTime.split('T')[0].replace('-', '\n');
}

import cheerio from 'cheerio';
import axios from 'axios';

const axiosInstance = axios.create({
  headers: {'Access-Control-Allow-Origin': true},
})

/* eslint-disable */
export function checkValidUrl(url) {
  try {
    axiosInstance.get(url).then(function (response) {
      const $ = cheerio.load(response.data);
      const count = $('span', '.total').text();
      if (count) {
        return true;
      } else {
        return false;
      }
    })
  } catch (error) {
    console.error(error);
    return false;
  }
}
/* eslint-enable */