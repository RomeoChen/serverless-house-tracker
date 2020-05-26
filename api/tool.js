'use strict';

module.exports = {
  ApiError(code, msg) {
    const e = new Error(msg);
    e.code = code;
    return e;
  },
}