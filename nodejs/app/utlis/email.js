const nodemailer = require('nodemailer');

const sendMail = async (subject, text, html, receipentEmails) => {
    const mailOptions = {
        from: 'Harikrishna220819@gmail.com',
        to: receipentEmails, 
        subject: subject, 
        text: text, 
        html: html 
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        }
        response=error;
        console.log('Message sent: ' + info.response);
        return info
    });
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'Harikrishna220819@gmail.com',
        pass: 'vVpIXrKbKK&8@sLo0&T66GDI'
    }
});

module.exports = {
    sendMail
}