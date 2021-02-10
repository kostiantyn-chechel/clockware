import {IError} from "../Type/interfaces";
import {sizeByNumber} from "../client/src/helpers/dateTime";
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
// @ts-ignore
const { timesByWords, dayToString } = require('./dateTime');

let baseURL = 'http://localhost:3000/review/';
if (process.env.NODE_ENV === 'production') baseURL = 'https://db-clockware.herokuapp.com/review/';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSGEmail = (order: any) => {

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
        .catch((err: IError) => {
            console.error(err)
        })
};

const sendSGMasterReport = (master: any, orders: any[], date: string) => {
    // const recipient = 'kodevtm@gmail.com';
    const recipient = 'belka.elis@gmail.com';

    if (orders.length) {

        const msg = {
            // to: master.login, // Change to your recipient // for prod
            to: recipient, // Change to your recipient
            from: 'kodevtm@gmail.com', // Change to your verified sender
            subject: `Заказы для мастера ${master.name} на ${date}`,
            // text: 'text',
            html: `
            <h1>Уважаемый(ая) ${master.name}!</h1>
            <h2>У Вас на сегодня заказов: ${orders.length} </h2>
            <ol>
                ${orders.map(order => {
                return `<li>${order.time}, размер: ${sizeByNumber(order.size)}, клиент: ${order.client}</li>`
            })}
            </ol>
            
            <p>С уважением Clockware</p>
            <p> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
        `,
        };

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent master', master.name, ' to ', recipient);
                // console.log('Email sent master', master.login); // for prod
            })
            .catch((err: IError) => {
                console.error(err)
            })
    }
};

module.exports = {
    sendSGEmail,
    sendSGMasterReport,
};