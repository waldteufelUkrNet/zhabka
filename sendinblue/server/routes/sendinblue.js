const express        = require('express'),
      router         = express.Router();

var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sendinbluetest', { title: 'Express' });
});

router.get('/send', function(req, res, next) {
  res.status(200).send('start sending ...');
////////////////////////////////////////////////////////////////////////////////
console.log('here start to testing');


new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
  {
    'subject':'Hello from the Node SDK!',
    'sender' : {'email':'waldteufel@ukr.net', 'name':'Sendinblue'},
    'replyTo' : {'email':'waldteufel@ukr.net', 'name':'waldteufel'},
    'to' : [{'name': 'vadim', 'email':'vadim405120@gmail.com'}],
    'htmlContent' : '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
    'params' : {'bodyMessage':'Made just for you!'}
  }
).then(function(data) {
  console.log(data);
}, function(error) {
  console.error(error);
});

////////////////////////////////////////////////////////////////////////////////
});

module.exports = router;























// const express        = require('express'),
//       router         = express.Router(),

//       SibApiV3Sdk    = require('sib-api-v3-sdk'),
//       defaultClient  = SibApiV3Sdk.ApiClient.instance,
//       apiKey         = defaultClient.authentications['api-key'],
//       apiInstance    = new SibApiV3Sdk.EmailCampaignsApi(),
//       emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

// apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('sendinbluetest', { title: 'Express' });
// });

// router.get('/send', function(req, res, next) {
//   res.status(200).send('start sending ...');
// ////////////////////////////////////////////////////////////////////////////////
// console.log('here start to testing');

// emailCampaigns.name        = 'Campaign sent via the API';
// emailCampaigns.subject     = 'My subject';
// emailCampaigns.sender      = {'name': 'From name', 'email':'waldteufel@ukr.net'};
// emailCampaigns.type        = 'classic';
// emailCampaigns.htmlContent = 'Congratulations! Bla-bla-bla)';
// emailCampaigns.recipients  = {listIds: [2]};
// // emailCampaigns.scheduledAt = '2018-01-01 00:00:01';

// apiInstance.createEmailCampaign(emailCampaigns)
//            .then(function(data) {
//              console.log('API called successfully. Returned data: ' + JSON.stringify(data) );
//            }, function(error) {
//              console.error(error);
//            });

// ////////////////////////////////////////////////////////////////////////////////
// });

// module.exports = router;