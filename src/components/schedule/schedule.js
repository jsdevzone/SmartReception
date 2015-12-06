
import React, { View, Text, StyleSheet, Component, ListView, Image, } from 'react-native';
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
            schedule: null,
            dataSourceWithData: _dataSource.cloneWithRows([]),
            user: {
                Companies: {},
                Countries: {}
            }
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
                                <Text style={styles.title}>Meeting Title Goes Here</Text>
                                <Text style={styles.titleTime}>{moment().format('MMMM, Do dddd, YYYY - hh:mm A')}</Text>
                            </View>
                            <View style={styles.coverContainer}>
                                <Text style={styles.coverText}>A</Text>
                            </View>
                        </View>
                        <View style={[styles.panel, {flex: 1, padding:0}]}>
                        <View style={{flexDirection:'row', borderBottomColor:'#F4F4F4', borderBottomWidth:1}}>
                        <View style={{padding:10, borderBottomColor:"rgb(255, 255, 255)",borderBottomWidth:5}}>
                        <Text>INFO</Text>
                        </View>
                        <View style={{padding:10, borderBottomColor:"rgb(255, 255, 255)",borderBottomWidth:5}}>
                        <Text>NOTES</Text>
                        </View>

                        <View style={{padding:10, borderBottomColor:"rgb(255, 255, 255)",borderBottomWidth:5}}>
                        <Text>SUMMARY</Text>
                        </View>
                        <View style={{padding:10, borderBottomColor:"rgb(82, 140, 214)",borderBottomWidth:5}}>
                        <Text>MINUTES</Text>
                        </View>
                        </View>
                        </View>
                        <View style={[styles.panel, {height: 160, marginBottom: 10}]}>
                            <View style={{flexDirection:'row', flex: 1}}>
                                    <Image style={{flex:1}} source={{uri: 'https://kmeelbert.files.wordpress.com/2013/11/famous026.jpg'}} />
                                    <Image style={{flex:1}} source={{uri: 'http://i.telegraph.co.uk/multimedia/archive/02287/Stonehenge_2287890i.jpg'}} />
                                    <Image style={{flex:1}} source={{uri: 'http://www.newkidscenter.com/images/10415715/Statue_of_Liberty.jpg'}} />
                                    <Image style={{flex:1}} source={{uri: 'http://images.huffingtonpost.com/2014-08-27-DeadliestLandmarks_2.jpeg'}} />
                                </View>
                                <View style={{flexDirection:'row', flex: 1}}>
                                <Image style={{flex:1}} source={{uri: 'http://www.newkidscenter.com/images/10415715/Statue_of_Liberty.jpg'}} />
                                    <Image style={{flex:1}} source={{uri: 'http://images.huffingtonpost.com/2014-08-27-DeadliestLandmarks_2.jpeg'}} />
                                    <Image style={{flex:1}} source={{uri: 'https://tce-live2.s3.amazonaws.com/media/media/cdf70c98-f09f-47c2-8680-9e3f1604f0d6.jpg'}} />
                                    <Image style={{flex:1, alignItems: 'center', justifyContent: 'center'}} source={{uri: 'http://images.familyvacationcritic.com/article_slideshows/398e279d153aa27097f0fecc39a16862.jpg'}}>
                                        <Text style={{color: '#FFF'}}>More Images</Text>
                                    </Image>
                                </View>
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
    }
});

module.exports = Schedule;
