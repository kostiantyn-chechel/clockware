import { Request, Response } from 'express'
const stripe = require('stripe')('sk_test_51IQVKzDEV8HqBraVoDtrdxzxTNnoFw2dZ2ob4IfJ53HWqt6d7X0i3XcZdyvYFu4JYKuLl6G8tExWTDQo1DUPpbrb00539jXToB');

exports.testStrip = async (req: Request, res: Response) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
        payment_method_types: ['card'],
        receipt_email: 'clockware77@gmail.com',
    });

    console.log('paymentIntent', paymentIntent);

    res.send(paymentIntent);
};

// app.post('/create-payment-intent', async(req, res) => {
//     const { items } = req.body;
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: 100, //calculateOrderAmount(items),
//         currency: 'eur'
//     });
//     res.send({
//         clientSecret: paymentIntent.client_secret
//     });
// });