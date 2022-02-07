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
    
    let device = await api.KeyboardDevice.findOne({
        where:{
            udid: req.body.search
        },
        include: [
            {
                model: api.KeyboardUser,
                through: 'keyboard_user_device',
                as: 'users'
            }
        ]
    })

    if(req.body.search && req.body.search !== ''){
        query.where = {
            phone: { [Op.like]: '%' + req.body.search + '%' }
        };
        if(device && device.users && device.users.length){
            let user_ids = [];
            for(let i=0; i<device.users.length ; i++){
                user_ids.push(device.users[i].id)
            }
            query.where = {
                [Op.or]:[
                    {
                        phone: { [Op.like]: '%' + req.body.search + '%' }
                    },
                    {
                        id: {
                            [Op.in]: user_ids
                        }
                    }
                ]
                
            };
        }
    }
        
    if(!query.where){
        query.where = {};
    }


    query.include=[
        {
            model:api.KeyboardMerchant,
            as: 'merchants'
        },
        {
            model: api.KeyboardPaymentBody,
            as: 'payments'
        }
    ]
    let list = await api.KeyboardUser.findAll(query);

    return res.json({status:"OK", error: null, data: list});
});

router.post('/count', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {};

    if(req.body.search && req.body.search !== '')
        query.where = {
            phone: { [Op.like]: '%' + req.body.search + '%' }
        };

    let count = await api.KeyboardUser.count(query);

    return res.json({status:"OK", error: null, data: count});
});

router.get('/info/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        let item = await api.KeyboardUser.findOne({
            where:{id: req.params.id},
            include: [
                {
                    model:api.KeyboardMerchant,
                    as: 'merchants'
                },
                {
                    model: api.KeyboardPaymentBody,
                    as: 'payments'
                }
            ]
        });
   
    return res.json({status:"OK", error: null, data: item});
});

router.post('/device/black_list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {};
    if(req.body.range){
        let range = req.body.range;
        query.offset = range.offset;
        query.limit = range.limit;
    }


    if(req.body.search && req.body.search !== ''){
        query.where = {
            udid: { [Op.like]: '%' + req.body.search + '%' }
        };
        
    }
        
    if(!query.where){
        query.where = {};
    }

    if(req.body.blocked)
        query.where.blocked = 1;

    query.include=[
        {
            model: api.KeyboardUser,
            through: 'keyboard_user_device',
            as: 'users'
        }
    ]
    let list = await api.KeyboardDevice.findAll(query);

    return res.json({status:"OK", error: null, data: list});
});

router.post('/device/black_list/count', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let query = {
        where: {
            
        }
    };

    if(req.body.search && req.body.search !== '')
        query.where = {
            udid: { [Op.like]: '%' + req.body.search + '%' }
        };

        if(req.body.blocked)
            query.where.blocked = 1;

    let count = await api.KeyboardDevice.count(query);

    return res.json({status:"OK", error: null, data: count});
});


router.get('/devices/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        let item = await api.KeyboardUser.findOne({
            where:{id: req.params.id},
            include: [
                {
                    model: api.KeyboardDevice,
                    through: 'keyboard_user_device',
                    as: 'devices'
                }
            ]
        });
   
    return res.json({status:"OK", error: null, data: item ? item.devices : null});
});

router.post('/user_p2p_list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });
    
    let query = {};
    if(req.body.user_id){
        query.where = {user_id: req.body.user_id};
    }
    
    let list = await api.KeyboardP2pPaymentBody.findAll(query);

    return res.json({status:"OK", error: null, data: list});
});

router.post('/unblock_device', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    await api.KeyboardDevice.update({ blocked: false}, {where:{id:req.body.item_id}});

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/block_device', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    await api.KeyboardDevice.update({ blocked: true }, {where:{id:req.body.item_id}});

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/unblock', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    await api.KeyboardUser.update({ is_blocked: false}, {where:{id:req.body.user_id}});

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/block', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    await api.KeyboardUser.update({ is_blocked: true }, {where:{id:req.body.user_id}});

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/unblock_payment', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        console.log(req.body)
        
        let payment = await api.KeyboardPaymentBody.findOne({where: {
            id:req.body.item_id
        }})
        

        if(!payment || payment.payment_status >= 3)
            return res.status(400).send('Payment error');

        await api.KeyboardPaymentBody.update({ removed: false }, {where:{id:req.body.item_id}});

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/unblock_p2p_payment', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        console.log(req.body)
        
        let payment = await api.KeyboardP2pPaymentBody.findOne({where: {
            id:req.body.item_id
        }})
        

        if(!payment || payment.payment_status >= 3)
            return res.status(400).send('Payment error');

        await api.KeyboardP2pPaymentBody.update({ removed: false }, {where:{id:req.body.item_id}});

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/block_payment', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        console.log(req.body)
        let payment = await api.KeyboardPaymentBody.findOne({where: {
            id:req.body.item_id
        }})

        if(!payment || payment.payment_status >= 3)
            return res.status(400).send('Payment error');

    await api.KeyboardPaymentBody.update({ removed: true}, {where:{id:req.body.item_id}});

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/block_p2p_payment', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        console.log(req.body)
        let payment = await api.KeyboardP2pPaymentBody.findOne({where: {
            id:req.body.item_id
        }})

        if(!payment || payment.payment_status >= 3)
            return res.status(400).send('Payment error');

    await api.KeyboardP2pPaymentBody.update({ removed: true}, {where:{id:req.body.item_id}});

    return res.json({status:"OK", error: null, data: {}});
});


