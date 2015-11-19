/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimeLine from './timeline';
import MeetingProgress from './meetingProgress';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
} = React;

class UserProfile extends React.Component{
    constructor(args){
        super(args);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Icon name="user" color="#BCCFE7" size={16} />
                    <Text style={styles.titleText}> User Profile</Text>
                </View>
                <View style={styles.userProfileWrapper}>
                    <Image source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'}} style={styles.profileImage} />
                    <View style={styles.profileInfoWrapper}>
                        <Text style={styles.name}>Jack Nicholson</Text>
                        <View style={styles.profileItemWrapper}>
                            <Icon name="envelope" size={18} color="#B5C8E2" />
                            <Text style={styles.profileItem}>johny@companyname.com</Text>
                        </View>
                        <View style={styles.profileItemWrapper}>
                            <Icon name="phone" size={18} color="#B5C8E2" />
                            <Text style={styles.profileItem}>+27 78 669 2347</Text>
                        </View>
                        <View style={styles.profileItemWrapper}>
                            <Icon name="map-marker" size={18} color="#B5C8E2" />
                            <Text style={styles.profileItem}>Hollywood Hills, California</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tabWrapper}>
                    <View style={styles.tab}>
                        <Icon name="user" size={18} color="#A4C1E8" />
                        <Text style={styles.tabText}>PROFILE</Text>
                    </View>
                    <View style={styles.tab}>
                        <Icon name="clock-o" size={18} color="#A4C1E8" />
                        <Text style={styles.tabText}>HISTORY</Text>
                    </View>
                    <View style={[styles.tab, { borderRightWidth: 0 }]}>
                        <Icon name="image" size={18} color="#A4C1E8" />
                        <Text style={styles.tabText}>MEDIA</Text>
                    </View>
                </View>
                <TimeLine />
                <MeetingProgress />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width: 300,
        backgroundColor: '#d3d3d3',
        flexDirection: 'column',
        alignItems: 'stretch',
        borderRightColor: '#D8E0F1',
        borderRightWidth: 1
    },
    titleBar: {
        backgroundColor: '#F7F8FC',
        padding: 10,
        borderBottomColor: '#C4D3E7',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    titleText: {
        color: '#5075B2',
        fontWeight: 'bold'
    },
    userProfileWrapper: {
        padding: 20,
        backgroundColor: '#EAEEF5',
        borderBottomColor: '#D8E0F1',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderColor: '#FFF',
        borderWidth: 5,
        borderRadius: 5
    },
    profileInfoWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5B7EB8'
    },
    profileItemWrapper: {
        flexDirection: 'row',
        paddingTop: 2,
    },
    profileItem: {
        color: '#5B7EB8'
    },
    tabWrapper: {
        backgroundColor: '#F0F1F3',
        padding: 10,
        flexDirection: 'row',
        borderBottomColor: '#D8E0F1',
        borderBottomWidth: 1,
    },
    tab: {
        flexDirection: 'row',
        borderRightColor: '#CCC',
        borderRightWidth: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        color: '#A4C1E8',
        fontWeight: 'bold'
    }
});

module.exports = UserProfile;
