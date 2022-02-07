
var config = require('../config');
var api = require('../models/api.js');
const merchant_telegram_token = config.telegram[config.env].merchant_api_token;
const axios = require('axios');

const { Op } = require("sequelize");

const sendSmsToMerchantUsers = async (merchant_id, text, users_not_to_send = []) => {
    
  let telegram_merchant_users = await api.TelegramMerchantUser.findAll({
    where:{
      telegram_merchant_id: merchant_id,
      phone: {[Op.notIn]: users_not_to_send}
    }
  })
  for(let i = 0 ; i < telegram_merchant_users.length; i++ )
    await axios.post('https://api.telegram.org/bot' + merchant_telegram_token + '/sendMessage', {
                    chat_id: telegram_merchant_users[i].chat_id,
                    text
                });
  return;
}

const sendSmsToOneMerchantUser = async (user_id, text) => {
    
  let telegram_merchant_user = await api.TelegramMerchantUser.findAll({
    where:{
      id: user_id
    }
  })
 if(telegram_merchant_user)
    await axios.post('https://api.telegram.org/bot' + merchant_telegram_token + '/sendMessage', {
                    chat_id: telegram_merchant_user.chat_id,
                    text
                });
  return;
}

var exports = module.exports = {};
exports.sendSmsToMerchantUsers = sendSmsToMerchantUsers;
exports.sendSmsToOneMerchantUser = sendSmsToOneMerchantUser;