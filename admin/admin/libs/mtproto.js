var api = require('../models/api.js');
var config = require('../config.js');

const { Op } = require("sequelize");
const redis = require('redis');

const { MTProto } = require('@mtproto/core');
const fs = require('fs');
const  {Storage} = require('mtproto-storage-fs');

const redisClient = redis.createClient(config.redis_port);
redisClient.on('connect', function() {
    console.log('Connected to Redis');
});

async function loadSessions(){
    let current_phones = await api.MtprotoPhones.findAll();

    telegram_sender.collection = [];
    telegram_sender.iterator=null;

    if(current_phones.length){
        telegram_sender.iterator=0;
    

        for(let i =0 ; i< current_phones.length; i++){
            let path = './mtproto_storage/storage_'+current_phones[i].id+'.json';
            if (!fs.existsSync(path)) {
                console.log('then creating file')
                fs.writeFileSync(path, "");
                //file exists
              }

              const { MTProto } = require('@mtproto/core');
              
            let  CustomStorage = {
                setItem: async function (key, value) {
                    return new Promise((response, reject) => {

                        console.log("writing to REDIS "+"test_client_"+current_phones[i].id+"_"+key)

                        redisClient.set("test_client_"+current_phones[i].id+"_"+key, JSON.stringify(value), function(err, reply) {
                            console.log("setting to redis "+"client_"+current_phones[i].id)
                            response(value);
                        });
                    });
                    await datastore.insert({ key: value });
                },
                getItem:  function (key) {
                    return new Promise((response, reject) => {
                        redisClient.get("test_client_"+current_phones[i].id+"_"+key, function(err, reply) {


                        console.log("reading from REDIS "+"test_client_"+current_phones[i].id+"_"+key)

                            if(reply)
                                reply = JSON.parse(reply);    
                            console.log("getting from  redis "+"client_"+current_phones[i].id)
                            response(reply);
                        });
                    });
                },
            };
              console.log("making mtproto for ",current_phones[i].phone )
            let item = {
                phone:current_phones[i].phone,
                status: false,
                mtproto: new MTProto({
                    api_id: config.telegram_sender.api_id,
                    api_hash: config.telegram_sender.api_hash,
                    test: config.telegram_sender.test,
                    //customLocalStorage: new Storage(path)
                    customLocalStorage: CustomStorage
                  })
            };
            telegram_sender.collection.push(item);
            await current_phones[i].update({status: false});

            for(let i = 0; i< telegram_sender.collection.length; i++){
                try {
                    let result = await telegram_sender.collection[i].mtproto.call("account.getAuthorizations");
                    console.log("result for proto  "+i+" "+telegram_sender.collection[i].phone)
                    telegram_sender.collection[i].status = true;
                    await current_phones[i].update({status: true});
                   }catch(e){
                     console.log("NO AUTH PROTO error ",e)
                   }
            }
            console.log("ALL MTPROTO instances started!")
        }

    }
}

async function currentMtproto(){
    return getNextIndex(telegram_sender.iterator);
}

function getNextIndex(current_index = 0 ){
    if(!telegram_sender.collection.length)
        return null;
    
    let start_index = current_index+1;
    if(!telegram_sender.collection[start_index])
        start_index = 0;
    for(let i=start_index; i< telegram_sender.collection.length; i++){
        if(!telegram_sender.collection[i])
            i=0;
        
        if(telegram_sender.collection[i] && telegram_sender.collection[i].status){
            telegram_sender.iterator = i;
            console.log("using controller ",i)
            return telegram_sender.collection[current_index];
        }
        if(i === current_index){
            telegram_sender.iterator = i;
            console.log("using controller ",i)
            return telegram_sender.collection[current_index];
        }
        
    }
    console.log("using controller ",null)
    telegram_sender.iterator = null;
    return telegram_sender.collection[current_index];
}

async function getSessionByPhone(phone){
    let db_session = await api.MtprotoPhones.findOne({where:{
        phone: {
            [Op.like]: '%'+phone +'%'
        }
    }})

    if(!db_session){
        console.log("SO SUCH DB SESSION")
        return null;
    }
      

    for(let i=0; i< telegram_sender.collection.length; i++){
    
        if(telegram_sender.collection[i].phone === db_session.phone){
            console.log('using controller ',i)
            return telegram_sender.collection[i];
        }
        
    }
    return null;
}

async function setCodeHashToSession(phone, new_val){
    let db_session = await api.MtprotoPhones.findOne({where:{
        phone: {
            [Op.like]: '%'+phone
        }
    }})
    if(!phone)
        return null;

    for(let i=0; i< telegram_sender.collection.length; i++){
    
        if(telegram_sender.collection[i].phone === db_session.phone){
            telegram_sender.collection[i].global_phone_code_hash = new_val;
            return ;
        }
        
    }
    return null;
}
async function sendCodeToPhone(phone){
    let session = await getSessionByPhone(phone);
    if(!session)
        return;

    try{
        let result = await sendCode(session.phone);
        console.log("result sendCodeToPhone ",result)
        setCodeHashToSession(session.phone, result.phone_code_hash);
      
    } catch(e){
        console.log('sendCode error ',e)
    }
    return;
}

async function signInWithPhone(phone, code){

    let session = await getSessionByPhone(phone);
    if(!session)
        return;

    try{
       
        let res = await signIn({ code, phone: session.phone, phone_code_hash:session.global_phone_code_hash || '' });
        console.log("result signInWithPhone ",res)
    } catch(e){
        console.log(e)
        return e;
    }
    
}

async function sendCode(phone) {
    
    let session = await getSessionByPhone(phone);
    if(!session)
        return;

    try{
        return session.mtproto.call("auth.sendCode", {
            phone_number: session.phone,
            settings: {
              _: "codeSettings",
            },
          });
    } catch(e){
       condole.log(e)
       return null;
    }
    
}
async function signIn({ code, phone, phone_code_hash }) {
    
    let session = await getSessionByPhone(phone);
    if(!session)
        return;


    return session.mtproto.call("auth.signIn", {
      phone_code: code,
      phone_number: phone,
      phone_code_hash: phone_code_hash,
    });
  }

async function sessionStatus(phone){
    let db_session = await api.MtprotoPhones.findOne({where:{
        phone: {
            [Op.like]: '%'+phone+'%'
        }
    }})
    if( !db_session ){
        console.log("no session in db")
        return false;
    }
       

    for(let i=0; i<telegram_sender.collection.length; i++ ){
        //console.log()
        if(telegram_sender.collection[i].phone===db_session.phone){
            try {
                let result = await telegram_sender.collection[i].mtproto.call("account.getAuthorizations");
                
                telegram_sender.collection[i].status = true;
                return true;
               }catch(e){
                console.log("no session err ",e)
                telegram_sender.collection[i].status = false;
                return false;
               }
        }
    }
    console.log("no session end")
    return false;
}


var exports = module.exports = {};
exports.currentMtproto = currentMtproto;
exports.loadSessions = loadSessions;
exports.sendCodeToPhone = sendCodeToPhone;
exports.sessionStatus = sessionStatus;
exports.signInWithPhone = signInWithPhone;
