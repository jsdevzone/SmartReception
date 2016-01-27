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

 import React, { View, StyleSheet, Text, TextInput,
     TouchableWithoutFeedback, ToastAndroid, Image, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import DialogAndroid from 'react-native-dialogs';

 import Dashboard from '../home/dashboard';
 import CredentialStore from '../../stores/credentialStore';

 /**
  * User Authorization screen.
  *
  * @class UserLogin
  * @extends React.Component
  *
  * @props {Navigator} navigator - React Native Navigator
  */

export default class UserLogin extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);

        let errorMessage = 'Something Happened In Authentication, Please Try Again :(';
        /**
         * @state
         */
        this.state = {
            /**
             * User name
             * @state {String} username
             */
            username: '',
            /**
             * Password
             * @state {String} password
             */
            password: '',
            /**
             * Any error message
             * @state {String} errorMessage
             */
            errorMsg: errorMessage,
            /**
             * Whether app is authenticating or not
             * @state {Boolean} isAuthenticating
             */
            isAuthenticating: false,
            /**
             * @state {Boolean} hasAuthenticationError
             */
            hasAuthenticationError:  false
        };

        /**
         * Add event handler form authenticated event
         */
        CredentialStore.addEventListener('authenticated', this.onAuthenticated.bind(this));
    }

    /**
     * Executes when authenticated with the server
     * @eventhandler
     * @return {Void} undefined
     */
    onAuthenticated (data) {
        if(data.success) {
            this.props.navigator.replaceAtIndex({ component: Dashboard, id: 'dashboard', title: 'Dashboard' }, 0);
            this.props.navigator.popToTop();
        }
        else
            this.setState({ password: '', isAuthenticating: false, hasAuthenticationError: true, errorMsg: "Invalid Username And/Or Password!" });
    }

    /**
     * On Login Button Press Handler
     * @eventhandler
     * @return {Void} undefined
     */
    onLogin() {
        if(this.state.username != '' && this.state.password != '') {
            this.setState({ isAuthenticating: true, hasAuthenticationError: false });
            CredentialStore.authenticate({ username: this.state.username, password: this.state.password});
        }
        else {
            this.setState({ isAuthenticating: false, hasAuthenticationError: true, errorMsg:  'Username & Password can not be empty!' });
        }
    }

    /**
     * Component Life cycle method
     * @lifecycle
     * @return {Component} view
     */
    render() {
        /**
         * Basic authentication form
         */
        let component = (
            <View>
                <TextInput style={styles.input} placeholder="Username" value={this.state.username} onChangeText={(text)=>this.setState({ username: text })} />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={this.state.password} onChangeText={(text)=>this.setState({ password: text })}  />
                <TouchableWithoutFeedback onPress={this.onLogin.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );

        /**
         * If there is an authentication error, show it
         */
        let errorMessage = null;
        if(this.state.hasAuthenticationError)
            errorMessage = (<View style={styles.errorContainer}><Text>{this.state.errorMsg}</Text></View>);

        /**
         * If the request is being sent to the server show the loading screen
         */
        if(this.state.isAuthenticating)
        {
            component = (
                <View style= {{ flexDirection: 'column', alignItems: 'center', flex: 1}}>
                    <Image
                        source={{uri: 'https://d13yacurqjgara.cloudfront.net/users/12755/screenshots/1037374/hex-loader2.gif'}}
                        style={{width:200,height: 200, marginLeft: 100}}/>
                        <Text style={{marginLeft: 100}}>Authenticating, Please wait...</Text>
                </View>
            );
        }


        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image source={require('../../../resources/images/logo.png')} style={{width: 400, height: 160,  marginBottom: 20}} />
                    { errorMessage }
                    { component }
                </View>
            </View>
        );
    }
}

/**
 * Component Life cycle method
 * @style
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCC',
        alignItems: 'center',
    },
    loginContainer: {
        backgroundColor: '#FFF',
        borderColor: '#F4F4F4',
        borderWidth: 1,
        padding: 10,
        marginTop: 50,
        flexDirection: 'column',
    },
    input: {
        width: 400,
        borderWidth: 0,
        borderColor: '#CCC'
    },
    button: {
        backgroundColor: '#d9232d',
        padding: 8,
        color: '#FFF',
        marginTop: 20,
        width: 400,
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
    },
    errorContainer: {
        borderLeftColor: '#d9534f',
        borderLeftWidth: 5,
        backgroundColor: '#F7BAB8',
        padding: 10,
        width: 400,
        marginBottom: 20
    }
});
