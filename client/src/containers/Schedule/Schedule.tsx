import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventShowMore from '../../component/Calendar/EventShowMore';
import IStore from '../../type/store/IStore';
import { ICalendarEvents } from '../../interfaces';
import Button from '@material-ui/core/Button';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

const Schedule: React.FC = (props) => {
    const classes = useStyles();

    const [orders, setOrders] = useState<ICalendarEvents[]>([]);

    const orderList = useSelector(({calendar}: IStore) => calendar.masterOrders);
    const id = useSelector(({auth}: IStore) => auth.user.id);
    const name = useSelector(({auth}: IStore) => auth.user.name);
    const login = useSelector(({auth}: IStore) => auth.user.login);

    useEffect(() => {
        const orders = orderList.map(order => {
            return {
                ...order,
                start: new Date(order.start),
                end: new Date(order.end),
            }
        });
        setOrders(orders);
    }, [orderList]);


    const [showMore, setShowMore] = useState(false);
    const [selectEvent, setSelectEvent] = useState<ICalendarEvents>();

    const closeShowMore = () => {
        setShowMore(false)
    };

    const openShowMore = (event) => {
        setSelectEvent(event);
        setShowMore(true);
    };

    return (
        <Container component="main" maxWidth="xl">
            <div className={classes.orders}>
                <div className={classes.title}>
                    <h1>{`(${id}): ${name} (${login}) `}</h1>
                    <Button
                        className={classes.button}
                        color='primary'
                        variant='contained'
                        startIcon={<AssignmentIcon/>}
                        component={Link}
                        to='/cabinet'
                    >
                        Кабинет
                    </Button>
                </div>


                <div className={classes.calendar}>
                    <Calendar
                        localizer={localizer}
                        events={orders}
                        startAccessor="start"
                        endAccessor="end"
                        step={60}
                        onSelectEvent={openShowMore}
                        defaultView={'week'}
                        style={{ height: 600, width: '100%' }}
                    />
                    {showMore && <EventShowMore
                        open={showMore}
                        event={selectEvent!}
                        closeShowMore={closeShowMore}
                    />}
                </div>

            </div>
        </Container>
    );
};

export default Schedule;