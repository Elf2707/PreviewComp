/**
 * Created by Elf on 06.06.2016.
 */
import React, {Component} from 'react';
import * as actions from '../actions/previewActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Previewer from '../components/previewer';

class PagePreview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {preview} = this.props;

        return (
            <Previewer
                preview={preview} />
        );
    }
}

//Subscribe on state change actions
export default connect(
    (state, ownProps) => ({ preview: ownProps.preview})
)(PagePreview);