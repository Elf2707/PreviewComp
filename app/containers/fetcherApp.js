/**
 * Created by Elf on 06.06.2016.
 */
import React, {Component} from 'react';
import * as actions from '../actions/fetcherActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Previewer from '../components/previewer';
import * as fetchActions from '../actions/fetcherActions';

class FetcherApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {state, actions} = this.props;

        return (
            <Previewer
                preview={state.preview}
                {...actions}/>
        );
    }
}

//Subscribe on state change actions
export default connect(
    (state) => ({ state: state.fetcher}),
    //Bind all actions
    (dispatch) => ({ actions: bindActionCreators(fetchActions, dispatch)})
)(FetcherApp);