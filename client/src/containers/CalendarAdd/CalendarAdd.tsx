import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import CalendarMasterList from './CalendarMasterList';
import { getCalendarMasterList } from '../../store/actions/calendarAction';
import IStore from '../../type/store/IStore';
import { ICalendarMaster } from '../../interfaces';

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
    const dispatch = useDispatch();

    // const order = useSelector(({calendar}:IStore) => calendar.order);
    const {order, masterList} = useSelector(({calendar}:IStore) => calendar);

    const [selectMasterId, setSelectMasterId] = useState(masterMaxRetingId(masterList));


    useEffect(() => {
        console.log('order', order);
    },[order]);

    useEffect(() => {
        console.log('order22', order);
        dispatch(getCalendarMasterList(order.cityId))
    },[]);

    const handleSelectMaster = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        event.preventDefault();
        console.log(value);
        // setOrder({...order, masterId: +value})
    };

    return (
        <Container component="main" maxWidth="xl">


            <CalendarMasterList
                masterList={masterList}
                handleSelectMaster={handleSelectMaster}
            />

            <div className={classes.calendar}>
                <Calendar
                    selectable
                    localizer={localizer}
                    events={orders}
                    startAccessor="start"
                    endAccessor="end"
                    step={60}
                    onSelectSlot={event => console.log(event)}
                    defaultView={'week'}
                    style={{ height: 600, width: '100%' }}
                />
            </div>
        </Container>
    );
};

export default CalendarAdd;

const masterMaxRetingId = (masterList: ICalendarMaster[]): number => {
    let maxId = 0;
    let maxRating = 0;

    masterList.forEach((master) => {
        if (master.rating > maxRating) {
            maxId = master.id;
            maxRating = master.rating;
            console.log(maxId, maxRating);
        }
    });

    return maxId

};