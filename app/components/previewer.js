/**
 * Created by Elf on 06.06.2016.
 */
import React, {Component} from 'react';
import {StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Image } from 'react-native';
import ogp from '../services/open-graph-scraper';

export default class Previewer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.setState({url: ''});
    }

    render() {
        const { preview, fetchPage } = this.props;

        return (
            <View style={styles.container}>

                <TextInput
                    style={styles.urlInput}
                    onChangeText={(url) => this.setState({url: url })}
                    placeholder="Please enter url"/>

                <TouchableOpacity style={styles.button} onPress={()=>
                                            this._handleFetchPage(this.state.url, fetchPage)}>
                    <Text>Fetch Page</Text>
                </TouchableOpacity>

                <View style={styles.preview}>
                    <Text>{preview.data ? preview.data.ogType : ''}</Text>
                    <Text>{preview.data ? preview.data.ogSiteName : ''}</Text>
                    <Image style={styles.base}
                           resizeMode='contain'
                        source={{uri: preview.data ?
                        this._normalizeImageUrl(preview.data.ogImage.url):null}} />
                    <Text>{preview.data ? preview.data.ogTitle : ''}</Text>
                    <Text>{preview.data ? preview.data.ogDescription : ''}</Text>
                </View>
            </View>
        );
    }

    _normalizeImageUrl(url){
        if (!url.match(/^[a-zA-Z]+:\/\//)) {
            url = 'http://' + url;
        }

        return url;
    }

    _handleFetchPage(newLink, fatchAction) {
        if (newLink) {
            //Good link add http if it needs
            if (!newLink.match(/^[a-zA-Z]+:\/\//)) {
                newLink = 'http://' + newLink;
            }

            ogp({url: newLink}, (err, data) => {
                if (err) {
                    console.log('Error while receiving data' + err);
                    return;
                }

                fatchAction(data);
            });
        } else {
            ToastAndroid.show('Wrong address',
                ToastAndroid.LONG);
        }
    }
}

const styles = StyleSheet.create({
    base: {
        width: 50,
        height: 50,
    },
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
    preview: {
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