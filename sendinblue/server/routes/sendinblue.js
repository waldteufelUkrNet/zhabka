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
    userEmail   : 'vadim405120@gmail.com',
    userName    : 'vadim',
  };

  let emailOptions = {
    billType       : 'canceled', // not_paid / paid / partially_paid / canceled
    billEndDate    : '04.02.2022 - 13:44',
    billNumber     : 'Wjhj873hjQ',
    userName       : 'Вернигородський-Синьовертий-Смазнов Едуард',
    userPhone      : '+380672207067',
    billImgSrc     : 'http://wtwt.pp.ua/temp/atlas.png',
    billHeader     : 'Atlas Weekend 2022',
    billDescription: 'Абонемент на 3 дні (8-10 липня) Кількість квитків 2, VIP-Standing на 1 день (9 липня) Кількість квитків 2, Абонемент VIP-Standing на 2 дні (7–8 липня) Кількість квитків 1',
    billPrice      : '₴ 17 102',
    bill1Sum       : '₴ 0,00',
    bill2Sum       : '₴ 17 102',
    staticFilesSrc : 'http://wtwt.pp.ua/temp/',
    subject        : 'Ваша квитанція'
  };

  res.status(200).render('email.pug', emailOptions, function(err, html){
    if (err) throw err;

    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
      {
        'subject'     : emailOptions.subject,
        'sender'      : {'email':emailSettings.senderEmail, 'name': emailSettings.senderName},
        'to'          : [{'email': emailSettings.userEmail, 'name': emailSettings.userName}],
        'htmlContent' : html
      }
    )
    .then(res => console.log(res))
    .catch(err => console.error(err));

  });
////////////////////////////////////////////////////////////////////////////////
});

module.exports = router;