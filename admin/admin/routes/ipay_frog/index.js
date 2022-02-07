let express = require('express');
let router = express.Router();
let admin_api = require('./admin');
let keyboard_users_api = require('./keyboard_users');
let keyboard_feedback_api = require('./keyboard_feedback');
let keyboard_bills_api = require('./keyboard_bills');
let keyboard_p2p_bills_api = require('./keyboard_p2p_bills');
let keyboard_p2p_payouts_api = require('./keyboard_p2p_payouts');
let mcc_api = require('./mcc');
let file_api = require('./file');
const statistics_api = require('./keyboard_statistics')
const merchant_api = require('./keyboard_merchant')
const payment_details = require('./keyboard_payment_details')
const merchant_mcc = require('./merchant_mcc')
const keyboard_p2p_payouts_logs = require('./keyboard_p2p_payouts_logs')

router.use('/admin', admin_api);
router.use('/keyboard/users', keyboard_users_api);
router.use('/keyboard/feedback', keyboard_feedback_api);
router.use('/keyboard/bills', keyboard_bills_api);
router.use('/keyboard/p2p_bills', keyboard_p2p_bills_api);
router.use('/keyboard/p2p_payouts', keyboard_p2p_payouts_api);
router.use('/keyboard/mcc', mcc_api);
router.use('/keyboard/merchant_mcc', merchant_mcc);
router.use('/keyboard/payment_details', payment_details)

router.use('/keyboard/p2p_payouts/logs', keyboard_p2p_payouts_logs);
router.use('/keyboard/statistics', statistics_api)
router.use('/keyboard/merchant', merchant_api)

router.use('/file', file_api);

module.exports = router;
