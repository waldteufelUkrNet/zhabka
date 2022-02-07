var iconvl = require('iconv-lite');
const xmlBufferToString = require('xml-buffer-tostring');

async function find(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.get({
            TableName: 'CheckOrders',
            Key: {
                "unique_id": data.search
            }
        }, (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {
                retVal.data = data && data.Item ? data.Item : null;
                if(retVal.data && retVal.data.check_data && retVal.data.check_data.check){
                    var b64string = retVal.data.check_data.check;
                    var buf = Buffer.from(b64string, 'base64');
                    // var output = iconvl.decode(buf, "ISO-8859-9");
                    retVal.data.check_data.xml = xmlBufferToString(buf, { defaultEncoding: 'WINDOWS-1251' });
                }

                res(retVal);
            }
        })
    });
}

async function updateTradePoint(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };


    return new Promise((res) => {
        let expression = "set #trade_point_id = :trade_point_id";
        let expressionAttributeValues = {
            ":trade_point_id": data.trade_point_id
        };

        connect.update({
            TableName: 'CheckOrders',
            Key: {
                "unique_id": data.check_id
            },
            UpdateExpression: expression,
            ExpressionAttributeValues:expressionAttributeValues,
            ExpressionAttributeNames:{
                "#trade_point_id": "trade_point_id"
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


  

async function findBySecondary(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    var params = {
        TableName : "CheckOrders",
        ProjectionExpression:"#yr, unique_id, bank_id",
        KeyConditionExpression: "#yr between :letter1 and :letter2",
        ExpressionAttributeNames:{
            "#yr": "created_at"
        },
        ExpressionAttributeValues: {
            ":letter1": 0,
            ":letter2": 1000000000000000000000000
        }
    };

    return new Promise((res) => {


        connect.query(params, function(err, data) {
            if (err) {
                console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function(item) {
                    console.log(" -", item.unique_id + ": " + item.created_at_ms
                    + " ... " + item.bank_id);
                });
                res(data.Items);
            }
        });



    });
}

async function getUnsignedList(connect) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {

            var params = {
                TableName:"CheckOrders",
                FilterExpression: "#signed <> :truesigned",
                ExpressionAttributeNames: {
                    "#signed": "signed",
                },
                ExpressionAttributeValues: {
                     ":truesigned": true
                },
                Limit: 30
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

async function getUnknownMerchants(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
            var params = data.search ? {
                TableName:"CheckOrders",
                Key: {
                    "unique_id": data.search
                }
            } : {
                TableName:"CheckOrders",
                FilterExpression: "attribute_not_exists(#merchant) or #merchant = :mnull",
                ExpressionAttributeNames: {
                    "#merchant": "merchant"
                },
                ExpressionAttributeValues: {
                    ":mnull": null
                },
                Limit: 30
            };
        connect.scan(params, async (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {

                retVal.data = data.Items || null;
                if(retVal.data && retVal.data.length){
                    for(let i=0;i<retVal.data.length;i++){
                        if(retVal.data[i].check_data && retVal.data[i].check_data.check){
                            var b64string = retVal.data[i].check_data.check;
                            var buf = Buffer.from(b64string, 'base64');
                            retVal.data[i].check_data.xml = xmlBufferToString(buf, { defaultEncoding: 'WINDOWS-1251' });
                        }
                    }
                }
                res(retVal);
            }
        });
    });
}

async function getUnknownOutlets(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
            var params = data.search ? {
                TableName:"CheckOrders",
                FilterExpression: "contains (#unique_id, :unique_id)",
                ExpressionAttributeNames: {
                    "#unique_id": "unique_id",
                },
                ExpressionAttributeValues: {
                     ":unique_id": data.search,
                }
            } : {
                TableName:"CheckOrders",
                FilterExpression: "attribute_not_exists(#outlet) or #outlet = :onull",
                ExpressionAttributeNames: {
                    "#outlet": "outlet"
                },
                ExpressionAttributeValues: {
                    ":onull": null
                },
                Limit: 30
            };


            console.log('!!!!: ', params);
        connect.scan(params, async (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {

                retVal.data = data.Items || null;
                if(retVal.data && retVal.data.length){
                    for(let i=0;i<retVal.data.length;i++){
                        if(retVal.data[i].check_data && retVal.data[i].check_data.check){
                            var b64string = retVal.data[i].check_data.check;
                            var buf = Buffer.from(b64string, 'base64');
                            retVal.data[i].check_data.xml = xmlBufferToString(buf, { defaultEncoding: 'WINDOWS-1251' });
                        }
                    }
                }
                res(retVal);
            }
        });
    });
}



async function setItemAsSigned(connect, id) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };


    return new Promise((res) => {
        let expression = "set #signed = :signed";
        let expressionAttributeValues = {
            ":signed": true
        };

        

        connect.update({
            TableName: 'CheckOrders',
            Key: {
                "unique_id": id
            },
            UpdateExpression: expression,
            ExpressionAttributeValues:expressionAttributeValues,
            ExpressionAttributeNames:{
                "#signed": "signed"
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
exports.find = find;
exports.getUnsignedList = getUnsignedList;
exports.setItemAsSigned = setItemAsSigned;
exports.getUnknownMerchants = getUnknownMerchants;
exports.getUnknownOutlets = getUnknownOutlets;
exports.findBySecondary = findBySecondary;
exports.updateTradePoint = updateTradePoint;
