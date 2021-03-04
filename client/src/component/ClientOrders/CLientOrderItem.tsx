import React from 'react';
import { IClientOrder } from "../../interfaces";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Paper} from "@material-ui/core";
import { Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        minWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

type ClientOrderItemType = { order: IClientOrder }

const ClientOrderItem: React.FC<ClientOrderItemType> = (props) => {
    const { order: { id, date, time, hours, photoURL, cost, costStatus, order_master: {name: masterName}, order_city: {name: cityName},
    review}} = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt={'' + {id}} src={photoURL} />
                        </ButtonBase>
                    </Grid>

                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {`${date}  ${time} ${hours}`}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    {`Город: ${cityName}}`}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    {`Мастер: ${masterName}`}
                                </Typography>
                                { review ?
                                    <React.Fragment>
                                        <Typography gutterBottom variant="subtitle1">
                                            {`Оценка:  ${review.rating} Отзыв:`}
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1">
                                            {review.review}
                                        </Typography>
                                    </React.Fragment>
                                    : null
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid>
                        <Grid item xs container direction="column" spacing={2} alignItems={'flex-end'}>
                            <Typography gutterBottom variant="subtitle1">
                                {`# ${id}`}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">
                                {`COST: ${cost}`}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">
                                {`status: ${costStatus}`}
                            </Typography>
                            <Button color='inherit'
                                    component={Link}
                                    to={`/pay/${id}`}
                            >
                                ОПЛАТИТЬ
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>

        </div>
    );
};

export default ClientOrderItem;