router.post('/versions/list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        result = await api.KeyboardVersion.findAll();

    return res.json({status:"OK", error: null, data: result});
});

router.post('/versions/add', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        result = await api.KeyboardVersion.create(req.body);

    return res.json({status:"OK", error: null, data: {}});
});

router.post('/offer/get', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        result = await api.KeyboardSettings.findOne({where:{name: req.body.name}});

    return res.json({status:"OK", error: null, data: result});
});

router.post('/offer/set', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        result = await api.KeyboardSettings.findOne({where:{name: req.body.key}});
        if(result){
            await result.update({value: req.body.value})
        }
    return res.json({status:"OK", error: null, data: result});
});

router.post('/versions/remove', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        await api.KeyboardVersion.destroy({where: req.body});

    return res.json({status:"OK", error: null, data: result});
});


router.post('/', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        console.log("still post")
    let result = await api.Brand.create(req.body.brand);

        for(let i = 0 ; i< req.body.item_mcc_list.length; i++){
            let mcc = await api.MccCode.findOne({where:{id: req.body.item_mcc_list[i].id}});
            await result.addMccs([mcc]);
        }


        for(let i = 0 ; i< req.body.item_contact_list.length; i++){
            let tmp_item = req.body.item_contact_list[i];
            tmp_item.brand_id = result.id;
            await api.BrandContact.create(tmp_item);
        }

        result = await api.Brand.findOne({
            where:{id: result.id},
            include:[
                {
                    model:api.MccCode,
                    through: 'brand_mcc',
                    as: 'mccs'
                },
                {
                    model: api.BrandContact,
                    as: 'contacts'
                }
            ]
        });

    return res.json({status:"OK", error: null, data: result});
});

router.put('/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;
    let result = await api.Brand.findOne({where:{id},
        include:[
            {
                model:api.MccCode,
                through: 'brand_mcc',
                as: 'mccs'
            },
            {
                model: api.BrandContact,
                as: 'contacts'
            }
        ]
    });

    console.log("result.mccs ",result.mccs)
    if(!result)
        return res.json({ status:"ERROR", error: "NO_SUCH_ENTITY"});
       
        

        let current_mccs=[],
        current_contacts = [],
        ignore_mccs = [];
        //removing old mccs
        
        for(let i = 0 ; i< result.mccs.length; i++){
            let flag = false;
            ignore_mccs.push(result.mccs[i].id);
            for(let z = 0 ; z< req.body.item_mcc_list.length; z++){
                if(result.mccs[i].id === req.body.item_mcc_list[z].id)
                    flag = true;
            }
            if(!flag){
                await result.removeMccs(result.mccs[i]);
            } 
        }

        console.log("ignore_mccs ",ignore_mccs)

        for(let i = 0 ; i< req.body.item_mcc_list.length; i++){
            console.log(req.body.item_mcc_list[i].id)
            if(ignore_mccs.indexOf(req.body.item_mcc_list[i].id)<0){

                let mcc = await api.MccCode.findOne({where:{id: req.body.item_mcc_list[i].id}});
                console.log("adding mcc")
                await result.addMcc(mcc);
            }
            
        }

        //removing old contacts
        for(let i = 0 ; i< result.contacts.length; i++){
            let flag = false;
            for(let z = 0 ; z< req.body.item_contact_list.length; z++){
                if(req.body.item_contact_list[z].id && result.contacts[i].id === req.body.item_contact_list[z].id)
                    flag = true;
            }
            if(!flag){
                await api.BrandContact.destroy({where: {id:result.contacts[i].id}});
            } 
        }

        for(let i = 0 ; i< req.body.item_contact_list.length; i++){

            let tmp_item = req.body.item_contact_list[i];
            tmp_item.brand_id = result.id;
            if(req.body.item_contact_list[i].id){
                console.log(req.body.item_contact_list[i])
                await api.BrandContact.update({tmp_item}, {where:{id: tmp_item.id}})
            }
            else{
                await api.BrandContact.create(tmp_item);
            }
            
        }

        await result.update(req.body.brand);

        result = await api.Brand.findOne({where:{id},
            include:[
                {
                    model:api.MccCode,
                    through: 'brand_mcc',
                    as: 'mccs'
                },
                {
                    model: api.BrandContact,
                    as: 'contacts'
                }
            ]
        });

       

    return res.json({status:"OK", error: null, data: result});
});

router.delete('/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;

     await api.Brand.destroy({where:{id}});
    
    return res.json({status:"OK", error: null, data: {}});
});

module.exports = router;