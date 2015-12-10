
import React, { View, Text, StyleSheet, Component, ListView, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Sidebar from '../app/sidebar';
import ScheduleList from './scheduleList';
import UserProfile from '../meeting/userProfile';
import MeetingArea from '../meeting/meetingArea';
import ScheduleSidebar from './scheduleSidebar';
import ScheduleStore from '../../stores/scheduleStore';
import MeetingTitle from '../meeting/meetingTitle';
import UserCard from '../users/userCard';
import PreviousSchedules from './previousSchedules';

class Schedule extends Component {
    constructor(args) {
        super(args);

        this.store = new ScheduleStore();
        this.store.addEventListener('scheduleloaded', this.onScheduleLoaded.bind(this));

        let _dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            isLoading: false,
            scheduleDate: moment(),
            dataSource: _dataSource,
            schedule: {},
            dataSourceWithData: _dataSource.cloneWithRows([]),
            user: { Companies: {}, Countries: {} },
            selectedTabIndex: 1
        };

        this.store.getSchedule(new Date())
    }
    onScheduleLoaded(data) {
        this.setState({ 
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(data),
            user: data[0].Clients
        });
    }
    onSchedulePress(schedule) {
        this.setState({ user: schedule.Clients, schedule: schedule });
    }
    onDateChanged(date) {
        this.setState({ scheduleDate: date, isLoading: true });
        this.store.getSchedule(date._d);
    }
    onTabPress(index) {
        this.setState({ selectedTabIndex: index });
    }
    render() {
        
        return (
            <View style={styles.container}>
                <Sidebar />
                <ScheduleSidebar 
                    isLoading = {this.state.isLoading}
                    scheduleDate={this.state.scheduleDate}
                    onDaySelected={this.onDateChanged.bind(this)} 
                    dataSource={this.state.dataSource} 
                    onSchedulePress={this.onSchedulePress.bind(this)} />
                    <View style={{flex:1}}>
                        <View style={[styles.panel, {height: 90, padding: 0}]}>
                            <View style={styles.topPlaceHolder}>
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{this.state.schedule.Subject}</Text>
                                <Text style={styles.titleTime}>{moment(this.state.schedule.DateOfMeeting).format('MMMM, Do dddd, YYYY - hh:mm A')}</Text>
                            </View>
                            <View style={styles.coverContainer}>
                                <Text style={styles.coverText}>A</Text>
                            </View>
                        </View>
                        <View style={[styles.panel, { flex: 1, padding:0 }]}>
                            <View style={styles.tabHeaderWrapper}>
                                <TouchableWithoutFeedback onPress={() => this.onTabPress(0)}>
                                    <View style={[styles.tabHeader, this.state.selectedTabIndex == 0 ? { borderBottomColor:"rgb(82, 140, 214)" }: {}]}>
                                        <Text>INFO</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.onTabPress(1)}>
                                    <View style={[styles.tabHeader, this.state.selectedTabIndex == 1 ? { borderBottomColor:"rgb(82, 140, 214)" }: {}]}>
                                        <Text>NOTES</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.onTabPress(2)}>
                                    <View style={[styles.tabHeader, this.state.selectedTabIndex == 2 ? { borderBottomColor:"rgb(82, 140, 214)" }: {}]}>
                                        <Text>SUMMARY</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.onTabPress(3)}>
                                    <View style={[styles.tabHeader, this.state.selectedTabIndex == 3 ? { borderBottomColor:"rgb(82, 140, 214)" }: {}]}>
                                        <Text>MINUTES</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={[styles.panel, this.tabBodyWrapper]}>
                         
                        </View>
                    </View>
                <View style={{width: 300}}>
                        <View style={[styles.panel, styles.margin]}>
                            <UserCard user={{ FirstName: 'Muhammed', 
                            LastName:'Jasim', Email: 'jasimea@gmail.com',
                            Mobile: '+971 52 867 0788', Location: 'Deira, Dubai, UAE'
                        }} />
                        </View>
                        <View style={[styles.panel, {flex:1, marginBottom: 10}, styles.margin]}>
                            <PreviousSchedules />
                        </View>
                    </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        flexDirection: 'row'
    },
    panel: {
        backgroundColor: '#FFF',
        borderColor: '#ECECEC',
        borderWidth: 1,
        padding: 10,
        marginTop:10
    },
    margin: {
        marginRight:10, 
        marginLeft: 10
    },
    topPlaceHolder: {
        height: 40, 
        backgroundColor: 'rgb(82, 140, 214)', 
        position:'absolute', 
        top: 0, 
        left: 0, 
        right: 0
    },
    titleContainer: {
        height: 60, 
        backgroundColor: '#fff', 
        paddingLeft: 100, 
        paddingTop: 5,
        position:'absolute', 
        top: 40, 
        left: 0, 
        right: 0
    },
    title: {
        color: 'rgb(82, 140, 214)',
        fontSize: 20
    },
    titleTime:{
        color: 'rgb(112, 114, 115)',
    },
    coverContainer: {
        height: 70, 
        width: 70, 
        backgroundColor: 'rgb(82, 140, 214)', 
        left: 20, 
        top: 10, 
        position: 'absolute', 
        borderWidth: 5,
        borderColor:'#FFF', 
        alignItems: 'center', 
        justifyContent:'center',
        borderRadius:0,
    },
    coverText: {
        color:'#FFF', 
        fontSize: 40, 
        fontWeight:'bold',
    },
    tabHeaderWrapper: {
        flexDirection:'row', 
        borderBottomColor:'#F4F4F4', 
        borderBottomWidth:1
    },
    tabHeader: {
        padding:10, 
        borderBottomColor:"rgb(255, 255, 255)",
        borderBottomWidth:5
    },
    tabHeaderSelected: {
        borderBottomColor:"rgb(82, 140, 214)"
    },
    tabBodyWrapper: {
        height: 160, 
        marginBottom: 10
    }
});

module.exports = Schedule;
