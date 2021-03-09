import { Request, Response } from 'express'
const stripe = require('stripe')('sk_test_51IQVKzDEV8HqBraVoDtrdxzxTNnoFw2dZ2ob4IfJ53HWqt6d7X0i3XcZdyvYFu4JYKuLl6G8tExWTDQo1DUPpbrb00539jXToB');

// exports.testStrip = async (req: Request, res: Response) => {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: 1000,
//         currency: 'usd',
//         payment_method_types: ['card'],
//         receipt_email: 'clockware77@gmail.com',
//     });
//
//     console.log('paymentIntent', paymentIntent);
//
//     res.send(paymentIntent);
// };

exports.getClientSecret = async (req: Request, res: Response) => {
    const body = req.body;
    const options = {
        ...body,
        amount: 2222,
        currency: 'USD',
    };

    try {
        const paymentIntent = await stripe.paymentIntents.create(options);
        console.log(paymentIntent.client_secret);
        res.json(paymentIntent.client_secret);
    } catch (err) {
        res.json(err);
    }
};



exports.postPayment = (req: Request, res: Response) => {
    console.log('token:',req.body.token.id);
    const token = req.body.token.id;

    stripe.
    stripe.charge.create(
        {
            amount: 2300,
            currency: 'usd',
            source: token,
            description: `Payment for Test`,
            metadata: {
                productId: '01'
            }
        },
        function(err, charge) {
            if(err) {
                // new Error("Payment Failed")
                console.log("Payment Failed", err);
                res.send(err);
            }
            else {
                console.log("Payment Success", charge);
                res.send(charge);
            }
        }
    )
};
