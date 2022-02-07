
var request = require('request');
var axios = require('axios');
const qs = require('qs');
var rp = require('request-promise');
//var apiKey = 'AIzaSyD4to9Q7q1-FAAV0RFUpBr1t2K05nC4Lq4';
//var apiKey = 'AIzaSyAoNvNRdkmEPup-AdJqFAvIiLimxhpNQ00';
// var apiKey ='AIzaSyDInQxzgYJl9z3ZRxyf17eX0xo3ZYbHdB4';
var apiKey ='AIzaSyA5wpJGgWuLebLQnc5OHu97oGvD35Uk7e4';//'AIzaSyDWhA6kvCKO-4bseW6NFqBCiWhtm735MrQ'//'AIzaSyC6mQ9AI4Wez-kwo3fC-QKYjZYoIQjeuFY';
const YANDEX_TOKEN = '4b982829-dc4c-4d3e-895f-fb4674a9568d';

var parser = require('xml2json');
const moment = require('moment');
let async_request = require('async-request');
const { default: Axios } = require('axios');

async function getMap(order, executor, transport_type = "LEGS"){
    let start_time = moment();
    let resp_obj = {expected_time:0, path:null};


    let URL;
    if(transport_type === "LEGS")
    {
        URL = "https://maps.googleapis.com/maps/api/directions/json?mode=walking&key="+apiKey;
    }
    else //if(transport_type === "CAR")
    {
        URL = "https://maps.googleapis.com/maps/api/directions/json?mode=driving&key="+apiKey;
    }
    URL=URL+"&origin="+executor.lat+","+executor.lon+
    "&destination="+order.address.lat+","+order.address.lon;
    
    let response = await async_request(URL);
    response = JSON.parse(response.body);
    if(transport_type === "LEGS")
    {
        if(response.routes && response.routes[0] && response.routes[0].legs && response.routes[0].legs[0] && response.routes[0].legs[0].duration)
        {
            resp_obj.expected_time = 1000 * response.routes[0].legs[0].duration.value; //(изначально в секундах, теперь в миллисекунха)
            
        }
        else {
            let temp_dist = Math.round( distanceInKmBetweenEarthCoordinates(executor.lat, executor.lon, order.address.lat, order.address.lon ));
            
            resp_obj.expected_time = Math.round(temp_dist*20)*60*1000; // со скоростью 3 км в час (в миллисекунха)
        }
    }
    else if(transport_type === "CAR")
    {


        if(response.routes && response.routes[0] && response.routes[0].legs && response.routes[0].legs[0] && response.routes[0].legs[0].duration)
        {
            resp_obj.expected_time = 1000 * response.routes[0].legs[0].duration.value; //(изначально в секундах, теперь в миллисекунха)
            
        }
        else {
            let temp_dist = Math.round( distanceInKmBetweenEarthCoordinates(executor.lat, executor.lon, order.address.lat, order.address.lon ));
        
            resp_obj.expected_time = Math.round(temp_dist*60/40)*60*1000; // со скоростью 3 км в час (в миллисекунха)
           
        }
    }

    if(response.routes && response.routes[0] && response.routes[0].overview_polyline && response.routes[0].overview_polyline.points)
        resp_obj.path = response.routes[0].overview_polyline.points;

    resp_obj.expected_time = resp_obj.expected_time + 10*60*1000; //+ 10 min in milliseconds

    if(resp_obj.expected_time > 2147483646 )
        resp_obj.expected_time = 2147483646;


    var local_duration = moment.duration(moment().diff(start_time));
    var local_seconds = local_duration.asSeconds();
    

    return resp_obj;
}

var rad = function(x) {
    return x * Math.PI / 180;
};


//дистанция в метрах
function getDistance(p1, p2){
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lon - p1.lon);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}
//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=%2B61293744000&inputtype=phonenumber&fields=place_id&key=YOUR_API_KEY
async function getAutocompleteTest(text){

    //text = text.split(' ').join('+');
    //console.log(text)
    let URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key="+apiKey;
    URL=URL+"&input="+text;

    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    };

    var options = {
        url: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
        method: 'GET',
        headers: headers,
        qs: {
            key: apiKey,
            input: text,
            types: 'address',
            fields: 'formatted_address,name,place_id,geometry',
            //radius:"1",
            inputtype: "textquery",
            language: "uk"
        }
    };

    let resp =  await rp(options);

    return JSON.parse(resp);

}


