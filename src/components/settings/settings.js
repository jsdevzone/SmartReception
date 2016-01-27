'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 *
 * Copyright (C) E-Gov LLC, Dubai, UAE - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */


var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');
import DialogAndroid from 'react-native-dialogs';

import AppStore from '../../stores/appStore';
import AppConstants from '../../constants/appConstants';

var  { Component, StyleSheet, View, Text, ListView,TouchableWithoutFeedback, SwitchAndroid,TextInput, AsyncStorage } = React;

export default class Settings extends Component {
    constructor(args) {
        super(args);
    }
    render() {
        return (
            <View style={styles.container}>
                <GeneralSettings />
            </View>
        );
    }
}

class GeneralSettings extends Component {
    constructor(args) {
        super(args);
        this.state = {
            serviceEndPoint: null,
            user: null,
            applicationMode: null
        };
        this.state.user = AppStore.user.UserName;
        if(AppStore.serviceEndPoint)
            this.state.serviceEndPoint = AppStore.serviceEndPoint;
        if(AppStore.applicationMode)
            this.state.applicationMode = AppStore.applicationMode;
    }
    onServiceEndPointChange() {
        if(this.state.serviceEndPoint == null) {
            let dialog = new DialogAndroid();
            dialog.set({
                title: 'Service Endpoint',
                content: 'Enter the Endpoint with /api at last',
                input: {
                    hint: 'Endpoint',
                    value: this.state.serviceEndPoint,
                    /**                 * When user press ok this function will be executed with the input as parameter
                     * @param {String} input
                     */
                    callback: input => {
                        if(input && input != null && input != "") {
                            const STORAGE_KEY = AppConstants.storageKey + ':serviceEndPoint';
                            this.setState({ serviceEndPoint: input });
                            AsyncStorage.setItem(STORAGE_KEY, input);
                        }
                    }
                }
            });
            dialog.show();
        }
    }
    onApplicationModeChange() {
        if(this.state.applicationMode != null) {
            let dialog = new DialogAndroid();

            let options = {
                title: 'Select A Meeting Area',
                positiveText: 'Select',
                items: ['Reception', 'Advisor']
            };

            /**
             * Callback for item select
             */
            options.itemsCallback = (index) => {
                this.setState({ applicationMode: options.items[index] });
                const STORAGE_KEY = AppConstants.storageKey + ':applicationMode';
                AsyncStorage.setItem(STORAGE_KEY, options.items[index]);
            };

            /**
             * Shows the dialog
             */
            dialog.set(options);
            dialog.show();
        }
    }
    render() {
        return (
            <View style={{padding: 20, backgroundColor:'#FFF', width: 500, alignItems: 'stretch'}}>
                <Text>Settings</Text>
                <TouchableWithoutFeedback onPress={this.onServiceEndPointChange.bind(this)}>
                    <View style={{padding: 10, flexDirection: 'row', borderBottomColor:'#E9E9E9', borderBottomWidth: 1}}>

                        <View style={{flex:1}}>
                            <Text style={{fontSize: 18}}>Service Endpoint</Text>
                            <Text style={{color:'#CCC'}}>{this.state.serviceEndPoint}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onApplicationModeChange.bind(this)}>
                    <View style={{padding: 10, flexDirection: 'row', borderBottomColor:'#E9E9E9', borderBottomWidth: 1}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 18}}>Application Mode</Text>
                            <Text style={{color:'#CCC'}}>{this.state.applicationMode}</Text>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                <View style={{padding: 10, flexDirection: 'row', borderBottomColor:'#E9E9E9', borderBottomWidth: 1}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18}}>Logged In User</Text>
                        <Text style={{color:'#CCC'}}>{this.state.user}</Text>
                    </View>
                </View>
                <View style={{padding: 10, flexDirection: 'row', borderBottomColor:'#E9E9E9', borderBottomWidth: 1}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18}}>Change Password</Text>
                        <Text style={{color:'#CCC'}}>*********************</Text>
                    </View>
                </View>

                <View style={{padding: 10, flexDirection: 'row', borderBottomColor:'#E9E9E9', borderBottomWidth: 1}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18}}>Reset state</Text>
                        <Text style={{color:'#CCC'}}>Reset your application state</Text>
                    </View>
                </View>
            </View>
        );
    }
}


let styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sidebar: {
        width: 250,
        flexDirection: 'column',
        borderRightColor: '#E6E6E6',
        borderRightWidth: 1
    },
    sidebarTitle: {
        backgroundColor: '#FFF',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sidebarCategorySeparator:{
        height: 40
    },
    sidebarTitleText: {
        fontSize: 18,
        color: '#000',
    },
    sidebarCategoryTitle: {
        padding: 12,
        borderBottomWidth: 1,
        backgroundColor: '#FFF',
        borderBottomColor: '#F4F4F4',
        flexDirection: 'row'
    },
    sidebarCategoryTitleText: {
        color: '#000',
        marginLeft: 5
    },
    settingsContent: {
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1
    },
    settingsContentTitle: {
        backgroundColor: '#FFF',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    settingsContentTitleText: {
        fontSize: 18,
        color: '#000',
    },
    settingsContentBody: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
