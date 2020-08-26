const nodemailer = require('nodemailer')
exports.sendMailerFunction = (url) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    })
    const mailOption = {
        form: process.env.OWNEREMAIL,
        to: process.env.RECEIVEReMAIL,
        Subject: 'Fundoo notes reset password',
        Text :'Your email verification link : \n\n'+url
    }
    transporter.sendMail=(mailOption, (err, info)=>{
        err ? console.log("err occur while sending mail", err) : console.log("resultr found while sending mail", info);  
    })
}