const express = require('express');
const config = require('./config');
var indexRouter = require('./routes/index');
var api = require('./models/api.js');
var path = require('path');
const jwt = require('jsonwebtoken');
var adminRouter = require('./routes/ipay_frog/index');

const app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




app.use(async function (req, res, next) {
  const admin_token = req.headers['token'];
  const admin_bot_token = req.headers['b-token'];
  console.log(admin_token)

  console.log(admin_bot_token)
  if(admin_token) {
      jwt.verify(admin_token, config.admin_jwt_secret ,  async function(err, decoded){
          if(err)
              return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });
          
          req.input_user = {};
          if(decoded) {
              let adminData = await api.FrogAdmin.findOne({
                      where: {
                          email: decoded.email,
                          role: 'ADMIN'
                      }
                  });

              if(!adminData)
                  return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

              req.input_user.id = adminData.id;
              req.input_user.role = adminData.role;
          }
          
          req.input_user.user = decoded;
          next()
      });
  } else 
      next()
});

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT');
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
if ('OPTIONS' == req.method) {
    res.sendStatus(200);
}
else {
    next();
}
});


app.use('/', indexRouter);
app.use('/admin-api', adminRouter);


app.use(express.static(path.join(__dirname, 'frog_dist')));
app.use(express.static('frog_dist'));


app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frog_dist', 'index.html'));
});




const port = 3061;
app.use('/', indexRouter);
app.listen(port, () => {
   
});

