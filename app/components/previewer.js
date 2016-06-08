/**
 * Created by Elf on 06.06.2016.
 */
import React, {Component} from 'react';
import {StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image } from 'react-native';

export default class Previewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    }

    render() {
        const { preview } = this.props;

        return (
            <View style={styles.preview}>
                <Text style={styles.mainUrl}>Url: {preview ? preview.url : ''}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.base}
                           resizeMode='contain'
                           source={{uri: preview ?
                        this._normalizeImageUrl(preview.data.ogImage.url):null}}/>
                    <View style={styles.textContentBlock}>

                        <Text><Text style={styles.textHeader}>
                            Content type: </Text>{preview ? preview.data.ogType : ''}</Text>

                        <Text><Text style={styles.textHeader}>
                            Site name: </Text>{preview ? preview.data.ogSiteName : ''}</Text>

                        <Text><Text style={styles.textHeader}>
                            Title: </Text>{preview ? preview.data.ogTitle : ''}</Text>

                        <Text><Text style={styles.textHeader}>
                            Description: </Text>{preview ? preview.data.ogDescription : ''}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _normalizeImageUrl(url) {
        if (!url.match(/^[a-zA-Z]+:\/\//)) {
            url = 'http://' + url;
        }

        return url;
    }
}

const styles = StyleSheet.create({
    base: {
        width: 70,
        height: 70,
        flex: 1,
        alignSelf: 'flex-start',
        marginTop: 7
    },
    mainUrl:{
        color: '#48BBEC',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textHeader: {
        fontWeight: 'bold',
        marginLeft: 5
    },
    textContentBlock: {
        flexWrap: 'wrap',
        flex: 1,
        padding: 5,
    },
    preview: {
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#48BBEC',
        padding: 8,
        marginTop: 5,
    }
});