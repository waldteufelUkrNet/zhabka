const router          = require('express').Router();
var oLib = require('../../libs/outlet');
const { v4: uuidv4 } = require('uuid');
var api = require('../../models/api.js');
const { Op } = require("sequelize");

router.get('/random_info', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        let item = await api.TradePoint.findAll({
            where:{ 
                [Op.or]:[
                {place_id: null}, 
                {address: null}, 
                {lat: null}, 
                {lon: null}, 
                {_city_id: null}
            ] }, limit:1});
   
    return res.json({status:"OK", error: null, data: item[0] || null});
});



router.get('/autocomplete', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {
        attributes: ['id', 'name', 'address'],
        include: [
            {
                model: api.City,
                as: 'trade_point_city',
                attributes: ['id', 'name']
            }
        ],
        limit: 100
    };

    if(req.query.search && req.query.search !== '')
        query.where = {
            name: { [Op.like]: '%' + req.query.search + '%' }
        };

    let list = await api.TradePoint.findAll(query);

    let resArray = [];
    for(let i=0;i<list.length;i++){
        let showName = list[i].name + ' ';
        if(list[i].trade_point_city){
            if(list[i].address){
                showName += '(' + list[i].trade_point_city.name + ', ' + list[i].address + ')';
            } else {
                showName += '(' + list[i].address + ')';
            }
        } else {
            if(list[i].address){
                showName += '(' + list[i].address + ')';
            }
        }

        resArray.push({
            id: list[i].id,
            name: showName
        })
    }

    return res.json({status:"OK", error: null, data: resArray});
});

router.get('/list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {
        attributes: ['id', 'name', 'address'],
        include: [
            {
                model: api.City,
                as: 'trade_point_city',
                attributes: ['id', 'name']
            }
        ]
    };
    if(req.query.range){
        let range = JSON.parse(req.query.range);
        query.offset = range.offset;
        query.limit = range.limit;
    }

    if(req.query.search && req.query.search !== '')
        query.where = {
            name: { [Op.like]: '%' + req.query.search + '%' }
        };

    let list = await api.TradePoint.findAll(query);

    return res.json({status:"OK", error: null, data: list});
});

router.get('/count', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {};

    if(req.query.search && req.query.search !== '')
        query.where = {
            name: { [Op.like]: '%' + req.query.search + '%' }
        };

    let count = await api.TradePoint.count(query);

    return res.json({status:"OK", error: null, data: count});
});

router.get('/info/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;

    let outlet = await api.TradePoint.findOne({
        where: {id},
        include: [
            {
                model: api.TradePointWorkTime,
                as: 'work_time',
                attributes: ['id', 'day', 'from', 'lunch', 'to']
            },
            {
                model: api.Photo,
                as: 'photos',
                attributes: ['id', 'url']
            },
            {
                model: api.Phone,
                as: 'phones'
            },
            {
                model: api.Merchant,
                as: 'trade_point_merchant',
                attributes: ['id', 'shortName']
            },
            {
                model: api.Place,
                as: 'trade_point_place',
                attributes: ['id', 'name']
            },
            {
                model: api.Brand,
                as: 'trade_point_brand',
                attributes: ['id', 'name']
            },
            {
                model: api.City,
                as: 'trade_point_city',
                attributes: ['id', 'name'],
                include: [
                    {
                        model: api.Region,
                        as: 'region',
                        attributes: ['id', 'name']
                    }
                ]
            },
            {
                model: api.FiscalNumber,
                as: 'fiscal_numbers',
                attributes: ['id', 'number']
            },
            {
                model: api.Bundle,
                as: 'trade_point_bundles',
                attributes: ['id', 'processing_code', 'terminal_id', 'merchant_id', '_trade_point_id']
            }
        ]
    });

    return res.json({status:"OK", error: null, data: outlet});
});

router.post('/phone', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let data = req.body;
    if(!data.phone || !data.title || !data._trade_point_id)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    let phone;
    if(data.id) {
        phone = await api.Phone.findOne({
            where: {id: data.id}
        });

        phone.phone = data.phone;
        phone.title = data.title;
        await phone.save();
    } else {
        phone = await api.Phone.create({
            phone: data.phone,
            title: data.title,
            _trade_point_id: data._trade_point_id,
        })
    }

    return res.json({status:"OK", error: null, data: phone});
});

