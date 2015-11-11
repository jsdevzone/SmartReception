'use strict';

var React = require('react-native');

var Animatable = require('react-native-animatable');
var Icon = require('react-native-vector-icons/FontAwesome');

import { UserList } from '../users/userList';
import { getCurrentDateFormatted, getDayName, } from '../../utils/util';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ToastAndroid,
  ListView,
  TouchableHighlight,
} = React;


export class NotificationBar extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            selectedTabIndex: 0
        };
    }
    onTabPress(idx) {
        this.setState({ selectedTabIndex: idx });
    }
    render() {
        return (
            <View style={styles.notificationTile}>
                <View style={styles.statusContainer}>
                    <View style={{ flex:1 }}></View>
                    <View style={{ flexDirection: 'row'}}>
                        <Icon name="clock-o" size={12}  style={{ color: '#FF6335', marginRight: 4}} />
                        <Text style={{ color: '#515151', fontSize: 11 }}>{getCurrentDateFormatted()}</Text>
                    </View>
                    <View style={styles.visibility}>
                        <Text style={{fontSize: 11, color: '#FFF' }}>Online</Text>
                    </View>
                </View>
                <View style={styles.counterContainer}>
                    <View style={styles.counter}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="calendar" size={15} />
                            <Text style={{ marginLeft: 5, fontStyle: 'bold', color: '#423E39' }}>5,256</Text>
                        </View>
                        <View>
                            <Text style={{color:'#AEA3B0', size: 6}}>messages</Text>
                        </View>
                    </View>
                    <View style={styles.counter}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="calendar" size={15} />
                            <Text style={{ marginLeft: 5, fontStyle: 'bold', color: '#423E39' }}>5,256</Text>
                        </View>
                        <View>
                            <Text style={{color:'#AEA3B0', size: 6}}>messages</Text>
                        </View>
                    </View>
                    <View style={styles.counter}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="calendar" size={15} />
                            <Text style={{ marginLeft: 5, fontStyle: 'bold', color: '#423E39' }}>5,256</Text>
                        </View>
                        <View>
                            <Text style={{color:'#AEA3B0', size: 6}}>pendings</Text>
                        </View>
                    </View>
                </View>
                <Image source={require('image!fancy_separator')} style={{width: 350, height: 30}} />
                <View style={styles.tabStripWrapper}>
                    {(()=>{
                        var array = [];
                        var d = new Date();
                        var dates=[];
                        if(d.getDay() > 4) {
                            dates.push({ name: "Sunday", date: new Date() });
                            dates.push({ name: "Monday", date: new Date() }),
                            dates.push({ name: "Tuesday", date: new Date() });
                        }
                        else {
                            if(d.getDay() + 1 > 4) {
                                dates.push({ name: "Today", date: new Date() });
                                dates.push({ name: "Tomorrow", date: new Date() }),
                                dates.push({ name: "Sunday", date: new Date() });
                            }
                            else {
                                var day = getDayName(d.getDay() + 2)
                                dates.push({ name: "Today", date: new Date() });
                                dates.push({ name: "Tomorrow", date: new Date() }),
                                dates.push({ name: ""+day+"", date: new Date() });
                            }
                        }


                        for(var i = 0; i < dates.length; i++) {
                            array.push(
                                <TouchableWithoutFeedback onPress={this.onTabPress.bind(this, i)}>
                                    <View style={[styles.tab, this.state.selectedTabIndex == i ? styles.tabSelected : null]}>
                                        <Text style={styles.tabText}>{dates[i].name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }
                        return array;
                    })()}
                </View>
                <UserList />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    notificationTile: {
        flexDirection:'column',
        alignItems:'stretch',
        flex: 1
    },
    statusContainer: {
      flexDirection:'row',
      padding: 10,
    },
    visibility: {
        backgroundColor: '#4CAF50',
        color: '#FFF',
        padding: 2,
        fontSize: 10,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#4CAF50',
        marginLeft: 10
    },
    counterContainer: {
        padding: 15,
        flexDirection: 'row',
        paddingLeft: 25,
        paddingRight: 25,
    },
    counter: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    tabStripWrapper: {
        flexDirection: 'row',
        backgroundColor: '#5C6BC0',
        borderTopColor: '#7481CE',
        borderTopWidth: 1
    },
    tab: {
        padding: 13,
        alignItems: 'center',
        flex: 1
    },
    tabText: {
        color: '#FFF'
    },
    tabSelected: {
        backgroundColor: '#5361AD'
    }
});
