require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { timesByWords, dayToString } = require('./dateTime');

let baseURL = 'http://localhost:3000/review/';
if (process.env.NODE_ENV === 'production') baseURL = 'https://db-clockware.herokuapp.com/review/';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSGEmail = order => {

    const msg = {
        to: order.clientEmail, // Change to your recipient
        from: 'kodevtm@gmail.com', // Change to your verified sender
        subject: 'Резерв на ремонт часов',
        // text: 'text',
        html: `
            <h1>Уважаемый(ая) ${order.clientName}!</h1>
            <h2>Мастер ${order.masterName}</h2>
            <h2>ждет Вас</h2>
            <h2>${dayToString(order.date)} в ${order.time}</h2>
            <p>Ремонт Ваших часов займет ${timesByWords(order.hours)}</p>
            <p>.</p>
            <p>Что бы оценить работу Мастера и оставить отзыв нажмите кнопку:</p>
            <form action="${baseURL}${order.id}">
                <button type="submit">Оставить отзыв</button>
            </form>
            <p>или перейдите по ссылке:<a href="${baseURL}${order.id}">${baseURL}${order.id}</a></p>
            <p>.</p>
            <p>С уважением коллектив Clockware</p>
            <p> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
        `,
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent', order.clientEmail);
        })
        .catch((error) => {
            console.error(error)
        })
};

module.exports = sendSGEmail;