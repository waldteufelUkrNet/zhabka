var nodemailer = require("nodemailer");
var config = require("../config");

function sendNewPasswordEmail(email, password) {
    return new Promise((resolve, reject) =>{
        let transporter = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            auth: {
                user: config.mail.username,
                pass: config.mail.password
            }
        });

        let mailOptions = {
            from: "4ek. Восстановление пароля <" + config.mail.username + ">",
            to: email,
            subject: 'Новый пароль'
        };

        mailOptions['html'] = '<div>Пароль изменен на "' + password + '"</div>';
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

var exports = module.exports = {};
exports.sendNewPasswordEmail = sendNewPasswordEmail;
