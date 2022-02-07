const router          = require('express').Router();
var api = require('../../models/api.js');
const { Op } = require("sequelize");

router.post('/show_list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {};
    if(req.body.range){
        let range = req.body.range;
        query.offset = range.offset;
        query.limit = range.limit;
    }
    

    if(!query.where){
        query.where = {
            payment_type: req.body.payment_type,
            payment_id: req.body.payment_id
        };
    }



    query.order = [['id', 'DESC']];
    
    let list = await api.KeyboardPaymentShow.findAll(query);

    return res.json({status:"OK", error: null, data: list});
});


router.post('/sender', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {};
 
    

    if(!query.where){
        query.where = {
            payment_type: req.body.payment_type,
            payment_id: req.body.payment_id
        };
    }

    
    let sender = await api.KeyboardSender.findOne(query);

    return res.json({status:"OK", error: null, data: sender || null});
});

module.exports = router;