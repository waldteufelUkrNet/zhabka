let express = require('express');
let router = express.Router();
let admin_api = require('./admin');
let keyboard_users_api = require('./keyboard_users');
let keyboard_bills_api = require('./keyboard_bills');
let keyboard_p2p_bills_api = require('./keyboard_p2p_bills');

router.use('/admin', admin_api);
router.use('/keyboard/users', keyboard_users_api);
router.use('/keyboard/bills', keyboard_bills_api);
router.use('/keyboard/p2p_bills', keyboard_p2p_bills_api);

module.exports = router;
