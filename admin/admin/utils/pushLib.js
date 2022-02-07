let FCM = require('fcm-node');
var serverKey = 'AAAAdj8XSJg:APA91bG-xd4nIQYk8PSzPmExO_fn8kfE118nBZIWCBL8XzQ167SK5RKVWqdh0PG7Mq1nevACZI1sm_5upGnrqTF3fp1YpeydskDdfWZ26uDZw7Oe5RWlmyo1ozsb3jd0MF-ggfW0UNvL';
var fcm = new FCM(serverKey);

async function sendPush(user_id, alert, payload) {
    var api = require('../../../models/api.js');
    
    let device = await api.KeyboardUser.findOne({where: {id: user_id}});
  
    let push_text = "📋Рахунок бізнес, ₴"+payload.summ, 
        body_text = "";
    if(alert === 'PAYMENT_FAILED'){
        body_text = "😞 Одержувач не зміг сплатити рахунок";
    } else if(alert === 'PAYMENT_SEEN'){
        body_text = "👀 Рахунок був переглянутий одержувачем";
    } else if(alert === 'PAYMENT_SUCCESS'){
        body_text = "✅ Одержувач сплатив рахунок, очікуйте зарахування. Платник: Невідомий";
        if(payload && payload.name && payload.phone)
            body_text = "✅ Одержувач сплатив рахунок, очікуйте зарахування. Платник: "+payload.name+", "+payload.phone;
    } else if(alert === 'P2P_PAYMENT_FAILED'){
        push_text = "💳 Переказ на картку, ₴"+payload.summ
        body_text = "😞 Одержувач не зміг сплатити переказ";
    } else if(alert === 'P2P_PAYMENT_SEEN'){
        push_text = "💳 Переказ на картку, ₴"+payload.summ
        body_text = "👀 Переказ був переглянутий одержувачем";
    } else if(alert === 'P2P_PAYMENT_SUCCESS'){
        push_text = "💳 Переказ на картку, ₴"+payload.summ
        body_text = "✅ Сплачено, очікуйте зарахування. Платник: Невідомий";
        if(payload && payload.name && payload.phone)
            body_text = "✅ Сплачено, очікуйте зарахування. Платник: "+payload.name+", "+payload.phone;
    }

    if(device && device.push_token) {
        if (device.os && device.os.length && device.push_token && device.push_token.length) {
            if (device.os === "ANDROID") {
                sendPushAndroid(fcm, device.push_token, push_text, body_text, function (err, status) {
                });
            } else if (device.os === "IOS" && alert !== "FREE_TEXT") {
                sendPushIos(fcm, device.push_token, push_text, body_text,  function (err, status) {
                });
            } 
        }
    }
    else {
        console.log(" NO SUCH DEVICE")
    }
}



function sendPushAndroid(fcm, token, push_text, body_text, callback) {

    payload.alert = alert;

    var message = {
        to: token,
        //content_available: true,
        notification: {
            title: push_text,
            body: body_text
        },
        data: {}
    };


    fcm.send(message, function (err, response) {
        if (err) {
            console.log("PUSH LOG(A): Something has gone wrong!", err);
            callback(null, "error");
        } else {
            console.log("PUSH LOG (A): Successfully sent ");
            callback(null, "ok");
        }
    });
    callback(null, "ok");
}



function sendPushIos(fcm, token, push_text, body_text, callback) {


    var message = {
        to: token,
        content_available: true,
        notification: {
            title: push_text,
            body: body_text
        },
        data: {}
    };

    delete message.data.aps;

    fcm.send(message, function (err, response) {
        console.log(response)
        if (err) {
            console.log("PUSH LOG(IOS): Something has gone wrong (IOS)!", err);
            callback(null, "error");
        } else {
            console.log("PUSH LOG(IOS): Successfully sent");
            callback(null, "ok");
        }
    });

    callback(null, "ok");
}

function sendFreeTextPushIos(fcm, token, alert, payload, loc_args, badge = 0, callback) {


    var message = {
        to: token,
        content_available: true,
        //mutable_content: true,
        notification: {
            title: payload.title,
            body: payload.body
        },
        data: {

            payload
        }
    };

    delete message.data.aps;

    fcm.send(message, function (err, response) {
        console.log(response)
        if (err) {
            console.log("PUSH LOG(IOS): Something has gone wrong (IOS)!", err);
            callback(null, "error");
        } else {
            console.log("PUSH LOG(IOS): Successfully sent");
            callback(null, "ok");
        }
    });

    callback(null, "ok");
}

var exports = module.exports = {};
exports.sendPush = sendPush;
