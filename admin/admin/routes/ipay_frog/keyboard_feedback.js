const router          = require('express').Router();
var brandsLib = require('../../libs/brands');
var api = require('../../models/api.js');
const { Op } = require("sequelize");
const moment = require('moment-timezone')
const axios = require('axios')
const https = require('https')
const agent = new https.Agent({
    rejectUnauthorized: false
});
let config = {
    env: 'prod',
    sms_gate:{
        prod:{
            host: 'https://api.turbosms.ua/message/send.json?token=3536285d312101836433eac3dc7706c995d5e53a',
            token: "3536285d312101836433eac3dc7706c995d5e53a",
            name: "4EK"
        },
        dev:{
            host: 'https://api.turbosms.ua/message/send.json?token=3536285d312101836433eac3dc7706c995d5e53a',
            token: "3536285d312101836433eac3dc7706c995d5e53a",
            name: "4EK"
        }
    }
}

router.post('/list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        let result = await api.KeyboardFeedback.findAll({where: {
            removed: false
        },
        order: [['id', 'DESC']]
    });

    return res.json({status:"OK", error: null, data: result});
});
router.post('/email_list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        let result = await api.KeyboardFeedbackEmail.findAll({where: {},
        order: [['id', 'DESC']]
    });

    return res.json({status:"OK", error: null, data: result});
});

router.post('/email/remove', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    await api.KeyboardFeedbackEmail.destroy({where:{id:req.body.id}});

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/email/add', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    await api.KeyboardFeedbackEmail.create({email: req.body.email});

    return res.json({status:"OK", error: null, data: {}});
});
router.post('/block', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    await api.KeyboardFeedback.update({ removed: true}, {where:{id:req.body.feedback_id}});

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/block', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    await api.KeyboardFeedback.update({ removed: true}, {where:{id:req.body.feedback_id}});

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/send_sms', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {feedback_id, text} = req.body;


    let time = moment().tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss');

    let feedback = await api.KeyboardFeedback.findOne({where:
        {
        id: feedback_id
        }
    })


    if(feedback){
        let response = feedback.response || '';
        await feedback.update({ response: response + `>>> SMS (${time}) : ${text}\
    `});
        
        console.log(feedback.phone)
        let sms_send = await axios.post(config.sms_gate[config.env].host, {
            sms:{
                sender: config.sms_gate[config.env].name,
                text: text
            },
            recipients: [feedback.phone],
            token: config.sms_gate[config.env].token
        }, { 
            httpsAgent: agent,
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Basic ' + config.sms_gate[config.env].token
            }
          });
        console.log(sms_send)
    }

    return res.json({status:"OK", error: null, data: {}});
});


module.exports = router;