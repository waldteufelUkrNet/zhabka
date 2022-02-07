const router          = require('express').Router();
var brandsLib = require('../../libs/brands');
var api = require('../../models/api.js');
const { Op } = require("sequelize");

router.post('/list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {};
    if(req.body.range){
        let range = req.body.range;
        query.offset = range.offset;
        query.limit = range.limit;
    }
    
    if(req.body.search && req.body.search !== '')
        query.where = {
            [Op.or]:[
                {view_merchant_phone: { [Op.like]: '%' + req.body.search + '%' }},
                {view_merchant_id: { [Op.like]: '%' + req.body.search + '%' }},
                {inn_edrpou: { [Op.like]: '%' + req.body.search + '%' }}
            ]
        };
    if(!query.where){
        query.where = {};
    }

    query.include=[
        {
            model:api.KeyboardMerchant,
            as: 'merchant'
        },
        {
            model:api.Mcc,
            as: 'mcc'
        }
    ]


    query.order = [['mcc_id', 'ASC']];
    
    let list = await api.MerchantMcc.findAll(query);

    return res.json({status:"OK", error: null, data: list});
});

router.post('/count', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {};

    if(req.body.search && req.body.search !== '')
    query.where = {
        [Op.or]:[
            {view_merchant_phone: { [Op.like]: '%' + req.body.search + '%' }},
            {view_merchant_id: { [Op.like]: '%' + req.body.search + '%' }},
            {inn_edrpou: { [Op.like]: '%' + req.body.search + '%' }}
        ]
    };
    if(!query.where){
        query.where = {};
    }

    let count = await api.MerchantMcc.count(query);

    return res.json({status:"OK", error: null, data: count});
});


router.post('/', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });
    
    let {merchant_id, mcc_code, inn_edrpou} = req.body;

    let mcc = await api.Mcc.findOne({where:{
        number: mcc_code
    }})
    if(!mcc)
        return res.json({status:"ERROR", error: 'NO_SUCH_MCC', data: null});
    if(mcc.type !== 'trial')
        return res.json({status:"ERROR", error: 'MERCHANT_IS_NOT_TRIAL', data: null});
    let merchant = await api.KeyboardMerchant.findOne({where:{
            unique_id: merchant_id
        },
        include: [
            {
                model: api.KeyboardUser,
                as: 'user'
            }
        ]
    })
    if(!merchant)
        return res.json({status:"ERROR", error: 'NO_SUCH_MERCHANT', data: null});

    let old = await api.MerchantMcc.findOne({where:{
        merchant_id:merchant.id, mcc_id: mcc.id, inn_edrpou
    }})
    if(old)
        return res.json({status:"ERROR", error: 'ALREADY_EXISTS', data: null});
    if(!old)
        await api.MerchantMcc.create({
            merchant_id: merchant.id, mcc_id: mcc.id, inn_edrpou,
            view_merchant_phone: merchant.user.phone,
            view_merchant_id: merchant.unique_id
        })
    
    return res.json({status:"OK", error: null, data: {}});
});


router.delete('/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });
    
        console.log(req.params)
    let {id} = req.params;

    await api.MerchantMcc.destroy({where:{
        id
    }})
   
    return res.json({status:"OK", error: null, data: {}});
});
module.exports = router;