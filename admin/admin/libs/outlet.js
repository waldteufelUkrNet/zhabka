const { v4: uuidv4 } = require('uuid');

async function getList(connect, inputParams = {}) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };

    return new Promise((res) => {
        let params = {
            TableName: 'Outlets'
        };

        connect.scan(params, async (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {
                retVal.data = data.Items || null;
                res(retVal);
            }
        });
    });
}

async function createOutlet(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.put({
            TableName: 'Outlets',
            Item: data
        }, (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {
                res(retVal);
            }
        })
    });
}

async function getOutlet(connect, id) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.get({
            TableName: 'Outlets',
            Key: {
                "unique_id": id
            }
        }, (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {
                retVal.data = data.Item || null;
                res(retVal);
            }
        })
    });

}

async function updateOutlet(connect, id, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        let expression = "set #region = :re, #city = :ci, #address = :ad, #coordinates = :co, #bundles = :bu, #name = :na, #logo = :lo, #logo_square = :los, #phones = :ph, #photos = :p, #fiscal_numbers = :fn, #work_time = :wt, #banks = :ba, #merchants = :me, #terminals = :te, #merchant = :mer, #merchant_id = :mid";
        let expressionAttributeValues = {
            ":mer": data.merchant || null,
            ":mid": data.merchant ? data.merchant.unique_id : null,
            ":re": data.region || null,
            ":ci": data.city || null,
            ":ad": data.address || null,
            ":co": data.coordinates || null,
            ":bu": data.bundles || null,
            ":na": data.name,
            ":lo": data.logo,
            ":los": data.logo_square,
            ":ph": data.phones || null,
            ":p": data.photos || null,
            ":fn": data.fiscal_numbers || null,
            ":wt": data.work_time || null,
            ":ba": null,
            ":me": null,
            ":te": null
        };

        if(data.bundles && data.bundles.length){
            let _merchants = [];
            let _banks = [];
            let _terminals = [];

            for(let i=0;i<data.bundles.length;i++){
                _merchants.push(data.bundles[i].merchant_id);
                _terminals.push(data.bundles[i].terminal_id);
                _banks.push(data.bundles[i].bank_id);
            }

            expressionAttributeValues[':me'] = _merchants.length ? _merchants : null;
            expressionAttributeValues[':te'] = _terminals.length ? _terminals : null;
            expressionAttributeValues[':ba'] = _banks.length ? _banks : null;

        }

        connect.update({
            TableName: 'Outlets',
            Key: {
                "unique_id": id
            },
            UpdateExpression: expression,
            ExpressionAttributeValues:expressionAttributeValues,
            ExpressionAttributeNames:{
                "#merchant": "merchant",
                "#merchant_id": "merchant_id",
                "#region": "region",
                "#city": "city",
                "#address": "address",
                "#coordinates": "coordinates",
                "#bundles": "bundles",
                "#name": "name",
                "#logo": "logo",
                "#logo_square": "logo_square",
                "#phones": "phones",
                "#photos": "photos",
                "#fiscal_numbers": "fiscal_numbers",
                "#work_time": "work_time",
                "#merchants": "_merchants",
                "#banks": "_banks",
                "#terminals": "_terminals"
            },
            ReturnValues:"UPDATED_NEW"
        }, (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {
                res(retVal);
            }
        })
    });
}

var exports = module.exports = {};
exports.getList = getList;
exports.getOutlet = getOutlet;
exports.createOutlet = createOutlet;
exports.updateOutlet = updateOutlet;

