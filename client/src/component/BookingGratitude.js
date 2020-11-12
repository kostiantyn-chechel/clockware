import React from 'react';
import Typography from '@material-ui/core/Typography';
import {hoursByWords} from '../helpers/dateTime';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(3),
    },
}));

function BookingGratitude(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography component="h1" variant="h4" align="center" color="textPrimary">
                Спасибо за Ваш заказ!
            </Typography>
            <Typography className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                Мастер {props.masterName} ждет Вас
            </Typography>
            <Typography className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                {props.date} в {props.time}
            </Typography>
            <Typography className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                Ремонт займет {hoursByWords(props.size)}
            </Typography>
            <Typography className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                Мы выслали напоминание о визите на Ваш email:  {props.email}
            </Typography>
        </React.Fragment>
    );
}

export default BookingGratitude;