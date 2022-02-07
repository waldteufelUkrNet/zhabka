var images = require("images");
var moment = require('moment');
var text2png = require('text2png');
var request = require('request');
let config = require('./config');
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    secretAccessKey: config.aws_remote_s3_config.secretAccessKey,
    accessKeyId: config.aws_remote_s3_config.accessKeyId,
    params: { Bucket: '4ek-frog' }
});

var uploadToS3 = async(filename, callback) => {
    fs.readFile(filename, (err, fileBody) => {
        if(err) {
            callback(null);
        } else {
            s3.upload({
                Key: filename,
                Body: fileBody,
                ACL: 'public-read',
                ContentType: 'image/jpeg',
            }, {}, callback);
        }
    });
};

var getImageBuffer = async (url) => {
    return new Promise((res) => {
        request({
            url: url,
            method: "get",
            encoding: null
        }, function (error, response, body) {
            if (error) {
                res(null);
            } else {
                res(body);
            }
        });
    })
};

var randomKey = (len = 7, charSet = null) => {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
};

let generateOgImage = async (data, additional = null) => {
    return new Promise(async (res) => {
        let filename = moment().unix() + randomKey() + '.jpg';

        let imgGen;
        imgGen = images("/var/www/4ek-dev/libs/check-image/frog_3.jpg")
            .size(600, 400);
        if(additional && additional === "BLACK")
            imgGen = images("/var/www/4ek-dev/libs/check-image/frog_3_black.jpg")
                .size(600, 400);


        //imgGen.draw(images(text2png(data.name, {color: '#2e292b', font: '17px Rubik-Regular', localFontPath: '/var/www/cron-scripts/check-image/Rubik-Regular.ttf'})), 30, 37);
        //imgGen.draw(images(text2png(data.date, {color: '#2e292b', font: '13px Rubik-Regular', localFontPath: '/var/www/cron-scripts/check-image/Rubik-Regular.ttf'})), 30, 61);
        imgGen.draw(images(text2png('₴' + data.price + "" +  ( data.kopek ? ('.'+ data.kopek) : '') , {color: '#ffffff', font: data.font_size+'px Rubik-Bold', localFontPath: '/var/www/4ek-dev/libs/check-image/Rubik-Bold.ttf', strokeColor: '#ffffff', strokeWidth: 1})), 
        (300 - images(text2png('₴' + data.price +  "" + ( data.kopek ? ('.'+ data.kopek) : '' ), {color: '#ffffff', font: data.font_size+'px Rubik-Bold', localFontPath: '/var/www/4ek-dev/libs/check-image/Rubik-Bold.ttf', strokeColor: '#ffffff', strokeWidth: 1})).width()/2 ), 160);


        imgGen.save(filename, {
            quality : 100
        });

        await uploadToS3(filename, (err, data) => {
            if(err){
                console.log(err)
                fs.unlinkSync(filename);
                res(null);
            } else {
                fs.unlinkSync(filename);
                res(data.Location);
            }
        });
    });
};

exports.generateOgImage = generateOgImage;