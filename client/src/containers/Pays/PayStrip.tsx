import React from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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


const CheckoutForm = () => {
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {error, paymentMethod} = await stripe!.createPaymentMethod({
            type: 'card', // @ts-ignore
            card: elements!.getElement(CardElement),
        });


        const clientSecret = (client_secret: string) => {
            console.log('sss', client_secret)
        };

        // @ts-ignore
        const paymentResult = await stripe!.confirmCardPayment(clientSecret, {
            payment_method: {
                // @ts-ignore
                card: elements!.getElement(CardElement),
            },
        });

        console.log('paymentMethod', paymentMethod, 'error', error);
        console.log('paymentResult', paymentResult);
    };

    return (
            <Container className={classes.main} component="main" maxWidth="xs">
                <Typography component="h1" variant="h5" align="center" color="textPrimary">
                    Оплата заказа:
                </Typography>

            <form onSubmit={handleSubmit} className={classes.form}>
                <CardElement
                    options={options}
                />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
                {/*<Button*/}
                {/*    type='submit'*/}
                {/*    color='primary'*/}
                {/*    className={classes.submit}*/}
                {/*    size='large'*/}
                {/*>*/}
                {/*    Pay*/}
                {/*</Button>*/}

            </form>

    </Container>

);
};

const PayStrip = () => {
    return (
        <CheckoutForm />
    );
};

export default PayStrip;