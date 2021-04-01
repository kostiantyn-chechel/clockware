import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CalendarMasterList from './CalendarMasterList';
import { getCalendarMasterList, getCalendarMasterOrders } from '../../store/actions/calendarAction';
import IStore from '../../type/store/IStore';
import { ICalendarEvents, ICalendarMaster } from '../../interfaces';
import { orderTimeCheck } from '../../helpers/calendar';

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
        marginTop: theme.spacing(3),
    }
}));

const CalendarAdd: React.FC = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {order, masterList, masterOrders} = useSelector(({calendar}:IStore) => calendar);

    const [orders, setOrders] = useState<ICalendarEvents[]>([]);
    const [selectMasterId, setSelectMasterId] = useState(masterMaxRetingId(masterList));


    useEffect(() => {
        console.log('orders', masterOrders);
        const orders = masterOrders.map(order => {
            return {
                ...order,
                start: new Date(order.start),
                end: new Date(order.end),
            }
        });
        setOrders(orders);
    },[masterOrders]);

    useEffect(() => {
        if (masterList.length) {
            setSelectMasterId(masterMaxRetingId(masterList))
        }
    },[masterList]);

    /* eslint-disable */
    useEffect(() => {
        dispatch(getCalendarMasterList(order.cityId))
    },[]);

    useEffect(() => {
        console.log('selectMasterId', selectMasterId);
        if (selectMasterId) dispatch(getCalendarMasterOrders(selectMasterId));
    }, [selectMasterId]);
    /* eslint-enable */

    const handleSelectMaster = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        event.preventDefault();
        setSelectMasterId(+value);
    };

    const handleChooseTime = (event) => {
        // console.log('action', event.action);
        // console.log('start', event.start);
        // console.log('end', event.end);
        // console.log('size', order);
        // console.log('size', order.size);
        // console.log('masterId', selectMasterId);
        const aaa = orderTimeCheck(event.start, order.size, masterOrders);
        console.log('aaa', aaa);
        if (aaa) {
            console.log('YES')
        } else {
            console.log('NOT')
        }

        // console.log(orderTimeCheck(event.start, order.size, masterOrders));

    };

    const masterListBlock = () => {
      if (selectMasterId) return (
          <CalendarMasterList
              masterList={masterList}
              defaultMasterId={masterMaxRetingId(masterList)}
              handleSelectMaster={handleSelectMaster}
          />
      )
    };

    return (
        <Container component="main" maxWidth="xl">

            {masterListBlock()}

            <div className={classes.calendar}>
                <Calendar
                    selectable
                    localizer={localizer}
                    events={orders}
                    startAccessor="start"
                    endAccessor="end"
                    step={60}
                    onSelectSlot={handleChooseTime}
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
        }
    });

    return maxId
};