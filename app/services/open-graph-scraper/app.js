var cheerio = require('./src/cheerio'),
    _ = require('lodash');

module.exports = function (options, callback) {
    exports.getInfo(options, function (err, results) {
        callback(err, results);
    });
};

var fieldsArray = [
    {
        multiple: false,
        property: 'og:title',
        fieldName: 'ogTitle'
    },
    {
        multiple: false,
        property: 'og:type',
        fieldName: 'ogType'
    },
    {
        multiple: true,
        property: 'og:image',
        fieldName: 'ogImage'
    },
    {
        multiple: true,
        property: 'og:image:url',
        fieldName: 'ogImageURL'
    },
    {
        multiple: true,
        property: 'og:image:secure_url',
        fieldName: 'ogImageSecureURL'
    },
    {
        multiple: true,
        property: 'og:image:width',
        fieldName: 'ogImageWidth'
    },
    {
        multiple: true,
        property: 'og:image:height',
        fieldName: 'ogImageHeight'
    },
    {
        multiple: true,
        property: 'og:image:type',
        fieldName: 'ogImageType'
    },
    {
        multiple: false,
        property: 'og:url',
        fieldName: 'ogUrl'
    },
    {
        multiple: false,
        property: 'og:audio',
        fieldName: 'ogAudio'
    },
    {
        multiple: false,
        property: 'og:audio:url',
        fieldName: 'ogAudioURL'
    },
    {
        multiple: false,
        property: 'og:audio:secure_url',
        fieldName: 'ogAudioSecureURL'
    },
    {
        multiple: false,
        property: 'og:audio:type',
        fieldName: 'ogAudioType'
    },
    {
        multiple: false,
        property: 'og:description',
        fieldName: 'ogDescription'
    },
    {
        multiple: false,
        property: 'og:determiner',
        fieldName: 'ogDeterminer'
    },
    {
        multiple: false,
        property: 'og:locale',
        fieldName: 'ogLocale'
    },
    {
        multiple: false,
        property: 'og:locale:alternate',
        fieldName: 'ogLocaleAlternate'
    },
    {
        multiple: false,
        property: 'og:site_name',
        fieldName: 'ogSiteName'
    },
    {
        multiple: true,
        property: 'og:video',
        fieldName: 'ogVideo'
    },
    {
        multiple: true,
        property: 'og:video:url', // An alternative to 'og:video'
        fieldName: 'ogVideo'
    },
    {
        multiple: true,
        property: 'og:video:secure_url',
        fieldName: 'ogVideoSecureURL'
    },
    {
        multiple: true,
        property: 'og:video:width',
        fieldName: 'ogVideoWidth'
    },
    {
        multiple: true,
        property: 'og:video:height',
        fieldName: 'ogVideoHeight'
    },
    {
        multiple: true,
        property: 'og:video:type',
        fieldName: 'ogVideoType'
    },
    {
        multiple: false,
        property: 'twitter:card',
        fieldName: 'twitterCard'
    },
    {
        multiple: false,
        property: 'twitter:site',
        fieldName: 'twitterSite'
    },
    {
        multiple: false,
        property: 'twitter:site:id',
        fieldName: 'twitterSiteId'
    },
    {
        multiple: false,
        property: 'twitter:creator',
        fieldName: 'twitterCreator'
    },
    {
        multiple: false,
        property: 'twitter:creator:id',
        fieldName: 'twitterCreatorId'
    },
    {
        multiple: false,
        property: 'twitter:title',
        fieldName: 'twitterTitle'
    },
    {
        multiple: false,
        property: 'twitter:description',
        fieldName: 'twitterDescription'
    },
    {
        multiple: true,
        property: 'twitter:image',
        fieldName: 'twitterImage'
    },
    {
        multiple: true,
        property: 'twitter:image:height',
        fieldName: 'twitterImageHeight'
    },
    {
        multiple: true,
        property: 'twitter:image:width',
        fieldName: 'twitterImageWidth'
    },
    {
        multiple: true,
        property: 'twitter:image:alt',
        fieldName: 'twitterImageAlt'
    },
    {
        multiple: true,
        property: 'twitter:player',
        fieldName: 'twitterPlayer'
    },
    {
        multiple: true,
        property: 'twitter:player:width',
        fieldName: 'twitterPlayerWidth'
    },
    {
        multiple: true,
        property: 'twitter:player:height',
        fieldName: 'twitterPlayerHeight'
    },
    {
        multiple: true,
        property: 'twitter:player:stream',
        fieldName: 'twitterPlayerStream'
    },
    {
        multiple: false,
        property: 'twitter:app:name:iphone',
        fieldName: 'twitterAppNameiPhone'
    },
    {
        multiple: false,
        property: 'twitter:app:id:iphone',
        fieldName: 'twitterAppIdiPhone'
    },
    {
        multiple: false,
        property: 'twitter:app:url:iphone',
        fieldName: 'twitterAppUrliPhone'
    },
    {
        multiple: false,
        property: 'twitter:app:name:ipad',
        fieldName: 'twitterAppNameiPad'
    },
    {
        multiple: false,
        property: 'twitter:app:id:ipad',
        fieldName: 'twitterAppIdiPad'
    },
    {
        multiple: false,
        property: 'twitter:app:url:ipad',
        fieldName: 'twitterAppUrliPad'
    },
    {
        multiple: false,
        property: 'twitter:app:name:googleplay',
        fieldName: 'twitterAppNameGooglePlay'
    },
    {
        multiple: false,
        property: 'twitter:app:id:googleplay',
        fieldName: 'twitterAppIdGooglePlay'
    },
    {
        multiple: false,
        property: 'twitter:app:url:googleplay',
        fieldName: 'twitterAppUrlGooglePlay'
    }
];

