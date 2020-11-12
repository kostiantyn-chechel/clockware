require('dotenv').config();
const nodemailer = require('nodemailer');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { timesByWords, dayToString } = require('./dateTime');

const linkURL = 'http://localhost:3000/review/';

async function sendEmails(order) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.REACT_APP_POST_NAME,
            pass: process.env.REACT_APP_POST_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: 'kodevtm@gmail.com',
        to: order.clientEmail,
        subject: 'Резерв на ремонт часов',
        html: createEmailBody(order),
    });
    console.log('Message sent: %s', info.messageId)
}

function createEmailBody(order) {
    const dom = new JSDOM(
        '<html>' +
        '<head></head>' +
        '<body></body>' +
        '</html>',
    );

    const div = dom.window.document.createElement('div');
    div.style.display = 'flash';
    div.innerHTML = `
        <h1>Уважаемый(ая) ${order.clientName}!</h1>
        <h2>Мастер ${order.masterName}</h2>
        <h2>ждет Вас</h2>
        <h2>${dayToString(order.date)} в ${order.time}</h2>
        <p>Ремонт Ваших часов займет ${timesByWords(order.hours)}</p>
        <br>
        <p>Что бы оценить работу Мастера и оставить отзыв, перейдите по ссылке:<a href="${linkURL}${order.id}">${linkURL}${order.id}</a>, или нажмите кнопку: </p>
        <input value="Оставить отзыв" type="button" onclick="location.href=${linkURL}${order.id}" />
        <br>
        <p>С уважением коллектив Clockware</p>
    `;

    return div.outerHTML;
}

module.exports = sendEmails;