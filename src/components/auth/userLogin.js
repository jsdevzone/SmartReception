
/**
 * @author Jasim
 */
'use strict';
 import React from 'react-native';
 import NavigatorActions  from '../../actions/navigator';
 import ApplicationRoutes from '../../constants/appRoutes';
 import Dashboard from '../home/dashboard';
 import CredentialStore from '../../stores/credentialStore';

 var {
     StyleSheet,
     Text,
     View,
     Image,
     TextInput,
     TouchableWithoutFeedback,
 } = React;

class UserLogin extends React.Component {
    constructor(args) {
        super(args);

        let errorMessage = 'Something Happened In Authentication, Please Try Again :(';

        this.state = {
            username: '',
            password: '',
            errorMsg: errorMessage,
            isAuthenticating: false,
            hasAuthenticationError:  false
        };
    }
    componentDidMount () {
        CredentialStore.addEventListener('authenticated', this.onAuthenticated.bind(this));
    }
    onAuthenticated () {
        this.setState({ isAuthenticating: false, hasAuthenticationError: false });
        this.props.navigator.replaceAtIndex({ component: Dashboard, id: 'dashboard', title: 'Dashboard' }, 0);
        this.props.navigator.popToTop();
    }
    onLogin() {
        if(this.state.username != '' && this.state.password != '') {
            this.setState({ isAuthenticating: true, hasAuthenticationError: false });
            CredentialStore.authenticate({ username: this.state.username, password: this.state.password});
        }
        else {
            this.setState({ isAuthenticating: false, hasAuthenticationError: true, errorMsg:  'Username & Password can not be empty!' });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image source={require('../../../resources/images/logo.png')} style={{width: 400, height: 160,  marginBottom: 20}} />

                    {(() => {
                        if(this.state.hasAuthenticationError) {
                            return (<View style={styles.errorContainer}><Text>{this.state.errorMsg}</Text></View>);
                        }
                    })()}

                    {(() => {
                        if(this.state.isAuthenticating) {
                            return (
                                <View style= {{ flexDirection: 'column', alignItems: 'center', flex: 1}}>
                                    <Image
                                        source={{uri: 'https://d13yacurqjgara.cloudfront.net/users/12755/screenshots/1037374/hex-loader2.gif'}}
                                        style={{width:200,height: 200, marginLeft: 100}}/>
                                    <Text style={{marginLeft: 100}}>Authenticating, Please wait...</Text>
                                </View>
                            );
                        }
                        else{
                            return (
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
                        }
                    })()}
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
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

module.exports = UserLogin;
