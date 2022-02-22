const express        = require('express'),
      router         = express.Router(),
      SibApiV3Sdk    = require('sib-api-v3-sdk');

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;

router.get('/', function(req, res, next) {
  res.render('sendinbluetest', { title: 'Express' });
});

router.get('/send', function(req, res, next) {
////////////////////////////////////////////////////////////////////////////////
  let emailSettings = {
    senderEmail : 'waldteufel@ukr.net',
    senderName  : 'Жабка',
    // userEmail   : 'zhabka.4ek@gmail.com',
    // userEmail   : 'nigatif1991@gmail.com',
    userEmail   : 'vadim405120@gmail.com',
    userName    : 'vadim',
  };

  let emailOptions = {
    messageSubject : 'Заявка№ 48264096178547372',
    messageNumber  : '48264096178547372',
    messageDate    : '2022-01-12 23:12',
    clientName     : 'Вася Пупкін',
    clientPhone    : '+380662613020',
    messageText    : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    staticFilesSrc : 'http://wtwt.pp.ua/temp/',
  };

  res.status(200).render('feedback.pug', emailOptions, function(err, html){
    if (err) throw err;
    // res.send(html);
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
      {
        'subject'     : emailOptions.messageSubject,
        'sender'      : {'email':emailSettings.senderEmail, 'name': emailSettings.senderName},
        'to'          : [{'email': emailSettings.userEmail, 'name': emailSettings.userName}],
        'htmlContent' : html
      }
    )
    .then(res => {
      // do something if ok
      console.log(res);
    })
    .catch(err => console.error(err));
  });
////////////////////////////////////////////////////////////////////////////////
});

module.exports = router;