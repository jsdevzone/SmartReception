/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
} = React;

class MeetingIntro extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textFieldWrapper}>
                    <View style={{padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: 170}}>
                        <Text>Select Room Number</Text>
                    </View>
                    <View style={{backgroundColor:'#FFF', flex: 1}}>
                        <TextInput underlineColorAndroid ="#FFF" placeholder="Room Number" />
                    </View>
                </View>
                <View style={styles.textFieldWrapper}>
                    <View style={{padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: 170}}>
                        <Text>Select Topic For Meeting</Text>
                    </View>
                    <View style={{backgroundColor:'#FFF', flex: 1}}>
                        <TextInput underlineColorAndroid ="#FFF" placeholder="Meeting Topic"  />
                    </View>
                </View>
                <View style={{backgroundColor:'#d14836',padding: 15, marginTop: 20}}>
                    <Text style={{color:'#FFF'}}>Start Meeting</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textFieldWrapper: {
        backgroundColor:'#F0F1F3',
        borderColor: '#D8E0F1',
        borderWidth: 1,
        flexDirection: 'row',
        width: 370,
        marginTop: 10
    }
});

module.exports = MeetingIntro;
