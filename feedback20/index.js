// const AWS = require(`aws-sdk`);
// AWS.config.update({region: `eu-central-1`});
const mysql = require('mysql');
const config = require('./config');
const axios = require('axios');
const moment = require('moment-timezone')

if (typeof client === 'undefined') {
    var client = mysql.createConnection(config.mysql);
    client.connect()
}


exports.handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{

        const data = JSON.parse(event.body);
         //------------HEADERS CHECK ------------------

        if (!data || !data["phone"] || (!data["text"] && !data["type"]) )
            return callback(null, {status: "ERROR", error: "MISSING_INPUT_PARAMETERS", data: null});

        await createFeedback(data["phone"], data["text"] || '', data["type"] || 'CUSTOM');
        callback(null, {status: "OK", error: null, data: {}});
        await sendTelegramNotification('FEEDBACK: Телефон:'+data["phone"]+' Текст обращения: '+data["text"]);
        return

    }catch(e){
        console.log(e);
        await sendTelegramNotification('UNCAUGHT Keyboard add feedback Lambda script EXCEPTION !');
        return callback(null, {status: "ERROR", error: "Server error", data: {}});
    }
};

const sendTelegramNotification =  async (text) => {
    await axios.post('https://watchdog.4ek.cc/alert', {
      text
    });
}

var createFeedback = async (phone, text, type) => {

    let time = moment().tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss');
    return new Promise((res, rej) => {

        client.query(`INSERT keyboard_feedback(phone, text, type, created_at) VALUES (?, ?, ?, ?);`,
        [
            phone,
            text,
            type,
            time
        ],
        function (merror, mresult) {
            if (merror)
                rej(merror);

            res(mresult && mresult.length ? mresult[0] : null)
        })
    });
}