var mediaMapperTwitterImage = function (item) {
    return {
        url: item[0],
        width: item[1],
        height: item[2],
        alt: item[3]
    };
};

var mediaMapperTwitterPlayer = function (item) {
    return {
        url: item[0],
        width: item[1],
        height: item[2],
        stream: item[3]
    };
};

var mediaMapper = function (item) {
    return {
        url: item[0],
        width: item[1],
        height: item[2],
        type: item[3]
    };
};

var mediaSorter = function (a, b) {
    if (!(a.url && b.url)) {
        return 0;
    }

    var aRes = a.url.match(/\.(\w{2,5})$/),
        aExt = (aRes && aRes[1].toLowerCase()) || null;
    var bRes = b.url.match(/\.(\w{2,5})$/),
        bExt = (bRes && bRes[1].toLowerCase()) || null;

    if (aExt === 'gif' && bExt !== 'gif') {
        return -1;
    } else if (aExt !== 'gif' && bExt === 'gif') {
        return 1;
    } else {
        return Math.max(b.width, b.height) - Math.max(a.width, a.height);
    }
};

/*
 * get info
 * @param string url - user input of url
 * @param function callback
 */
exports.getInfo = function (options, callback) {
    var error = false,
        returnResult = {},
        that = this;
    this.validateVars(options.url, function (inputUrl) {
        if (inputUrl) {
            let requestOptions = {
                headers: {
                    'user-agent': 'rn-fetch',
                    'content-type': 'text/html',
                    'content-encoding': 'gzip'
                },
                credentials: 'omit',
                method: 'GET'
            }

            that.getOG(inputUrl, requestOptions, function (err, results) {
                if (results) {
                    returnResult = {
                        data: results,
                        success: true
                    };
                } else {
                    if (err && (err.code === 'ENOTFOUND' || err.code === 'EHOSTUNREACH')) {
                        error = true;
                        returnResult = {
                            err: 'Page Not Found',
                            success: false
                        };
                    } else if (err && err.code === 'ETIMEDOUT') {
                        error = true;
                        returnResult = {
                            err: 'Time Out',
                            success: false
                        };
                    } else {
                        error = true;
                        returnResult = {
                            err: 'Page Not Found',
                            success: false
                        };
                    }
                }
                callback(error, returnResult);
            });
        } else {
            callback(true, {
                success: false,
                err: 'Invalid URL'
            });
        }
    });
};

/*
 * validate var
 * @param string var - user input
 * @param function callback
 */
exports.validateVars = function (inputUrl, callback) {
    var returnInputUrl = null;

    if (!(inputUrl === null || typeof inputUrl === 'undefined' || !inputUrl || inputUrl.length < 1)) {
        returnInputUrl = this.validateUrl(inputUrl);
    }

    callback(returnInputUrl);
};

