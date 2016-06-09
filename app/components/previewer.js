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
                <View style={styles.rowFlow}>
                    <View>
                        <Image style={styles.imageIcon}
                               resizeMode='contain'
                               source={{uri: preview ?
                        this._normalizeImageUrl(preview.data.ogImage.url):null}}/>

                        <Image style={styles.imageIcon}
                               resizeMode='contain'
                               source={{uri: this._testTwittAndOgImageDiffr(preview)}}/>
                    </View>
                    <View style={styles.textContentBlock}>

                        <Text><Text style={styles.textHeader}>
                            Content type: </Text>{preview ? preview.data.ogType : ''}</Text>

                        <Text><Text style={styles.textHeader}>
                            Site name: </Text>{preview ? preview.data.ogSiteName : ''}</Text>

                        <Text numberOfLines={3}><Text style={styles.textHeader}>
                            Title: </Text>{preview ? preview.data.ogTitle : ''}</Text>

                        <Text numberOfLines={6}><Text style={styles.textHeader}>
                            Description: </Text>{preview ? preview.data.ogDescription : ''}</Text>
                    </View>
                </View>
            </View>
        );
    }

    //Test if twitter image same then do not show it return null
    //if it different return twitterImg url
    _testTwittAndOgImageDiffr(preview){
        if(!(preview && preview.data && preview.data.twitterImage)){
            return null;
        }

        let twittImgUrl = this._normalizeImageUrl(preview.data.twitterImage.url);
        let ogImgUrl = this._normalizeImageUrl(preview.data.ogImage.url)

        if( twittImgUrl === ogImgUrl) {
            return null;
        }

        return twittImgUrl;
    }

    _normalizeImageUrl(url) {
        if (!url.match(/^[a-zA-Z]+:\/\//)) {
            url = 'http://' + url;
        }

        return url;
    }
}

const styles = StyleSheet.create({
    rowFlow: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flex: 1
    },

    imageIcon: {
        width: 70,
        height: 70,
        marginTop: 5,
        flex: 1,
    },

    textContentBlock: {
        width: 250,
        padding: 5,
        marginLeft: 8,
        flexDirection: 'column',
        flex: 4
    },

    mainUrl: {
        color: '#48BBEC',
        fontSize: 18,
        fontWeight: 'bold'
    },

    textHeader: {
        fontWeight: 'bold',
        marginLeft: 5
    },

    preview: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#48BBEC',
        padding: 8,
        marginTop: 5,
        flexWrap: 'wrap'
    }
});