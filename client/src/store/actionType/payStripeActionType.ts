export const GET_STRIPE_CLIENT_SECRET = 'GET_STRIPE_CLIENT_SECRET';
export const POST_CARD_PAYMENT_TOKEN = 'POST_CARD_PAYMENT_TOKEN';

export type PayStripeActionType =
    { type: typeof GET_STRIPE_CLIENT_SECRET, payload: any }|
    { type: typeof POST_CARD_PAYMENT_TOKEN, payload: any }
