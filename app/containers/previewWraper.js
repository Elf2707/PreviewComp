/**
 * Created by Elf on 06.06.2016.
 */
import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';

import * as actions from '../actions/previewActions';
import ogp from '../services/open-graph-scraper';
import Previewer from '../components/previewer';

export default class PagePreview extends Component {
    constructor(props) {
        super(props);
        //get data from inet
        this.state = {
            preview: {}
        };

        this.handleAddPagePreview(props.url);
    }

    render() {
        return (
            <Previewer
                preview={this.state.preview} />
        );
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
                this.setState({
                    preview: data
                })
            });
        } else {
            ToastAndroid.show('Wrong address',
                ToastAndroid.LONG);
        }
    }
}
