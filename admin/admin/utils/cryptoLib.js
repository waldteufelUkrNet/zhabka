const crypto = require('crypto');

var exports = module.exports = {};

exports.signHmacSha512 = (key, str) => {
  let hmac = crypto.createHmac("sha512", key);
  let signed = hmac.update(Buffer.from(str, 'utf-8')).digest("hex");
  return signed;
}
