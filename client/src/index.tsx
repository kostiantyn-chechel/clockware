import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { initFacebookSdk } from './helpers/init-facebook-sdk';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

initFacebookSdk().then(startApp);

const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        ),
    );

function startApp() {

    ReactDOM.render(
        <React.Fragment>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.Fragment>,

        document.getElementById('root')
    );
}


