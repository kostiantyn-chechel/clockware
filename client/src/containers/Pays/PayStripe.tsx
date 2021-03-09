import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {
    CardElement,
    useStripe,
    useElements,
    PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {changeOrderPayStatus, getStripeClientSecret} from '../../store/actions/payStripeAction';
import { TMashId } from '../../interfaces';
import IStore from '../../type/store/IStore';
import { getOrderById } from '../../store/actions/orderAction';
import {dayToString} from "../../helpers/dateTime";
import Button from "@material-ui/core/Button";
import {LinearProgress} from "@material-ui/core";
import SuccessMsg from "./SuccessMsg";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),
    },
    cardInput: {
        width: '100%',
        fontSize: '16px',
        paddingTop: '12px',
    },
    button: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    imgBlock: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: theme.spacing(5),
    },
    image: {
        width: 200,
        height: 200,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    rootProgress: {
        width: '100%',
        marginTop: 5,
        height: 10,
    },
}));

const PayStripe: React.FC<TMashId> = (props) => {
    const { match } = props;
    const orderId = match.params.id;
    let history = useHistory();

    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState('');

    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const [paymentRequest, setPaymentRequest] = useState(null);
    const options = {
        style: {
            base: {
                color: "#424770",
                letterSpacing: "0.025em",
                fontFamily: "Source Code Pro, monospace",
                "::placeholder": {
                    color: "#aab7c4"
                },
                fontSize: '16px',
                fontWeight: '500',
            },
            invalid: {
                color: "#9e2146"
            },
        }
    };

    const dispatch = useDispatch();
    const clientSecret = useSelector(({payStripe}:IStore) => payStripe.clientSecret);
    const order = useSelector(({order}:IStore) => order.order);


    useEffect(() => {
        dispatch(getStripeClientSecret(orderId));
        dispatch(getOrderById(orderId));
    }, []);

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Demo total',
                    amount: 1099,
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            pr.canMakePayment().then(result => {
                if (result) {
                    // @ts-ignore
                    setPaymentRequest(pr);
                }
            });
        }
    },[stripe]);

    if (paymentRequest) {
        // @ts-ignore
        return <PaymentRequestButtonElement options={{paymentRequest}} />
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);

        const payload = await stripe!.confirmCardPayment(clientSecret, {
            payment_method: {
                // @ts-ignore
                card: elements!.getElement(CardElement),
                billing_details: {
                    name: order.order_user.name,
                }
            },
        });

        if (payload.error) {
            console.log(`Payment failed ${payload.error.message}`);
            setMessage('Оплата не прошла. Ошибка!');
            setTimeout(() => {
                setMessage('');
            }, 1500);
            setProcessing(false);
        } else if (payload.paymentIntent.status === 'succeeded') {
            dispatch(changeOrderPayStatus(orderId, 1));
            setMessage('Оплата прошла успешно');
            setTimeout(() => {
                history.push('/client');
                setMessage('');
            }, 1000);
            setProcessing(false);
        }
    };

    return (
        <Container className={classes.main} component="main" maxWidth="xs">

            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Оплата заказа # {orderId}
            </Typography>
            <div className={classes.imgBlock}>
                <div className={classes.image}>
                    <img className={classes.img} alt={'' + {orderId}} src={order.photoURL} />
                </div>
            </div>

            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Дата заказа: {dayToString(order.date)}
            </Typography>

            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                К оплате: {order.cost}
            </Typography>

            <div className={classes.rootProgress}>
                {processing ? <LinearProgress /> : null}
            </div>

            <form onSubmit={handleSubmit} className={classes.form}>
                <CardElement
                    className={classes.cardInput}
                    options={options}
                />
                <Button
                    disabled={!stripe}
                    type='submit'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                >
                    ОПЛАТА
                </Button>

            </form>

            <SuccessMsg>
                {message}
            </SuccessMsg>

        </Container>
    );
};

export default PayStripe;