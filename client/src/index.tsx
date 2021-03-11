import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        ),
    );

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

    ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <Elements stripe={stripePromise}>
                        <App />
                    </Elements>
                </BrowserRouter>
            </Provider>,
        document.getElementById('root')
    );
