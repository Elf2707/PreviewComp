/**
 * Created by Elf on 06.06.2016.
 * Main app file
 */
import React, {Component, Navigator} from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {Router, Route, Schema, Animations} from 'react-native-redux-router';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import FetcherApp from './fetcherApp';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router hideNavBar={true}>
                    <Schema
                        name="default"
                        sceneConfig={Animations.FlatFloatFromBottom} />
                    <Route
                        name="launch"
                        component={FetcherApp}
                        initial={true}
                        title="Page previewer"/>
                </Router>
            </Provider>
        )
    }
}
