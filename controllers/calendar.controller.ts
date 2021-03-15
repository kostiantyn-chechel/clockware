import { Request, Response } from 'express';
const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const db = require("../models");

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CALENDAR_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const PROJECT_ID = process.env.PROJECT_ID;
const TOKEN_PATH = 'token.json';

exports.getCalendar = (req: Request, res: Response) => {

    const jwtClient = new google.auth.JWT(
        GOOGLE_CLIENT_EMAIL,
        null,
        GOOGLE_PRIVATE_KEY,
        SCOPES
    );

    const calendar = google.calendar({
        version: 'v3',
        project: GOOGLE_PROJECT_NUMBER,
        auth: jwtClient
    });

    calendar.events.list({
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (error, result) => {
        if (error) {
            res.send(JSON.stringify({ error: error }));
        } else {
            if (result.data.items.length) {
                res.send(JSON.stringify({ events: result.data.items }));
            } else {
                res.send(JSON.stringify({ message: 'No upcoming events found.' }));
            }
        }
    });

};

exports.getEvents = (req: Request, res: Response) => {
    fs.readFile('client_secret_googleusercontent.com.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), listEvents);
    });

    function authorize(credentials, callback) {
        // const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            // GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
            GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'https://localhost:3000');
            // client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    function getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error('Error retrieving access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }

    function listEvents(auth) {
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const events = res.data.items;
            if (events.length) {
                console.log('Upcoming 10 events:');
                events.map((event, i) => {
                    const start = event.start.dateTime || event.start.date;
                    console.log(`${start} - ${event.summary}`);
                });
            } else {
                console.log('No upcoming events found.');
            }
        });
    }

};

// const CALENDAR_ID = 'pa22mo11hc5k68j2qpipum8f3c@group.calendar.google.com';
const CALENDAR_ID = process.env.CALENDAR_ID;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY!.replace(/\\n/g, '\n');


const KEYFILE = 'clockware-test.json';
const SCOPE_CALENDAR = 'https://www.googleapis.com/auth/calendar';
const SCOPE_EVENTS = 'https://www.googleapis.com/auth/calendar.events';

exports.test = async (req: Request, res: Response) => {
    const readPrivateKey = async () => {
        const content = fs.readFileSync(KEYFILE);
        // console.log(JSON.parse(content.toString()));
        return JSON.parse(content.toString());
    };

    const authenticate = async (key) => {
        // @ts-ignore
        console.log('PRIVATE_KEY', PRIVATE_KEY);
        console.log('key.private_key', key.private_key);
        const jwtClient = new google.auth.JWT(
            CLIENT_EMAIL,
            null,
            // key.private_key,
            PRIVATE_KEY,
            [SCOPE_CALENDAR, SCOPE_EVENTS]
        );
        await jwtClient.authorize();
        return jwtClient;
    };

    const createEvent = async (auth) => {
        const event = {
            'summary': 'Clocware Test',
            'description': 'Тест2 заказ Clocware',
            'start': {
                'dateTime': '2021-03-18T15:00:00+02:00',
                'timeZone': 'Europe/Kiev',
            },
            'end': {
                'dateTime': '2021-03-18T16:00:00+02:00',
                'timeZone': 'Europe/Kiev',
            }
        };

        let calendar = google.calendar('v3');
        await calendar.events.insert({
            auth: auth,
            calendarId: CALENDAR_ID,
            resource: event,
        });
    };

    try {
        const key = await readPrivateKey();
        const auth = await authenticate(key);
        await createEvent(auth);
        res.send('All ok!!!')
    } catch (e) {
        console.log('Error!!!!!!: \n ' + e);
        res.send('Error: \n' + JSON.stringify(e));
    }

};
