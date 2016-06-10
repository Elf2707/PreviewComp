/**
 * Created by Elf on 06.06.2016.
 * Main app file
 */
import React, {Component, Navigator} from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {Actions, Scene, Router} from 'react-native-router-flux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import PreviewListWraper from './previewListWraper';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router hideNavBar={true}>
                    <Scene key="root">
                        <Scene key="main"
                               component={PreviewListWraper}
                               initial={true}
                               title="Page previewer"/>
                    </Scene>
                </Router>
            </Provider>
        )
    }
}
