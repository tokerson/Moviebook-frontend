import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/index.css';

//redux
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
//import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'

const store = createStore( 
        rootReducer,
        compose(
            applyMiddleware(promiseMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSTION__ ? window.devToolsExtension() : f => f
        )
    );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    );

serviceWorker.unregister();