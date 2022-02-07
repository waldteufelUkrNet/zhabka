const router          = require('express').Router();
var api = require('../../models/api.js');
const { Op } = require("sequelize");

router.post('/list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let list = await api.Mcc.findAll({
        where: {},
        order: [['type', 'DESC']]
    });

    return res.json({status:"OK", error: null, data: { list, total: list.length}});
});

router.post('/count', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });


    let count = await api.Mcc.count({});

    return res.json({status:"OK", error: null, data: count});
});


router.put('/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });
    let {id} = req.params;
    let data = req.body;

    let mcc = await api.Mcc.findOne({where:{
        id
    }})
    if(!mcc)
        return res.json({status:"ERROR", error: 'NO_SUCH_MCC', data: null});
    if(data.type === 'trial' &&
        (
            !data.coefficient || (!data.minimal_summ && data.minimal_summ !== 0)
            || !data.dayly_limit || !data.monthly_limit
            || !data.ipay_merchant_id || !data.ipay_merchant_name
            || !data.ipay_system_key || !data.ipay_merchant_key
        )
    )    
        return res.json({status:"ERROR", error: 'NOT_FILLED_PARAMS', data: null});
    
        delete data['id'];

    await mcc.update(data)
    return res.json({status:"OK", error: null, data: mcc});
});

module.exports = router;