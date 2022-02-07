module.exports = {
    mongo_host: 'mongodb://127.0.0.1:27017/4eck_test',
    amqp_host: 'amqp://localhost:5672',
    sms_gate:{
        prod:{
            host: 'https://api.turbosms.ua/message/send.json?token=3536285d312101836433eac3dc7706c995d5e53a',
            token: "3536285d312101836433eac3dc7706c995d5e53a",
            name: "4EK"
        },
        dev:{
            host: 'https://api.turbosms.ua/message/send.json?token=3536285d312101836433eac3dc7706c995d5e53a',
            token: "3536285d312101836433eac3dc7706c995d5e53a",
            name: "4EK"
        }
    },
    check_host:{
        dev:'https://dev.4ek.io/' ,
        prod:'https://4ek.io/' 
    },
    env: "prod", // dev / prod
    error_emails:{
        prod:['nigatif1991@gmail.com'],
        dev:['nigatif1991@gmail.com']
    },
    mysql:{
        connectionLimit : 100000,
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: '4ek'
    },
    mobile_jwt_secret:"MOBILE_JWT_SECRET",
    admin_jwt_secret:"ADMIN_JWT_SECRET",
    admin_bot_jwt_secret:"ADMINBOT_JWT_SECRET",
    mail: {
        host: "smtp.gmail.com",
        port: 465,
        username:"vanyatstester@gmail.com",
        password:"vanya123Tester",
    },
    mailer:{
        user: 'vanyatstester', 
        pass: 'vanya123Tester',
        email: 'vanyatstester@gmail.com'
    },
    aws_remote_db_config: {
        accessKeyId: 'AKIATNCHHYAK4UTN2JWV',
        secretAccessKey: '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',
        region: 'eu-central-1',
    },
    aws_remote_s3_config: {
        accessKeyId: 'AKIATNCHHYAKZJ3Q5YP5',
        secretAccessKey: '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',
        region: 'eu-central-1',
    }
};
