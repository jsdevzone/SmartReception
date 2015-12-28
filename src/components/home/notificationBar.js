'use strict';

import React, { StyleSheet, Text, View, Image, TouchableWithoutFeedback, 
    TouchableNativeFeedback, ListView, TouchableHighlight,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import Meeting from '../meeting/meeting';
import ScheduleList from '../schedule/scheduleList';
import ScheduleStore from '../../stores/scheduleStore';
import LoadMask from '../app/loadMask';

export class NotificationBar extends React.Component {
    constructor(args) {
        super(args);

        // Should rewrite this part in good arechetecture
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var data = [];

        this.store = new ScheduleStore();
        this.store.on('gettodayschedules', (json)=>{
            this.setState({dataSource: dataSource.cloneWithRows(json), isLoading:false})
        });

        this.store.on('scheduleloaded', (json)=>{
            this.setState({dataSource: dataSource.cloneWithRows(json), isLoading: false})
        });
        this.store.getTodaySchedules();

        // End of part

        this.state = {
            selectedTabIndex: 0,
            dataSource: dataSource.cloneWithRows(data),
            isLoading: true
        };
    }

    onSchedulePress(meeting) {
        this.props.navigator.push({ title: 'Meeting', id: 'meeting', component: Meeting, props: {
            meeting: meeting
        }});
    }

    onTabPress(idx) {
        this.setState({ selectedTabIndex: idx, isLoading: true });
        this.store.getSchedule(Moment().add(idx, 'days').format('YYYY-MM-DD'));
    }
    render() {
        return (
            <View style={styles.notificationTile}>
                <View style={styles.statusContainer}>
                    <View style={{ flex:1 }} />
                    <View style={{ flexDirection: 'row'}}>
                        <Icon name="clock-o" size={12}  style={{ color: '#FF6335', marginRight: 4}} />
                        <Text style={{ color: '#515151', fontSize: 11 }}>{Moment().format('MMMM Do YYYY')}</Text>
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
                <Image source={require('../../../resources/images/fancy_separator.png')} style={{width: 350, height: 30}} />
                <View style={styles.tabStripWrapper}>
                    <TouchableHighlight onPress={this.onTabPress.bind(this, 0)} style={styles.tabWrapper}>
                        <View style={[styles.tab, this.state.selectedTabIndex == 0 ? styles.tabSelected : null]}>
                            <Text style={styles.tabText}>Today</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onTabPress.bind(this, 1)} style={styles.tabWrapper}>
                        <View style={[styles.tab, this.state.selectedTabIndex == 1 ? styles.tabSelected : null]}>
                            <Text style={styles.tabText}>{Moment().add(1, 'days').format('dddd')}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onTabPress.bind(this, 2)} style={styles.tabWrapper}>
                        <View style={[styles.tab, this.state.selectedTabIndex == 2 ? styles.tabSelected : null]}>
                            <Text style={styles.tabText}>{Moment().add(2, 'days').format('dddd')}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {(() => {
                    if(this.state.isLoading) {
                        return (<LoadMask />);
                    }
                    else
                    {
                        return (<ScheduleList dataSource = {this.state.dataSource} {...this.props} onSchedulePress={this.onSchedulePress.bind(this)}/>);
                    }
                })()}
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
    tabWrapper: {
        flex: 1
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
