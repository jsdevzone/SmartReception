
/**
 * @author Jasim
 */
'use strict';
 var React = require('react-native');
 var NavigatorActions = require('../../actions/navigator');
 var ApplicationRoutes = require('../../constants/appRoutes');
 var Dashboard = require('../home/dashboard');
 var SettingsCategory = require('../settings/settingsCategory');

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
        this.state = {
            isAuthenticating: false,
            text: ""
        };
    }
    _onLogin() {
        this.setState({ isAuthenticating: true });
        setTimeout(() => {
            var route = ApplicationRoutes.getRoute('settings', {component: SettingsCategory});
            NavigatorActions.navigateToRoute(route);
        }, 1000);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image source={require('image!logo')} style={{width: 400, height: 160,  marginBottom: 20}} />
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
                                    <TextInput style={styles.input} placeholder="Username" value={this.state.text} />
                                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
                                    <TouchableWithoutFeedback onPress={this._onLogin.bind(this)}>
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
    }
});

module.exports = UserLogin;
