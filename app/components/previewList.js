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
            rowHasChanged: (preview1, preview2) =>
            preview1.id !== preview2.id
        });
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.previews)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.previews)
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
                            this.props.onAddPagePreview(this.state.url)}>
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
            <PagePreview preview={data}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        alignSelf: 'flex-start',
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