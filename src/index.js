import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/index.css';

//redux
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore( 
        rootReducer,
        persistedState,
        compose(
            applyMiddleware(promiseMiddleware,thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

store.subscribe(()=>{
    saveState({
        login: store.getState().login
    })
}) 
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    );

serviceWorker.unregister();