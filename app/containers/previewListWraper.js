/**
 * Created by Elf on 06.06.2016.
 */
import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../actions/previewActions';
import PreviewList from '../components/previewList';
import * as previewActions from '../actions/previewActions';

class PreviewListWraper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {urlList, actions} = this.props;

        return (
            <PreviewList
                urls={urlList}
                onAddUrlToPreview={actions.addUrlToPreviewAction} />
        );
    }
}

mapStateToProps = (state)=> {
    const {urlList} = state.previewReducer

    return { urlList: urlList};
}

//Subscribe on state change actions
export default connect(
    mapStateToProps,
    //Bind all actions
    (dispatch) => ({ actions: bindActionCreators(previewActions, dispatch)})
)(PreviewListWraper);