async function getAutocompleteYandex(text){
    console.log("SEARCH STR ", text)
    let resp =  await rp( {
        url: "https://geocode-maps.yandex.ru/1.x/?apikey="+YANDEX_TOKEN+"&lang=uk_UA&geocode=" + encodeURI(text),
        method: 'GET'
    });

    try {
        let json = JSON.parse(parser.toJson(resp));

        let resData = [];
        if(json['ymaps'] && json['ymaps']['GeoObjectCollection'] && json['ymaps']['GeoObjectCollection']['featureMember']){
            let ya_data = json['ymaps']['GeoObjectCollection']['featureMember'];
            if(ya_data){
                if(!ya_data.length)
                    ya_data = [ya_data];

                for(let i=0;i<ya_data.length;i++){
                    // console.log('!!!!!!!!!!!!!!!!: ', JSON.stringify(ya_data[i]['GeoObject']));
                    if(
                        ya_data[i]['GeoObject'] &&
                        ya_data[i]['GeoObject']['metaDataProperty'] &&
                        ya_data[i]['GeoObject']['metaDataProperty']['GeocoderMetaData'] &&
                        ya_data[i]['GeoObject']['metaDataProperty']['GeocoderMetaData']['Address'] &&
                        ya_data[i]['GeoObject']['metaDataProperty']['GeocoderMetaData']['Address']['Component']
                    ){
                        let address_components = ya_data[i]['GeoObject']['metaDataProperty']['GeocoderMetaData']['Address']['Component'];
                        let geo  = ya_data[i]['GeoObject']['Point']['pos'].split(' ');

                        // console.log('address_components: ', address_components);

                        //console.log(ya_data[i]['GeoObject']['metaDataProperty']['GeocoderMetaData']['Address'])
                        let addrObject = {
                            lon: geo[0],
                            lat: geo[1],
                            formatted: ya_data[i]['GeoObject']['metaDataProperty']['GeocoderMetaData']['Address']['formatted'] || '',
                            area: null,
                            region: null,
                            city: null,
                            streat: null,
                            number: null
                        };

                        console.log(addrObject)
                        
                        for(let i=0;i<address_components.length;i++){
                            if(address_components[i].kind && address_components[i].kind === 'province'){
                                addrObject.area = address_components[i].name.replace('область', '').trim()
                            }
                            if(address_components[i].kind && address_components[i].kind === 'district'){
                                addrObject.region = address_components[i].name.replace('район', '').trim()
                            }
                            if(address_components[i].kind && address_components[i].kind === 'locality'){
                                addrObject.city = address_components[i].name.trim()
                            }
                            if(address_components[i].kind && address_components[i].kind === 'street'){
                                addrObject.streat = address_components[i].name.replace('вулиця', '').trim()
                            }
                            if(address_components[i].kind && address_components[i].kind === 'house'){
                                addrObject.number = address_components[i].name.trim()
                            }
                        }

                        resData.push(addrObject);
                    }
                }
            }
        }

        return resData;
    } catch (e) {
        console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE: ', e);
        console.log('resp: ', resp);
        return [];
    }
}

