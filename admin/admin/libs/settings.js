async function getStatic(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.scan({
            TableName: 'StaticContents'
        }, (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {
                let retData = {};
                if(data && data.Items && data.Items.length){
                    for(let i=0;i<data.Items.length;i++){
                        if(data.Items[i].unique_id === 'service_info')
                            retData['service_info'] = data.Items[i].data;
                        if(data.Items[i].unique_id === 'electronic_info')
                            retData['electronic_info'] = data.Items[i].data;
                        if(data.Items[i].unique_id === 'terms_of_use')
                            retData['terms_of_use'] = data.Items[i].data;
                    }
                }

                retVal.data = retData;
                res(retVal);
            }
        })
    });
}

async function saveStatic(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };

    return new Promise(async (res) => {
        let success = true;
        if(data.electronic_info){
            let tmp = await updateStaticRow(connect, 'electronic_info', data.electronic_info);
            if(!tmp.success){
                retVal.success = false;
                retVal.error = tmp.error;
            }
        }
        if(data.service_info && success){
            let tmp = await updateStaticRow(connect, 'service_info', data.service_info);
            if(!tmp.success){
                retVal.success = false;
                retVal.error = tmp.error;
            }
        }
        if(data.terms_of_use && success){
            let tmp = await updateStaticRow(connect, 'terms_of_use', data.terms_of_use);
            if(!tmp.success){
                retVal.success = false;
                retVal.error = tmp.error;
            }
        }

        res(retVal);
    });
}

async function createStatic(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.put({
            TableName: 'StaticContents',
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

async function updateStaticRow(connect, id, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.update({
            TableName: 'StaticContents',
            Key: {
                "unique_id": id
            },
            UpdateExpression: "set #data = :d",
            ExpressionAttributeValues: {
                ":d": data
            },
            ExpressionAttributeNames:{
                "#data": "data"
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
exports.getStatic = getStatic;
exports.saveStatic = saveStatic;

