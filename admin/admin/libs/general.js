const jwt = require('jsonwebtoken');
const config = require('../config');

def = (_var) => {
    return (_var === undefined || _var === null || _var === false) ? false : _var;
};

checkArray = (_var) => {
    return (def(_var) && Array.isArray(_var) && _var.length);
};

randomKey = (len = 7, charSet = null) => {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
};

const decimal2JSON = (v, i, prev) => {
    if (v !== null && typeof v === 'object') {
        if (v.constructor.name === 'Decimal128')
            prev[i] = v.toString();
        else
            Object.entries(v).forEach(([key, value]) => decimal2JSON(value, key, prev ? prev[i] : v));
    }
};

generateJwt = (user) => {
    return jwt.sign({ email: user.email, role: user.role}, config.admin_jwt_secret);
};

generateAdminBotJwt = (user) => {
    return jwt.sign({ email: user.email, role: user.role}, config.admin_bot_jwt_secret);
};

module.exports = {
    def,
    generateJwt,
    generateAdminBotJwt,
    checkArray,
    randomKey,
    decimal2JSON
};