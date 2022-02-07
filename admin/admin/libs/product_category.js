const { v4: uuidv4 } = require('uuid');

async function getList(connect, inputParams = {}) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        let params = {
            TableName: 'ProductCategories'
        };
/*
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
*/
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


async function updateItem(connect, id, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };


    return new Promise((res) => {
        let expression = "set #name = :name, #search_words = :search_words";
        let expressionAttributeValues = {
            ":name": data.name || null,
            ":search_words": data.search_words || null
        };

        

        connect.update({
            TableName: 'ProductCategories',
            Key: {
                "id": id
            },
            UpdateExpression: expression,
            ExpressionAttributeValues:expressionAttributeValues,
            ExpressionAttributeNames:{
                "#name": "name",
                "#search_words": "search_words"
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
exports.updateItem = updateItem;

