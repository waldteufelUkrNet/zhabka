const router          = require('express').Router();
var api = require('../../models/api.js');

router.post('/list', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

        let users = await api.KeyboardUser.count({where: {}});
        let p2p_payments = await api.KeyboardP2pPaymentBody.count({where: {}});
        let p2p_payouts = await api.KeyboardP2pPayoutBody.count({where: {}});
        let merchants = await api.KeyboardMerchant.count({where: {}});
        let payments = await api.KeyboardPaymentBody.count({where: {}});

        const result = [
            {
                name:"Пользователей",
                value: users
            },
            {
                name:"Бизнес-платежей",
                value: payments
            },
            {
                name:"P2P платежей",
                value: p2p_payments
            },
            {
                name:"P2P выплат",
                value: p2p_payouts
            },
            {
                name:"Мерчантов",
                value: merchants
            }
        ]

    return res.json({status:"OK", error: null, data: result});
});

module.exports = router;