import React, { useState, useEffect } from 'react';
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import DatePickers from "./DatePickers";
import TimePickers from "./TimePickers";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Warning from "../Warning";
import { dateToString } from "../../helpers/dateTime";

const useStyles = makeStyles((theme) => ({
    time: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    label: {
        margin: theme.spacing(1, 0, 0, 2),
    },
}));

interface IDateTimePickers {
    handleSelectDate(date: string): void,
    handleSelectTime(time: string): void,
}

const DateTimePickers: React.FC<IDateTimePickers> = (props) => {
    const classes = useStyles();

    const today = new Date();
    const nowTime = today.getHours() + 1;
    today.setHours(nowTime,0,0);


    const [choiceDataTime, setChoiceDataTime] = useState<Date>(today);
    const [valid, setValid] = useState(true);

    /* eslint-disable */
    useEffect(() => {
        if (choiceDataTime >= today) {
            setValid(true);
            props.handleSelectDate(dateToString(choiceDataTime));
            props.handleSelectTime(choiceDataTime.getHours() + ':00')
        } else {
            setValid(false);
        }
    },[choiceDataTime]);
    /* eslint-enable */

    const selectDay = (event: React.ChangeEvent<{ value: string; }>) => {
        event.preventDefault();
        const choiceDay = new Date(event.target.value);
        choiceDay.setHours(choiceDataTime.getHours(),0,0);
        setChoiceDataTime(choiceDay);
    };

    const selectTime = (event: React.ChangeEvent<{ value: string; }>) => {
        event.preventDefault();
        const choiceDay = new Date(choiceDataTime);
        choiceDay.setHours(+event.target.value.slice(0,2));
        setChoiceDataTime(choiceDay);
    };

    return (
        <React.Fragment>
            <FormLabel className={classes.label} component="legend">Укажите дату и время:</FormLabel>
            <Grid className={classes.time} item xs={12}>
                <Grid item xs={12} sm={6}>
                    <DatePickers
                        onChange={selectDay}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TimePickers
                        onChange={selectTime}
                    />
                </Grid>
            </Grid>
            <Warning valid={valid}>
                Выбранные дата и время уже прошли!
            </Warning>
        </React.Fragment>
    );
};

export default DateTimePickers;