import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    CardElement,
    useStripe,
    useElements,
    PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { getStripeClientSecret } from '../../store/actions/payStripeAction';
import { TMashId } from '../../interfaces';
import IStore from '../../type/store/IStore';
import { getOrderById } from '../../store/actions/orderAction';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const PayStripe: React.FC<TMashId> = (props) => {
    const { match } = props;
    const orderId = match.params.id;

    const [processing, setProcessing] = useState(false);

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
                }
            },
            invalid: {
                color: "#9e2146"
            }
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
                    // name: 'test customer Name'
                    name: order.order_user.name,
                }
            },
        });

        if (payload.error) {
            console.log(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else if (payload.paymentIntent.status === 'succeeded') {
            console.log('paymentResult = succeeded');
            console.log('Metadata', payload.paymentIntent);
            setProcessing(false);
        }
    };

    return (
        <Container className={classes.main} component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Оплата заказа: {orderId}
            </Typography>

            <form onSubmit={handleSubmit} className={classes.form}>
                <CardElement
                    options={options}
                />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>

        </Container>
    );
};

export default PayStripe;