router.delete('/phone/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;

    let phone = await api.Phone.findOne({
        where: {id}
    });

    if(!phone)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    await phone.destroy();

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/bundle', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let data = req.body;
    if(!data.processing_code || !data.merchant_id || !data.terminal_id || !data._trade_point_id)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    let bundle;
    if(data.id) {
        bundle = await api.Bundle.findOne({
            where: {id: data.id}
        });

        bundle.processing_code = data.processing_code;
        bundle.terminal_id = data.terminal_id;
        bundle.merchant_id = data.merchant_id;
        await bundle.save();
    } else {
        bundle = await api.Bundle.create({
            processing_code: data.processing_code,
            terminal_id: data.terminal_id,
            merchant_id: data.merchant_id,
            _trade_point_id: data._trade_point_id
        })
    }

    return res.json({status:"OK", error: null, data: bundle});
});

router.delete('/bundle/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;

    let bundle = await api.Bundle.findOne({
        where: {id}
    });

    if(!bundle)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    if(!bundle._merchant_id && !bundle._bank_id && !bundle._processing_id){
        await bundle.destroy();
    } else {
        bundle._trade_point_id = null;
        await bundle.save();
    }

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/fiscal', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let data = req.body;
    if(!data.number || !data._trade_point_id)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    let fiscal = await api.FiscalNumber.create({
        number: data.number,
        _trade_point_id: data._trade_point_id
    });

    return res.json({status:"OK", error: null, data: fiscal});
});

router.delete('/fiscal/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;

    let fiscal = await api.FiscalNumber.findOne({
        where: {id}
    });

    if(!fiscal)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    await fiscal.destroy();

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/worktime', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let data = req.body;
    if(!data.day || !data._trade_point_id || (!data.from && !data.lunch && !data.to))
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    let wt = await api.TradePointWorkTime.findOne({
        where: {
            day: data.day,
            _trade_point_id: data._trade_point_id
        }
    });

    if(!wt){
        wt = await api.TradePointWorkTime.create({
            day: data.day,
            from: data.from,
            lunch: data.lunch,
            to: data.to,
            _trade_point_id: data._trade_point_id
        });
    } else {
        wt.from = data.from;
        wt.lunch = data.lunch;
        wt.to = data.to;

        await wt.save();
    }

    return res.json({status:"OK", error: null, data: wt});
});

router.post('/photo', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    if(!req.body && !req.body.outlet_id && !req.body.photo)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    let photo = await api.Photo.create({
        url: req.body.photo,
        _trade_point_id: req.body.outlet_id,
    });

    return res.json({status:"OK", error: null, data: photo});
});

router.delete('/photo', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    if(!req.query || !req.query.file)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});


    let photo = await api.Photo.findOne({
        where: {
            url: req.query.file
        }
    });

    if(!photo)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    await photo.destroy();
    return res.json({status:"OK", error: null, data: {}});
});




router.put('/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;
    let tradePoint = await api.TradePoint.findOne({where: {id}});

    tradePoint.address = req.body.address || tradePoint.address;
    tradePoint.name = req.body.name || tradePoint.name;
    tradePoint.logo = req.body.logo || tradePoint.logo;
    tradePoint.logo_square = req.body.logo_square || tradePoint.logo_square;
    tradePoint.lon = req.body.lon || tradePoint.lon ;
    tradePoint.lat = req.body.lat || tradePoint.lat ;
    tradePoint._merchant_id = req.body._merchant_id || tradePoint._merchant_id;
    tradePoint._place_id = req.body._place_id || tradePoint._place_id;
    tradePoint._city_id = req.body._city_id || tradePoint._city_id;

    await tradePoint.save();
    return res.json({status:"OK", error: null, data: tradePoint});
});

router.post('/', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    if(!req.body || !req.body.name)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    let data = req.body;
    data.source = 'ADMIN';

    let result = await api.TradePoint.create(data);

    return res.json({status:"OK", error: null, data: result});
});



module.exports = router;