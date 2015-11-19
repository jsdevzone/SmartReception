/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tile from './tileBlock';
import Meeting from '../meeting/meeting';
import {Schedule} from '../../../components/schedule/schedule';
import SplashScreen from '../app/splashScreen';

import { NotificationBar, } from './notificationBar';
import { getRandomColor, } from '../../utils/util';


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
} = React;

var routes = {
    meeting: { title: 'Meeting', id: 'meeting', component: Meeting },
    calendar: { title: 'Meeting', id: 'schedule', component: Schedule },
    splashScreen: { title: 'Meeting', id: 'schedule', component: SplashScreen }
};


class Dashboard extends React.Component{
    constructor(args){
        super(args);
    }
    onTilePress(route) {
        this.props.navigator.push(route);
    }
    render() {
        return (
            <View style={styles.dashboardContainer}>
                <View style={[{ margin:15, alignItems:'center' }]}>
                    <View style={[styles.horizontal, { marginTop: 25 }]}>
                        <View>
                            <View style={styles.horizontal}>
                                <Tile onPress={() => this.onTilePress(routes.meeting)} icon="calendar-check-o" text="Meeting" scale="small"  />
                                <Tile onPress={() => this.onTilePress(routes.calendar)} icon="calendar" text="Calendar" />
                            </View>
                            <Tile scale="large" style={{ alignItems: 'stretch' }} onPress={() => this.onTilePress(routes.meeting)}>
                                <View style={{flexDirection: 'column', alignItems: 'stretch', flex: 1}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={styles.userProfileWrapperLeft}>
                                            <Text style={{color:'#2A5488'}}>Next </Text>
                                        </View>
                                        <View style={[styles.userProfileWrapperLeft, {flex: 1, backgroundColor:'#DBE7F5', alignItems: 'flex-end'}]}>
                                            <Text style={{color:'#2A5488'}}>10:00 AM</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.userProfileWrapper, {flex: 1}]}>
                                        <View style={{backgroundColor:'#FFF', width: 80, justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'}} style={styles.profileImage} />
                                        </View>
                                        <View style={styles.profileInfoWrapper}>
                                            <Text style={styles.name}>Jack Nicholson</Text>
                                            <View style={styles.profileItemWrapper}>
                                                <Icon name="envelope" size={18} color="#B5C8E2" />
                                                <Text style={styles.profileItem}>johny@test.com</Text>
                                            </View>
                                            <View style={styles.profileItemWrapper}>
                                                <Icon name="phone" size={18} color="#B5C8E2" />
                                                <Text style={styles.profileItem}>+27 78 669 2347</Text>
                                            </View>
                                            <View style={styles.profileItemWrapper}>
                                                <Icon name="map-marker" size={18} color="#B5C8E2" />
                                                <Text style={styles.profileItem}>Hollywood, California</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Tile>
                            <View style={styles.horizontal}>
                                <Tile  onPress={() => this.onTilePress(routes.splashScreen)} icon="cog" text="Settings" />
                                <Tile icon="user" text="Clients" />
                            </View>
                            <View style={styles.horizontal}>
                                <Tile icon="comments-o" text="Feedback" />
                                <Tile icon="check-square-o" text="Survey" />
                            </View>
                        </View>
                        <View>
                            <Tile scale="extraLarge">
                                <Image source={require('../../../resources/images/chart.png')} style={{flex: 1, width: 240, height: 100}}>
                                </Image>
                            </Tile>
                            <View style={styles.horizontal}>
                                <Tile icon="list-alt" text="Questionaire" />
                                <Tile>
                                    <Text>Wednsday, 11:19:05</Text>
                                    <Text style={{fontSize: 20, marginTop: 4}}>October</Text>
                                    <Text style={{fontSize: 35}}>28</Text>
                                    <Text style={{fontSize: 20}}>2015</Text>
                                </Tile>
                            </View>
                            <View style={styles.horizontal}>
                                <Tile scale="large">
                                    <View style={styles.searchTileWrapper}>
                                        <Icon name="search" size={65} color="#F03552" style={{marginLeft: 10}}/>
                                        <View style={{flexDirection: 'column'}}>
                                            <Text style={{fontSize: 18}}>Search</Text>
                                            <Text>Search people or meeting here...</Text>
                                        </View>
                                    </View>
                                </Tile>
                            </View>
                        </View>
                        <Tile scale="fullColumn" style={{alignItems:'stretch'}}>
                            <NotificationBar />
                        </Tile>
                    </View>
                </View>
                <View style={styles.copyrightBanner}>
                    <Text>Powered By - e-Gov LLC </Text>
                </View>
            </View>
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

module.exports = Dashboard;
