import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventShowMore from '../../component/Calendar/EventShowMore';

const localizer = momentLocalizer(moment);

export type TEvent = {
    title: string
    start: Date,
    end: Date,
    allDay?: boolean
    resource?: any,
}

const myEventsList = [
    {
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
        start: new Date(2021, 2,21, 12),
        end: new Date(2021, 2,21, 14),
    },{
        id: 3,
        title: '7777777777',
        start: new Date(2021, 2,22, 10),
        end: new Date(2021, 2,22, 11),
    },
];

const Schedule: React.FC = (props) => {

    const [showMore, setShowMore] = useState(false);
    const [selectEvent, setSelectEvent] = useState<TEvent>();

    const closeShowMore = () => {
        setShowMore(false)
    };

    const openShowMore = (event) => {
        setSelectEvent(event);
        console.log('openShowMore', event);

        setShowMore(true);
    };


    return (
        <div>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                step={60}
                onSelectEvent={openShowMore}
                defaultView={Views.WEEK}
            />
            {showMore && <EventShowMore
                open={showMore}
                event={selectEvent as TEvent}
                closeShowMore={closeShowMore}
            />}
        </div>
    );
};

export default Schedule;