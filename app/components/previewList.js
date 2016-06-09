/**
 * Created by Elf on 08.06.2016.
 */
import React, {Component} from 'react';
import {View,
    ListView,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet } from 'react-native';

import PagePreview from '../containers/previewWraper';

export default class PreviewList extends Component {
    constructor(props) {
        super(props)

        this.ds = new ListView.DataSource({
            rowHasChanged: (url1, url2) => url1 !== url2
        });
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.urls)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.urls)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.urlInput}
                    onChangeText={(url) => this.setState({url: url })}
                    placeholder="Please enter url"/>

                <TouchableOpacity style={styles.button} onPress={()=>
                            this.props.onAddUrlToPreview(this.state.url)}>
                    <Text>Add Preview</Text>
                </TouchableOpacity>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.rowRender}
                          enableEmptySections={true}>

                </ListView>
            </View>
        )
    }

    rowRender(data, sectionId, rowId) {
        return (
            <PagePreview url={data} index={rowId} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        borderColor: 'grey',
        borderWidth: 2,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        alignSelf: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'column',
        padding: 10
    },

    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        alignItems: 'center',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    urlInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    }
});