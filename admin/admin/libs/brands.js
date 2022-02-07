const { v4: uuidv4 } = require('uuid');

async function createBrand(connect, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.put({
            TableName: 'Brands',
            Item: {
                unique_id: uuidv4(),
                name: data.name,
                logo: data.logo,
                photo: data.photo,
                url: data.url,
                facebook: data.facebook,
                instagram: data.instagram,
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
            TableName: 'Brands'
        };

        if(inputParams.search){
            params.FilterExpression = "contains (#unique_id, :unique_id) or contains (#name, :name)";
            params.ExpressionAttributeNames = {
                "#unique_id": 'unique_id',
                "#name": 'name'
            };
            params.ExpressionAttributeValues = {
                ":unique_id": inputParams.search,
                ":name": inputParams.search
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

async function getBrand(connect, id) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.get({
            TableName: 'Brands',
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

async function updateBrand(connect, id, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.update({
            TableName: 'Brands',
            Key: {
                "unique_id": id
            },
            UpdateExpression: "set #name = :n, #logo = :l, #photo = :p, #url = :u, #facebook = :f, #instagram = :i",
            ExpressionAttributeValues: {
                ":n": data.name,
                ":l": data.logo,
                ":p": data.photo,
                ":u": data.url,
                ":f": data.facebook,
                ":i": data.instagram,
            },
            ExpressionAttributeNames:{
                "#name": "name",
                "#logo": "logo",
                "#photo": "photo",
                "#url": "url",
                "#facebook": "facebook",
                "#instagram": "instagram",
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

async function deleteBrand(connect, id) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.delete({
            TableName: 'Brands',
            Key: {
                "unique_id": id
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

var exports = module.exports = {};
exports.createBrand = createBrand;
exports.getList = getList;
exports.getBrand = getBrand;
exports.updateBrand = updateBrand;
exports.deleteBrand = deleteBrand;

