const { v4: uuidv4 } = require('uuid');

async function getList(connect, inputParams = {}) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        let params = {
            TableName: 'Cashbox'
        };

        if(inputParams.search){
            params.FilterExpression = "contains (#name, :name)";
            params.ExpressionAttributeNames = {
                "#name": 'name'
            };
            params.ExpressionAttributeValues = {
                ":name": inputParams.search
            }
        }

        connect.scan(params, async (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {
                /*if(!data.Items || !data.Items.length){
                    await createCashbox(connect, {
                        unique_id: uuidv4(),
                        name: 'test 001',
                        outlet: null,
                        merchants: null,
                        terminals: null
                    });
                }*/

                retVal.data = data.Items || null;
                res(retVal);
            }
        });
    });
}

async function createCashbox(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.put({
            TableName: 'Cashbox',
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

async function getCashbox(connect, id) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.get({
            TableName: 'Cashbox',
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

async function updateCashbox(connect, id, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };

    return new Promise((res) => {
        let expression = "set #name = :n, #outlet = :o, #merchants = :m, #terminals = :t";
        let expressionAttributeValues = {
            ":n": data.name || null,
            ":o": data.outlet || null,
            ":m": data.merchants || null,
            ":t": data.terminals || null
        };

        connect.update({
            TableName: 'Cashbox',
            Key: {
                "unique_id": id
            },
            UpdateExpression: expression,
            ExpressionAttributeValues:expressionAttributeValues,
            ExpressionAttributeNames:{
                "#name": "name",
                "#outlet": "outlet",
                "#merchants": "merchants",
                "#terminals": "terminals"
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
exports.getCashbox = getCashbox;
exports.createCashbox = createCashbox;
exports.updateCashbox = updateCashbox;

