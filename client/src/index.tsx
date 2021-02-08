import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
// import '@material-ui/core';
// import '@material-ui/icons';
// import '@material-ui/styles';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        ),
    );

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
