const res = require("express/lib/response");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")

require('dotenv').config();

const app_name = 'trendify-project'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:3000/' + route;
    }
}

const passwordReset = (userID, name, toEmail, passwordResetToken) => {
    
    const templateSrc = fs.readFileSync(path.join(__dirname, "./templates/resetPassword.hbs"), "utf8")

    try {
        var actionUrl = buildPath("resetPassword")  + "/" + userID + "/" + passwordResetToken;

        const emailTransporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
               user: process.env.USER,
               pass: process.env.PASS
            },
            from: process.env.USER, 
            debug: false,
            logger: true
        });
    
        var mailOptions;

        const template = handlebars.compile(templateSrc);

        const htmlToSend = template({
            name: name,
            action_url: actionUrl
        });
    
        mailOptions = {
            from: "Trendify Authentication <Trendifyapp.auth@gmail.com",
            to: toEmail,
            subject: "Trendify: Reset your password",
            html: htmlToSend
        };
    
        emailTransporter.sendMail(mailOptions, function(error, response) {
            if(error) {
                console.log("Transport sendmail does not work");
            }
            else console.log(`Email verification sent to ${toEmail}`);
        });    

    } catch(error) {
        console.log(error);
    }
}

module.exports = passwordReset;