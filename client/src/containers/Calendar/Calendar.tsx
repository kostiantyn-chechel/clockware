import React from 'react';

const Calendar: React.FC = (props) => {

    return (
        <React.Fragment>
            <p>CALENDAR</p>
            <iframe
                src="https://calendar.google.com/calendar/embed?src=2nflp8pbppeoa1s3j9s5kqkmjg%40group.calendar.google.com&ctz=Europe%2FKiev"
                style={{border: 0, width: "800px", height: "600px"}} frameBorder="0" scrolling="no"
            />
        </React.Fragment>
    );
};

export default Calendar;