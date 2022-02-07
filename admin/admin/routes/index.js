const express = require('express');
const router = express.Router();

const https = require('https');
var xml2js = require('xml2js');

const agent = new https.Agent({
    rejectUnauthorized: false
});

module.exports = router;
