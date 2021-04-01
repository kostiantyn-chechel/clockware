import React from 'react';
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import { dayToString, hoursToWords } from '../../helpers/dateTime';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IStore from '../../type/store/IStore';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(3),
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
}));

const BookingCalendarGratitude:React.FC = (props) => {

    const classes = useStyles();

    const {masterName, date, time, size, email} = useSelector(({ calendar }: IStore) => calendar.newOrder);

    return (
        <Container className={classes.main} component="main" maxWidth="xs">
            <Typography component="h1" variant="h4" align="center" color="textPrimary">
                Спасибо за Ваш заказ!
            </Typography>
            <Typography className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                Мастер {masterName} ждет Вас
            </Typography>
            <Typography className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                {dayToString(date)} в {time}
            </Typography>
            <Typography className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                Ремонт займет {hoursToWords('' + size)}
            </Typography>
            <Typography className={classes.text} component="h2" variant="h5" align="center" color="textPrimary">
                Мы выслали напоминание о визите на Ваш email: {email}
            </Typography>
        </Container>
    );
};

export default BookingCalendarGratitude;