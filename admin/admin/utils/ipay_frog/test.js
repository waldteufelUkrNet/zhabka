const router          = require('express').Router();

router.get('/', async function (req, res, next) {
    const docClient = req.dbClient;
    docClient.scan({
        TableName: 'MerchantTest',
        Select:'COUNT'
    }, async (err, data) => {
        if (err) {
            return res.json({status:"OK", error: err, data: {}});
        } else {
            return res.json({status:"OK", error: err, data: data});
        }
    });
});

/*const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get('/', async function (req, res, next) {
    const docClient = req.dbClient;
    // {"name\";\"kod_pdv\";\"dat_reestr\";\"dat_term":"ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ \"ЗОНТА-ТРАНС\";\"356383613199\";\"01.06.2011\";\"null"},
    let results = [];
    fs.createReadStream('/var/www/4ek-dev/pdv_actual_2020-10-28.csv')
        .pipe(csv({ separator: '\n' }))
        .on('data', (data) => {
            if(data["name\";\"kod_pdv\";\"dat_reestr\";\"dat_term"]){
                data = data["name\";\"kod_pdv\";\"dat_reestr\";\"dat_term"].split('\r\n');
                if(data.length > 1){
                    for(let i=0;i<data.length;i++){
                        create(docClient, data[i]);
                    }
                } else {
                    create(docClient, data[0]);
                }
            }
        })
        .on('end', () => {
            return res.json({status:"OK", error: null, data: {}});
        });
});


function create(docClient, data){
    if(data.indexOf('"') === 0)
        data = data.slice(1);

    data = data.split(';')[0].replace(/\"+/g, '&quot;');
    data = data.replace('`&quot;', '&quot;');
    data = data.replace('` ', '&quot;');
    data = data.replace('`', '&quot;');

    docClient.put({
        TableName: 'Merchants',
        Item: {
            unique_id: uuidv4(),
            fullName: data,
            status: 0
        }
    }, (err, data) => {
        if (err) {
            console.log(err);
        }
    })
}*/

module.exports = router;