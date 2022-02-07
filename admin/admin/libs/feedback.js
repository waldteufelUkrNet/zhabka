async function getList(connect, inputParams = {}) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        let params = {
            TableName: 'Feedback'
        };

        if(inputParams.search){
            params.FilterExpression = "contains (#unique_id, :unique_id) and contains (#type, :type)";
            params.ExpressionAttributeNames = {
                "#unique_id": 'unique_id',
                "#type": 'type',
            };
            params.ExpressionAttributeValues = {
                ":unique_id": inputParams.search,
                ":type": 'outlet',
            }
        } else {
            params.FilterExpression = "contains (#type, :type)";
            params.ExpressionAttributeNames = {
                "#type": 'type',
            };
            params.ExpressionAttributeValues = {
                ":type": 'outlet',
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

async function getError(connect, inputParams = {}) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        let params = {
            TableName: 'Feedback'
        };

        if(inputParams.search){
            params.FilterExpression = "contains (#unique_id, :unique_id) and contains (#type, :type)";
            params.ExpressionAttributeNames = {
                "#unique_id": 'unique_id',
                "#type": 'type',
            };
            params.ExpressionAttributeValues = {
                ":unique_id": inputParams.search,
                ":type": 'error',
            }
        } else {
            params.FilterExpression = "contains (#type, :type)";
            params.ExpressionAttributeNames = {
                "#type": 'type',
            };
            params.ExpressionAttributeValues = {
                ":type": 'error',
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

var exports = module.exports = {};
exports.getList = getList;
exports.getError = getError;

