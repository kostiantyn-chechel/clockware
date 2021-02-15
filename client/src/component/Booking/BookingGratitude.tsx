import React from 'react';
import Typography from '@material-ui/core/Typography';
import { hoursToWords } from '../../helpers/dateTime';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(3),
    },
}));

export interface IBookingGratitude {
    masterName: string,
    date: string,
    time: string,
    size: string,
    email: string,
}

const BookingGratitude:React.FC<IBookingGratitude> = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography component="h1" variant="h4" align="center" color="textPrimary">
                Спасибо за Ваш заказ!
            </Typography>
            <Typography id={'gr-master'} className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                Мастер {props.masterName} ждет Вас
            </Typography>
            <Typography id={'gr-time'} className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                {props.date} в {props.time}
            </Typography>
            <Typography id={'gr-hours'} className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                Ремонт займет {hoursToWords(props.size)}
            </Typography>
            <Typography id={'gr-email'} className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                Мы выслали напоминание о визите на Ваш email:  {props.email}
            </Typography>
        </React.Fragment>
    );
}

export default BookingGratitude;