/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');
var Tile = require('./tileBlock');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
} = React;


import { NotificationBar } from './notificationBar';
import { getRandomColor, } from '../../utils/util';

class Dashboard extends React.Component{
    constructor(args){
        super(args);
    }
    render() {
        return (
            <View style={styles.dashboardContainer}>
                <View style={[{ margin:15, alignItems:'center' }]}>
                    <View style={[styles.horizontal, { marginTop: 25 }]}>
                        <View>
                            <View style={styles.horizontal}>
                                <Tile icon="home" text="Home" scale="small"  />
                                <Tile icon="calendar-check-o" text="Schedule" />
                            </View>
                            <Tile scale="large">
                                <Text style={{fontSize: 55, color: '#BC1C48'}}>1</Text>
                                <Text style={{fontSize: 18}}>Client</Text>
                                <Text>Waiting in Waiting Area </Text>
                            </Tile>
                            <View style={styles.horizontal}>
                                <Tile icon="cog" text="Settings" />
                                <Tile icon="calendar" text="Calendar" />
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
});

module.exports = Dashboard;
