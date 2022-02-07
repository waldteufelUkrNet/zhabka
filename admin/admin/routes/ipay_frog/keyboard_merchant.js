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
                {inn: { [Op.like]: '%' + req.body.search + '%' }},
                {edrpou: { [Op.like]: '%' + req.body.search + '%' }},
                {shortName: { [Op.like]: '%' + req.body.search + '%' }},
                {fullName: { [Op.like]: '%' + req.body.search + '%' }},
                {legalAddress: { [Op.like]: '%' + req.body.search + '%' }}
            ]
        };
    if(!query.where){
        query.where = {};
    }

    query.order = [['id', 'DESC']];
    
    let list = await api.Merchant.findAll(query);

    return res.json({status:"OK", error: null, data: list});
});

router.post('/count', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {};

    if(req.body.search && req.body.search !== '')
        query.where = {
            [Op.or]:[
                {inn: { [Op.like]: '%' + req.body.search + '%' }},
                {edrpou: { [Op.like]: '%' + req.body.search + '%' }},
                {shortName: { [Op.like]: '%' + req.body.search + '%' }},
                {fullName: { [Op.like]: '%' + req.body.search + '%' }},
                {legalAddress: { [Op.like]: '%' + req.body.search + '%' }}
            ]
        };
    query.order = [['id', 'DESC']];
    let count = await api.Merchant.count(query);

    return res.json({status:"OK", error: null, data: count});
});

router.get('/info/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        let item = await api.Merchant.findOne({
            where:{id: req.params.id}
        });
   
    return res.json({status:"OK", error: null, data: item});
});

router.post('/', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let data = req.body;

    let new_one = await api.Merchant.create(data)
   
    return res.json({status:"OK", error: null, data: new_one});
});

module.exports = router;