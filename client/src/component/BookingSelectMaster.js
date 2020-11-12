import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import ListMasters from './ListMasters/ListMasters';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Warning from './Warning';
import MastersReview from './ListMasters/MastersReview';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    time: {
        display: 'flex',
        justifyContent: 'space-around',
    },
}));

function BookingSelectMaster(props) {
    const classes = useStyles();

    const [valid, setValid] = useState({allIsFull: true});

    const [review, setReview] = useState([]);
    const [reviewMasterName, setReviewMasterName] = useState([]);

    const handleSendOrder = event => {
        event.preventDefault();
        if (props.masterId) {
            props.handleSendOrder();
            setValid({...valid, allIsFull: true,})
        } else {
            setValid({...valid, allIsFull: false,})
        }
    };

    const handleMasterReview = masterId => {
        props.arrMasters.forEach(master => {
            if (master.id === masterId) {
                setReview(master.review);
                setReviewMasterName(master.name);
            }
        });
    };

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Доступны мастера:
            </Typography>
            <form className={classes.form} noValidate>

                <ListMasters
                    arrMasters={props.arrMasters}
                    onChange={props.handleSelectMaster}
                    handleMasterReview={handleMasterReview}
                />

                <Grid container className={classes.time} spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            size="large"
                            onClick={handleSendOrder}
                        >
                            Отправить заказ
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            size="large"
                            onClick={props.handleCancelBtn}
                        >
                            Отменить
                        </Button>
                    </Grid>
                </Grid>
                <Warning valid={valid.allIsFull}>
                    'Выберите мастера!'
                </Warning>
            </form>
            <MastersReview
                masterReviews={review}
                masterName={reviewMasterName}
            />
        </div>
    );
}

export default BookingSelectMaster;