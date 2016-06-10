/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React from 'react';
import {View} from 'react-native';
import { AppRegistry } from 'react-native';
import App from './app/containers/app';

const MainProject = () => {
    return (

        <App />
    );
}

AppRegistry.registerComponent('PreviewComp', () => MainProject);
