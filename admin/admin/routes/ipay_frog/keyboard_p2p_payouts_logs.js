const router          = require('express').Router();
var brandsLib = require('../../libs/brands');
var api = require('../../models/api.js');
const { Op } = require("sequelize");
const moment = require("moment");

router.post('/list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });


        let where = {
            status: {[Op.in]: ['5', '9']}
        };            
    
        if(req.body.daterange){
            let daterange = req.body.daterange;
            if(daterange)
                where.created_at = {
                    [Op.between]: [moment(daterange.startDate).format('YYYY-MM-DD HH:mm:ss'), moment(daterange.endDate).format('YYYY-MM-DD HH:mm:ss')]
                }
        }
    
        let total = {
            income_balance: 0,
            outcome_balance: 0,
            comission: 0
        }
        console.log(where)
        let list = await api.KeyboardP2pPayoutLogs.findAll({where, order: [['id', 'DESC']]});
        for(let i=0; i<list.length; i++){
            list[i] = list[i].get({plain: true})
            list[i].description = {
                balance: 0,
                comission: 0,
                action: list[i].action,
                pmt_id: ''
            }
            let response = JSON.parse(list[i].response_data);
            if(response && ((response.pay && response.pay.error) || (response.response && response.response.error))){
                list[i].description.balance = 'ERROR';
                list[i].description.comission = 'ERROR';
            }
            else
            if(list[i].action === 'ApplePay a2c Invoice' || list[i].action === 'GooglePay a2c Invoice'){
               
                list[i].description.balance = (-1) * parseInt(response.pay.invoice) / 100;
                list[i].description.comission = 0;
                list[i].description.pmt_id = response.pay.pmt_id;

                total.outcome_balance -= list[i].description.balance;
            }
            else
            if(list[i].action === 'GooglePay c2a PaymentCreate'){
                
                list[i].description.balance = parseInt(response.response.invoice) / 100;
                list[i].description.comission = parseInt(response.response.amount) / 100 - parseInt(response.response.invoice) / 100;
                list[i].description.pmt_id = response.response.pmt_id;

                total.income_balance += list[i].description.balance;
                total.comission += list[i].description.comission;
            }
            else
            if(list[i].action === 'ApplePay c2a PaymentSale'){
                
                list[i].description.balance = parseInt(response.response.invoice) / 100;
                list[i].description.comission = parseInt(response.response.amount) / 100 - parseInt(response.response.invoice) / 100;
                list[i].description.pmt_id = response.response.pmt_id;

                total.income_balance += list[i].description.balance;
                total.comission += list[i].description.comission;
            }
            else
            if(list[i].action === 'ApplePay c2a PaymentCancel' || list[i].action === 'GooglePay c2a PaymentCancel'){

                list[i].description.balance = (-1) * parseInt(response.response.invoice) / 100;
                list[i].description.comission = (-1) * (parseInt(response.response.amount) / 100 - parseInt(response.response.invoice) / 100);
                list[i].description.pmt_id = response.response.pmt_id;

                total.outcome_balance -= list[i].description.balance;
                total.comission -= list[i].description.comission;
            }
        }
        return res.json({status:"OK", error: null, data: {list, total}});
});

module.exports = router;