/*
 * validate url - all urls must have http:// in front of them
 * @param string var - the url we want to scrape
 * @param function callback
 */
exports.validateUrl = function (inputUrl) {
    if (!/^(f|ht)tps?:\/\//i.test(inputUrl)) {
        inputUrl = 'http://' + inputUrl;
    }
    return inputUrl;
};

/*
 * getOG - scrape that url!
 * @param string url - the url we want to scrape
 * @param function callback
 */
exports.getOG = function (url, options, callback) {
    fetch(url, options)
        .then((response) => {
            if (response && response.statusCode && (response.statusCode.toString().substring(0, 1) === '4' || response.statusCode.toString().substring(0, 1) === '5')) {
                callback(new Error('Error from server'), null);
            }
            return response.text();
        })
        .then((body) => {
            var $ = cheerio.load(body),
                meta = $('meta'),
                keys = Object.keys(meta),
                ogObject = {};

            keys.forEach(function (key) {
                if (!(meta[key].attribs && (meta[key].attribs.property || meta[key].attribs.name))) {
                    return;
                }
                var property = meta[key].attribs.property || meta[key].attribs.name,
                    content = meta[key].attribs.content;
                fieldsArray.forEach(function (item) {
                    if (property === item.property) {
                        if (!item.multiple) {
                            ogObject[item.fieldName] = content;
                        } else if (!ogObject[item.fieldName]) {
                            ogObject[item.fieldName] = [content];
                        } else if (Array.isArray(ogObject[item.fieldName])) {
                            ogObject[item.fieldName].push(content);
                        }
                    }
                });
            });

            /* Combine image/width/height/type
             and sort for priority */
            var ogImages = _.zip(ogObject.ogImage,
                ogObject.ogImageWidth,
                ogObject.ogImageHeight,
                ogObject.ogImageType)
                .map(mediaMapper).sort(mediaSorter);

            /* Combine video/width/height/type
             and sort for priority */
            var ogVideos = _.zip(ogObject.ogVideo,
                ogObject.ogVideoWidth,
                ogObject.ogVideoHeight,
                ogObject.ogVideoType)
                .map(mediaMapper).sort(mediaSorter);

            /* Combine twitter image/width/height/alt
             and sort for priority */
            var twitterImages = _.zip(ogObject.twitterImage,
                ogObject.twitterImageWidth,
                ogObject.twitterImageHeight,
                ogObject.twitterImageAlt)
                .map(mediaMapperTwitterImage).sort(mediaSorter);

            /* Combine twitter player/width/height/stream
             and sort for priority */
            var twitterPlayers = _.zip(ogObject.twitterPlayer,
                ogObject.twitterPlayerWidth,
                ogObject.twitterPlayerHeight,
                ogObject.twitterPlayerStream)
                .map(mediaMapperTwitterPlayer).sort(mediaSorter);

            // Delete temporary fields
            fieldsArray.filter(function (item) {
                return item.multiple;
            }).forEach(function (item) {
                delete ogObject[item.fieldName];
            });

            // Select the best image
            if (ogImages.length) {
                ogObject.ogImage = ogImages[0];
            }

            // Select the best video
            if (ogVideos.length) {
                ogObject.ogVideo = ogVideos[0];
            }

            // Select the best twitter image
            if (twitterImages.length) {
                ogObject.twitterImage = twitterImages[0];
            }

            // Select the best player
            if (twitterPlayers.length) {
                ogObject.twitterPlayer = twitterPlayers[0];
            }

            // Check for 'only get open graph info'
            if (!options.onlyGetOpenGraphInfo) {
                // Get title tag if og title was not provided
                if (!ogObject.ogTitle && $("title").text() && $("title").text().length > 0) {
                    ogObject.ogTitle = $("title").text();
                }
                // Get meta description tag if og description was not provided
                if (!ogObject.ogDescription && $('meta[name="description"]').attr('content') && $('meta[name="description"]').attr('content').length > 0) {
                    ogObject.ogDescription = $('meta[name="description"]').attr('content');
                }
            }

            //console.log('ogObject',ogObject);
            callback(null, ogObject);
        })
        .catch((error) => {
            callback(error)
        });
};