async function getAutocomplete(text){
    // console.log('0-------------010: ', apiKey);

    //text = text.split(' ').join('+');
    //console.log(text)
    let URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?key="+apiKey;
    URL=URL+"&input="+text;

    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }; 

    var options = {
        url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
        method: 'GET',
        headers: headers,
        qs: {
            //key: 'AIzaSyD4to9Q7q1-FAAV0RFUpBr1t2K05nC4Lq4',
            key: apiKey,
            input: text,
            //location: "47.977895,37.776187",
            types: 'address',
            //radius:"1",
            language: "uk"
        }
    };

   

    let resp =  await rp(options);
    //console.log(resp)
    return JSON.parse(resp);
    /*try{
        let resp =  await rp(options);
        //console.log(resp)
        return JSON.parse(resp);
    }
    catch(e){
        return { predictions:[] }; 
    }*/
   
    request(options, async function (error, response, body) {
        console.log("response ",response)
        response = JSON.parse(response.body);
        return response;
    });



}
async function getPlaceByPlaceId(place_id){
    var options = {
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        method: 'GET',
        
        qs: {
          key: 'AIzaSyDInQxzgYJl9z3ZRxyf17eX0xo3ZYbHdB4',
          place_id,
          language: "ru"
        }
      };

      var headers = {
        'user-agent':       'Super Agent/0.0.1',
        'content-type':     'application/x-www-form-urlencoded'
    };

    let resp =  await rp(options);
    //console.log(resp)
    return JSON.parse(resp);
}
async function getPlaceById(place_id){

 
    var headers = {
        'user-agent':       'Super Agent/0.0.1',
        'content-type':     'application/x-www-form-urlencoded'
    };
     // Configure the request
     var options = {
       url: "https://maps.googleapis.com/maps/api/geocode/json",
       method: 'GET',
       headers: headers,
       data: {
         key: apiKey,
         place_id,
         language: "ru"
       }
     };

     return await axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid='+ 
     item + '&key=MYAPIKEY')
     return await axios(options);

     // Start the request
     await request(options, async function (error, response, body) {
       response = JSON.parse(response.body);
 
         let srt_resp = null;
         if(response && response.results && response.results.length && response.results[0].formatted_address && response.results[0].geometry && response.results[0].geometry.location)
           {
               let main_text = "";
             let city = null;
             let region = null;
                   for(let i = 0; i< response.results[0].address_components.length; i++){
                       
                       if(response.results[0].address_components[i].types.indexOf("street_number")>=0 ||
                           response.results[0].address_components[i].types.indexOf("route")>=0
                           ){
                           if(main_text.length)
                               main_text=", "+main_text;
                           
                           main_text = response.results[0].address_components[i].long_name+main_text;
                       }
                 if(response.results[0].address_components[i].types.indexOf("administrative_area_level_2")>=0){
                   city = response.results[0].address_components[i].long_name;
                 }
                 if(response.results[0].address_components[i].types.indexOf("administrative_area_level_1")>=0){
                   region = response.results[0].address_components[i].long_name;
                 }
                   }
 
               if(!main_text.length){
                   main_text = response.results[0].formatted_address;
               }
               srt_resp = {description: main_text,
                           lat:response.results[0].geometry.location.lat,
                           lon: response.results[0].geometry.location.lng,
                   city,
                   region
                       };
 
           }

           console.log(srt_resp)
       
           if(srt_resp)
             return srt_resp;
            else
             return null;
     });
    
  
  
 
}


function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

async function getPlaceDetails(text) {


    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    };

    var options = {
        url: "https://maps.googleapis.com/maps/api/place/details/json?",
        method: 'GET',
        headers: headers,
        qs: {
            key: apiKey,
            place_id: text,
            language: "uk"
        }
    };


    let resp =  await rp(options);

    return JSON.parse(resp);
}


function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
}


async function reverseGeocode(lat, lon){
    var options = {
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        method: 'GET',
        
        qs: {
          key: 'AIzaSyDInQxzgYJl9z3ZRxyf17eX0xo3ZYbHdB4',
          latlng: lat+","+lon,
          language: "ru"
        }
      };

      var headers = {
        'user-agent':       'Super Agent/0.0.1',
        'content-type':     'application/x-www-form-urlencoded'
    };

    let resp =  await rp(options);
    //console.log(resp)
    return JSON.parse(resp);
}
var exports = module.exports = {};
exports.getMap=getMap;
exports.getAutocomplete=getAutocomplete;
exports.getAutocompleteTest = getAutocompleteTest;
exports.getDistance=getDistance;
exports.getPlaceById = getPlaceById;
exports.reverseGeocode = reverseGeocode;
exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlaceDetails = getPlaceDetails;
exports.getAutocompleteYandex = getAutocompleteYandex;