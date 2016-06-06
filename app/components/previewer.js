/**
 * Created by Elf on 06.06.2016.
 */
import React, {Component} from 'react';
import {StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    WebView,
    ToastAndroid } from 'react-native';

export default class Previewer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.setState({url: ''});
    }

    render() {
        const { link, fetchPage } = this.props;

        return (
            <View style={styles.container}>

                <TextInput
                    style={styles.urlInput}
                    onChangeText={(url) => this.setState({url: url })}
                    placeholder="Enter url www.sport.ru or www.youtube.com"/>

                <TouchableOpacity style={styles.button} onPress={()=>
                                            this._handleFetchPage(this.state.url, fetchPage)}>
                    <Text>Fetch Page</Text>
                </TouchableOpacity>

                <Text>{link}</Text>
                <WebView style={styles.webView} source={{uri: link}}
                         startInLoadingState={false}
                         scalesPageToFit={true}
                         scrollEnabled={false} />
            </View>
        );
    }

    _handleFetchPage(newLink, fatchAction) {
        if (/^www.sport.ru$/.test(newLink) || /^www.youtube.com$/.test(newLink)) {
            //Good link add http if it needs
            if (!newLink.match(/^[a-zA-Z]+:\/\//)) {
                newLink = 'http://' + newLink;
            }
            fatchAction(newLink);
        } else {
            ToastAndroid.show('Wrong address only www.sport.ru and www.youtube.com are allowed',
                ToastAndroid.LONG);
        }
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
    webView: {
        width: 300,
        height: 200,
        flex: 4,
        alignSelf: 'flex-start',
        flexDirection: 'column',
        backfaceVisibility: 'visible',
        backgroundColor: '#F5FCFF',
        marginTop: 150
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