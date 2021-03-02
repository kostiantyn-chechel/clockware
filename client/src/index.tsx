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
// import { initFacebookSdk } from './helpers/init-facebook-sdk';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

// initFacebookSdk().then(startApp);

const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        ),
    );

// function startApp() {

const stripePromise = loadStripe('pk_test_51IQVKzDEV8HqBraVSDKcSiaDjsYVPNNRd5J7pvTStHTM7iHLZaGWyLO1wizYvxsx0kK2IdTzoh8tBO8mIktle0y400B41RVFUg');

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
// }
