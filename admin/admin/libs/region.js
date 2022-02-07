const { v4: uuidv4 } = require('uuid');

async function getList(connect, inputParams = {}) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        let params = {
            TableName: 'Regions'
        };

        if(inputParams.search){
            params.FilterExpression = "contains (#name, :name) or contains (#code, :code) or contains (#unique_id, :unique_id)";
            params.ExpressionAttributeNames = {
                "#unique_id": 'unique_id',
                "#name": 'name',
                "#code": 'code'
            };
            params.ExpressionAttributeValues = {
                ":unique_id": inputParams.search,
                ":name": inputParams.search,
                ":code": inputParams.search
            }
        }

        connect.scan(params, async (err, data) => {
            if (err) {
                retVal.success = false;
                retVal.error = err;
                res(retVal);
            } else {
                /*if(!data.Items || !data.Items.length){
                    await createRegion(connect, {
                        unique_id: uuidv4(),
                        name: 'Київська область',
                        code: "Kyivs'ka oblast",
                        cities: [
                            {
                                unique_id: uuidv4(),
                                name: 'Київ'
                            },
                            {
                                unique_id: uuidv4(),
                                name: 'Бровари'
                            }
                        ]
                    });
                    await createRegion(connect, {
                        unique_id: uuidv4(),
                        name: 'Чернівецька область',
                        code: "Chernivets'ka oblast",
                        cities: [
                            {
                                unique_id: uuidv4(),
                                name: 'Чернівці'
                            },
                            {
                                unique_id: uuidv4(),
                                name: 'Новоселиця'
                            },
                            {
                                unique_id: uuidv4(),
                                name: 'Хотин'
                            }
                        ]
                    });
                }*/

                retVal.data = data.Items || null;
                res(retVal);
            }
        });
    });

    async function createRegion(connect, data) {
        let retVal = {
            success: true,
            data: null,
            error: null
        };
        return new Promise((res) => {

            connect.put({
                TableName: 'Regions',
                Item: {
                    unique_id: data.unique_id,
                    name: data.name,
                    code: data.code,
                    cities: data.cities
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
}

async function getRegion(connect, id) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.get({
            TableName: 'Regions',
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

async function updateRegion(connect, id, data) {
    let retVal = {
        success: true,
        data: null,
        error: null
    };
    return new Promise((res) => {
        connect.update({
            TableName: 'Regions',
            Key: {
                "unique_id": id
            },
            UpdateExpression: "set #name = :n, #cities = :c",
            ExpressionAttributeValues: {
                ":n": data.name,
                ":c": data.cities
            },
            ExpressionAttributeNames:{
                "#name": "name",
                "#cities": "cities"
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
exports.getRegion = getRegion;
exports.updateRegion = updateRegion;

