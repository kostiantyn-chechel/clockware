import { IEventForCalendar, IOrderForCalendar } from '../../Type/interfaces';
import { hoursToWords, sizeByNumber } from '../../client/src/helpers/dateTime';
import { eventDateWithTime } from '../dateTime';
const { google } = require('googleapis');
const db = require('../../models');
const Order = db.orders;
const User = db.users;
const City = db.cities;

const CALENDAR_ID = process.env.CALENDAR_ID;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY!.replace(/\\n/g, '\n');

const SCOPE_CALENDAR = 'https://www.googleapis.com/auth/calendar';
const SCOPE_EVENTS = 'https://www.googleapis.com/auth/calendar.events';


export const addOrderToCalendar = async (orderId: number) => {
    const order = await orderForCalendarById(orderId);
    console.log('order', order);
    const event = orderToEvent(order);
    const calendar = google.calendar('v3');
    try {
        const auth = await authenticate();
        await calendar.events.insert({
            auth: auth,
            calendarId: CALENDAR_ID,
            resource: event,
        });
        console.log('Add order:', order.id)
    } catch (e) {
        console.log('Error!!!!!!: \n ' + e);
    }
};

const authenticate = async () => {
    // @ts-ignore
    const jwtClient = new google.auth.JWT(
        CLIENT_EMAIL,
        null,
        PRIVATE_KEY,
        [SCOPE_CALENDAR, SCOPE_EVENTS]
    );
    await jwtClient.authorize();
    return jwtClient;
};

export const orderToEvent = (order: IOrderForCalendar): IEventForCalendar => ({
    summary: `Мастер: ${order.order_master.name} Заказ #${order.id}`,
    location: order.order_city.name,
    description: `
        <h1>Заказ #${order.id}</h1>
        <h3>Мастер: ${order.order_master.name}</h3>
        <h3>Заказчик: ${order.order_user.name}</h3>
        <p>Размер часов: ${sizeByNumber(order.hours)}</p>
        <p>Время работы: ${hoursToWords('' + order.hours)}</p>
        <a href=${order.photoURL} target="_blank">Фото</a>
        `,
    start: {
        // @ts-ignore
        dateTime: new Date(eventDateWithTime(order.date, order.time)),
        timeZone: 'Europe/Kiev',
    },
    end: {
        // @ts-ignore
        dateTime: new Date(eventDateWithTime(order.date, order.time, order.hours)),
        timeZone: 'Europe/Kiev',
    },
    colorId: order.order_master.colorId,
});

export const orderForCalendarById = async (orderId: number): Promise<IOrderForCalendar> => {
    return await Order.findAll({
        where: {
            id: orderId,
        },
        attributes: ['id', 'date', 'time', 'hours', 'photoURL'],
        include: [{
            model: City,
            as: 'order_city',
            attributes: ['name'],
        }, {
            model: User,
            as: 'order_master',
            attributes: ['name', 'colorId'],
        }, {
            model: User,
            as: 'order_user',
            attributes: ['name'],
        }],
    });
};
