import React from 'react';

const Calendar: React.FC = (props) => {

    const calendarURL = `https://calendar.google.com/calendar/embed?src=${process.env.REACT_APP_CALENDAR_URL}&ctz=Europe%2FKiev`;
    console.log('Calendar/calendarURL', calendarURL);
    return (
        <React.Fragment>
            <p>CALENDAR</p>
            <iframe
                title='calendar'
                src={calendarURL}
                style={{border: 0, width: "800px", height: "600px"}} frameBorder="0" scrolling="no"
            />
        </React.Fragment>
    );
};

export default Calendar;