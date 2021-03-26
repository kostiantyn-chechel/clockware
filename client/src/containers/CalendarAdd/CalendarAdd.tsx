import React from 'react';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
    orders: {
        width: '100%',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    calendar: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

const orders = [
    {
    title: '4444444',
    start: new Date(2021,2,24,10),
    end: new Date(2021,2,24,12),
    },{
        id: 1,
        title: 'TEST',
        start: new Date(2021, 2,22, 12),
        end: new Date(2021, 2,22, 14),
        tooltip: 'tooltip',
        popup: 'popup',
        lalala: 'lalala',
    },{
        id: 2,
        title: '555555555',
        start: new Date(2021, 2,24, 13),
        end: new Date(2021, 2,24, 15),
    },{
        id: 3,
        title: '7777777777',
        start: new Date(2021, 2,25, 10),
        end: new Date(2021, 2,25, 11),
    },
];

const CalendarAdd: React.FC = (props) => {
    const classes = useStyles();


    return (
        <Container component="main" maxWidth="xl">

            Calendar
            <div>
                выбор мастера
            </div>

            <div className={classes.calendar}>
                CALENDAR
                <Calendar
                    localizer={localizer}
                    events={orders}
                    startAccessor="start"
                    endAccessor="end"
                    step={60}
                    // onSelectEvent={openShowMore}
                    // defaultView={Views.WEEK}
                    defaultView={'week'}
                    style={{ height: 600, width: '100%' }}
                />
            </div>
        </Container>
    );
};

export default CalendarAdd;