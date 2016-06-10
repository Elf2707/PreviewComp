/**
 * Created by Elf on 06.06.2016.
 */
import React, {Component} from 'react';
import {ToastAndroid, Text} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../actions/previewActions';
import PreviewList from '../components/previewList';
import * as previewActions from '../actions/previewActions';
import ogp from '../services/open-graph-scraper';

class PreviewListWraper extends Component {
    constructor(props) {
        super(props);
    }

    handleAddPagePreview(newLink) {
        if (newLink) {
            //Good link add http if it needs
            if (!newLink.match(/^[a-zA-Z]+:\/\//)) {
                newLink = 'http://' + newLink;
            }

            ogp({url: newLink}, (err, data) => {
                if (err) {
                    console.log('Error while receiving data' + err);
                    ToastAndroid.show('Error while connecting to url', ToastAndroid.LONG);
                    return;
                }

                //add url and id fields
                data.url = newLink;
                data.id = Date.now();

                //add preview to the list
                this.props.actions.addPagePreview(data);
            });
        } else {
            ToastAndroid.show('Wrong address',
                ToastAndroid.LONG);
        }
    }

    render() {
        const {previewList} = this.props;

        return (
            <PreviewList
                previews={previewList}
                onAddPagePreview={this.handleAddPagePreview.bind(this)} />
        );
    }
}

mapStateToProps = (state)=> {
    const {previewList} = state.previewReducer

    return { previewList: previewList};
}

//Subscribe on state change actions
export default connect(
    mapStateToProps,
    //Bind all actions
    (dispatch) => ({ actions: bindActionCreators(previewActions, dispatch)})
)(PreviewListWraper);