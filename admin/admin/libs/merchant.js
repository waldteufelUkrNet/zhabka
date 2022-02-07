const { v4: uuidv4 } = require('uuid');

async function getList(connect, inputParams = {}) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        let params = {
            TableName: 'Merchants'
        };

        if(inputParams.search){
            params.FilterExpression = "contains (#fullName, :fullName) or contains (#shortName, :shortName) or contains (#inn, :inn) or contains (#edrpou, :edrpou)";
            params.ExpressionAttributeNames = {
                "#fullName": 'fullName',
                "#shortName": 'shortName',
                "#inn": 'inn',
                "#edrpou": 'edrpou',
            };
            params.ExpressionAttributeValues = {
                ":fullName": inputParams.search,
                ":shortName": inputParams.search,
                ":inn": inputParams.search,
                ":edrpou": inputParams.search
            }
        }

        connect.scan(params, async (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {
                /*if(!data.Items || !data.Items.length){
                    await createMerchant(connect, {
                        unique_id: uuidv4(),
                        logo: 'logo.png',
                        name: 'test 001',
                        tax_numbers: ['sdfvg11122']
                    });
                    await createMerchant(connect, {
                        unique_id: uuidv4(),
                        logo: 'logo.png',
                        name: 'test 002',
                        tax_numbers: [],
                        bundles: [{
                            bank_id: '0979365',
                            merchant_id: '234qddq341432'
                        }],
                        _merchants: ['0979365']
                    });
                    await createMerchant(connect, {
                        unique_id: uuidv4(),
                        logo: 'logo.png',
                        name: 'test 003',
                        tax_numbers: [],
                        bundles: [
                            {
                                bank_id: '09sdfs365',
                                merchant_id: '234qddqsa341432'
                            },
                            {
                                bank_id: '0979364',
                                merchant_id: '234qddq343431'
                            }],
                        _banks: ['09sdfs365'],
                        _merchants: ['234qddq343431', '234qddqsa341432']
                    });
                }*/

                retVal.data = data.Items || null;
                res(retVal);
            }
        });
    });
}

async function createMerchant(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.put({
            TableName: 'Merchants',
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

async function getMerchant(connect, id) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.get({
            TableName: 'Merchants',
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

async function updateMerchant(connect, id, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };

    return new Promise((res) => {
        let expression = "set #inn = :inn, #edrpou = :edr, #fullName = :ful, #shortName = :sho, #legalAddress = :leg, #director = :dir, #activityType = :act, #url = :url, #brand = :bra, #brandId = :bid, #bundles = :bun, #banks = :ban, #merchants = :mer";
        let expressionAttributeValues = {
            ":inn": data.inn || null,
            ":edr": data.edrpou || null,
            ":ful": data.fullName || null,
            ":sho": data.shortName || null,
            ":leg": data.legalAddress || null,
            ":dir": data.director || null,
            ":act": data.activityType || null,
            ":url": data.url || null,
            ":bra": data.brand || null,
            ":bid": data.brand ? data.brand.unique_id : null,
            ":bun": null,
            ":ban": null,
            ":mer": null
        };

        if(data.bundles && data.bundles.length){
            expressionAttributeValues[':bun'] = data.bundles;

            let _merchants = [];
            let _banks = [];
            for(let i=0;i<data.bundles.length;i++){
                _merchants.push(data.bundles[i].merchant_id);
                _banks.push(data.bundles[i].bank_id);
            }

            expressionAttributeValues[':mer'] = _merchants.length ? _merchants : null;
            expressionAttributeValues[':ban'] = _banks.length ? _banks : null;
        }

        connect.update({
            TableName: 'Merchants',
            Key: {
                "unique_id": id
            },
            UpdateExpression: expression,
            ExpressionAttributeValues:expressionAttributeValues,
            ExpressionAttributeNames:{
                "#inn": "inn",
                "#edrpou": "edrpou",
                "#fullName": "fullName",
                "#shortName": "shortName",
                "#legalAddress": "legalAddress",
                "#director": "director",
                "#activityType": "activityType",
                "#url": "url",
                "#brand": "brand",
                "#brandId": "brandId",
                "#bundles": "bundles",
                "#banks": "_banks",
                "#merchants": "_merchants"
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
exports.getMerchant = getMerchant;
exports.createMerchant = createMerchant;
exports.updateMerchant = updateMerchant;

