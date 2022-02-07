const router          = require('express').Router();
const crypto = require('crypto');
let lib = require('../../libs/general');
let mailLib = require('../../libs/email');
var api = require('../../models/api.js');

router.post('/signin', async function (req, res, next) {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});
    }

    let {email, password} = req.body;

    let passMD5 = crypto.createHash('md5').update(password).digest("hex");

    let admin = await api.IpayFrogAdmin.findOne({where:{ email, password: passMD5, role: 'IPAY'}});

    if(!admin)
        return res.json({ status:"ERROR", error: 'USER_NOT_FOUND'});
    
    //let admin = adminData.data;
    let token = lib.generateJwt(admin);
    return res.json({
        status:"OK", error: null, data: {
            name: admin.name,
            email: admin.email,
            token
        }
    });
});

router.post('/signup', async function (req, res, next) {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});
    }

    let {email, password} = req.body;
    let passMD5 = crypto.createHash('md5').update(password).digest("hex");

     let admin = await api.IpayFrogAdmin.findOne({where:{ email, password: passMD5}});


    if(admin)
        return res.json({ status:"ERROR", error: 'USER_EXIST'});
        
    admin = await api.Admin.create({email, password: passMD5});
   
    let token = lib.generateJwt(admin);

    return res.json({
        status:"OK", error: null, data: {
            name: admin.name,
            email: admin.email,
            token
        }
    });
});

router.post('/forgot', async function (req, res, next) {
    if (!req.body || !req.body.email) {
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});
    }

    let {email} = req.body;

    let admin = await api.IpayFrogAdmin.findOne({where:{ email }});

    if(!admin)
        return res.json({ status:"ERROR", error: 'USER_NOT_FOUND'});

    let newPassword = lib.randomKey();
    await admin.update({password:crypto.createHash('md5').update(newPassword).digest("hex") });

   
    mailLib.sendNewPasswordEmail(email, newPassword)
        .then(sendData => {
            return res.json({ status:"OK", error: null, data: {}});
        })
        .catch(sendError => {
            return res.json({ status:"OK", error: sendError});
        })


});

module.exports = router;