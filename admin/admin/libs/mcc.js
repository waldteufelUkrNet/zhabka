async function createMcc(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.put({
            TableName: 'MccCodes',
            Item: {
                unique_id: data.unique_id,
                name: data.name,
                category: data.category,
                description: data.description
            }
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

async function getList(connect, inputParams = {}) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        let params = {
            TableName: 'MccCodes'
        };

        if(inputParams.search){
            params.FilterExpression = "contains (#name, :name) or contains (#category, :category) or contains (#description, :description) or contains (#unique_id, :unique_id)";
            params.ExpressionAttributeNames = {
                "#unique_id": 'unique_id',
                "#name": 'name',
                "#category": 'category',
                "#description": 'description'
            };
            params.ExpressionAttributeValues = {
                ":unique_id": inputParams.search,
                ":name": inputParams.search,
                ":category": inputParams.search,
                ":description": inputParams.search
            }
        }

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

async function getMcc(connect, id) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.get({
            TableName: 'MccCodes',
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

async function updateMcc(connect, id, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.update({
            TableName: 'MccCodes',
            Key: {
                "unique_id": id
            },
            UpdateExpression: "set #name = :n, #category = :c, #description = :d, #logo = :l",
            ExpressionAttributeValues: {
                ":n": data.name,
                ":c": data.category,
                ":d": data.description,
                ":l": data.logo
            },
            ExpressionAttributeNames:{
                "#name": "name",
                "#category": "category",
                "#description": "description",
                "#logo": "logo",
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
exports.createMcc = createMcc;
exports.getList = getList;
exports.getMcc = getMcc;
exports.updateMcc = updateMcc;

