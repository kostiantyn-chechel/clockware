import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { postServerRequest, getServerRequest } from '../../helpers/axios/axiosClockware';
import CircularProgress from '@material-ui/core/CircularProgress';

const LOGO_PHOTO = `${process.env.PUBLIC_URL + '/logo_blue.png'}`;
const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    ratingBox: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(4),
        alignItems: 'center',
    },
    rating: {
        marginTop: theme.spacing(2),
    },
    review: {
        marginTop: theme.spacing(2),
    },
    logoBloc: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px',
    },
    logo: {
        height: '200px',
        weight: '200px',
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '150px',
    },
}));

function Review(props) {
    const {match} = props;
    const classes = useStyles();
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState('');
    const [view, setView] = useState('');

    const URL= `/rev?orderId=${match.params.id}`;
    /* eslint-disable */
    useEffect(() => {
        getServerRequest(URL).then(res => setView(res))
    },[]);
    /* eslint-enable */

    const sendReview = event => {
        event.preventDefault();
        setView('');
        postServerRequest('/rev', {
            orderId: match.params.id,
            rating: rating ? rating : 3,
            review: review
        })
            .then(() => setView('success'));
    };

    const OtherStatuses = ({message}) => {
        return (
            <>
                <div className={classes.logoBloc}>
                    <img src={LOGO_PHOTO} className={classes.logo} alt=''/>
                </div>

                <Typography component="h1" variant="h5" align="center" color="textPrimary">
                    {message}
                </Typography>
            </>
        )
    };

    const pageReview = () => {
        switch (view) {
            case 'review':
                return (
                    <>
                        <Typography component="h1" variant="h5" align="center" color="textPrimary">
                            Оставьте отзыв и поставьте оценку Мастеру по выполнению Вашего заказа #{match.params.id}
                        </Typography>

                        <TextField
                            className={classes.review}
                            onChange={event => setReview(event.target.value)}
                            name="review"
                            variant="outlined"
                            multiline
                            rows={10}
                            required
                            fullWidth
                            id="review"
                            label="Ваш отзыв"
                            autoFocus
                        />

                        <div className={classes.ratingBox}>
                            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                                Поставьте оценку Мастеру: {rating}
                            </Typography>
                            <Rating className={classes.rating}
                                    defaultValue={3}
                                    name="rating"
                                    size="large"
                                    onChange={(event, newValue) => setRating(newValue)}
                            />
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            size="large"
                            onClick={sendReview}
                        >
                            Отправить отзыв
                        </Button>
                    </>
                );
            case 'success':
                return (
                    <OtherStatuses message='Спасибо за Ваш отзыв и оценку!'/>
                );
            case 'completed':
                return (
                    <OtherStatuses message='Вы уже оставили отзыв и оценку ранее!'/>
                );
             case 'no entry':
                return (
                    <OtherStatuses message='Извините, Вы не можете оставить отклик!'/>
                );
            default:
                return (
                    <div className={classes.loader}>
                        <CircularProgress />
                    </div>

                )
        }
    };

    return (
        <Container className={classes.main} component="main" maxWidth="xs">
            {pageReview()}
        </Container>
    );
}

export default Review;