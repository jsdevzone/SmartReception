/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Tile from './tileBlock';
import UserStore from '../../stores/userStore';
import { getDateFromISOFormat, } from '../../utils/util';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
} = React;

class NextMeeting extends React.Component{
    constructor(args){
        super(args);
        this.state = {
            isLoading: true,
            meeting: {}
        };

        this.store = new UserStore();
        this.store.on('nextmeetingloaded',(data)=>{
            this.setState({meeting: data, isLoading: false})
        });

        this.store.getNextMeeting();


    }
    onTilePress(route) {
    }
    render() {
        var date = new Date();
        if(!this.state.isLoading)
            date = getDateFromISOFormat(this.state.meeting.DateOfMeeting);
        var time = moment(date).format('MMMM Do, h:mm:ss A')

        return(
            <Tile scale="large" style={{ alignItems: 'stretch' }} onPress={() => this.onTilePress(routes.meeting)}>
                <View style={{flexDirection: 'column', alignItems: 'stretch', flex: 1}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.userProfileWrapperLeft}>
                            <Text style={{color:'#2A5488'}}>Next </Text>
                        </View>
                        <View style={[styles.userProfileWrapperLeft, {flex: 1, backgroundColor:'#DBE7F5', alignItems: 'flex-end'}]}>
                            <Text style={{color:'#2A5488'}}>{time}</Text>
                        </View>
                    </View>
                    <View style={[styles.userProfileWrapper, {flex: 1}]}>
                        <View style={{backgroundColor:'#FFF', width: 80, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'}} style={styles.profileImage} />
                        </View>
                        {(() => {
                            if(this.state.isLoading) {
                                return (<View><Text>{this.state.text}</Text></View>);
                            }
                            else {
                                return (
                                    <View style={styles.profileInfoWrapper}>
                                        <Text style={styles.name}>{this.state.meeting.Clients.FirstName + " " + this.state.meeting.Clients.LastName}</Text>
                                        <View style={styles.profileItemWrapper}>
                                            <Icon name="envelope" size={18} color="#B5C8E2" />
                                            <Text style={styles.profileItem}>{this.state.meeting.Clients.Email}</Text>
                                        </View>
                                        <View style={styles.profileItemWrapper}>
                                            <Icon name="phone" size={18} color="#B5C8E2" />
                                            <Text style={styles.profileItem}>+27 78 669 2347</Text>
                                        </View>
                                        <View style={styles.profileItemWrapper}>
                                            <Icon name="map-marker" size={18} color="#B5C8E2" />
                                            <Text style={styles.profileItem}>{this.state.meeting.Clients.Location}</Text>
                                        </View>
                                    </View>
                                );
                            }
                        })()}
                    </View>
                </View>
            </Tile>
        );
    }
}

var styles = StyleSheet.create({
    dashboardContainer: {
        backgroundColor: '#d3d3d3',
        flex: 1,
        flexDirection: 'column'
    },
    horizontal: {
        flexDirection: 'row'
    },
    searchTileWrapper: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    copyrightBanner: {
        alignItems:'flex-end',
        flex :1,
        padding: 25
    },
    userProfileWrapper: {
        backgroundColor: '#EAEEF5',
        borderBottomColor: '#D8E0F1',
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    profileImage: {
        width: 60,
        height: 60,
        borderColor: '#EAEEF5',
        borderWidth: 5,
        borderRadius: 5
    },
    profileInfoWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        alignItems: 'stretch'
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
    userProfileWrapperLeft: {
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 80,
        padding: 5,
        backgroundColor: '#EAEEF5'
    },
});

module.exports = NextMeeting;
