
import React, { View, Text, StyleSheet, Component, ListView, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Sidebar from '../app/sidebar';
import ScheduleList from './scheduleList';
import ScheduleSidebar from './scheduleSidebar';
import ScheduleStore from '../../stores/scheduleStore';
import ProfileDetails from '../users/profileDetails';
import Timeline from '../meeting/timeline';
import Attachments from '../app/attachments';

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
        };
        this.store.getSchedule(new Date())
    }
    onScheduleLoaded(data) {
        this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(data)
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
        let component = (<ScheduleContentArea schedule={this.state.schedule} />);
        if(this.state.schedule == null)
            component = null;
        return (
            <View style={styles.container}>
                <Sidebar />
                <ScheduleSidebar
                    isLoading = {this.state.isLoading}
                    scheduleDate={this.state.scheduleDate}
                    onDaySelected={this.onDateChanged.bind(this)}
                    dataSource={this.state.dataSource}
                    onSchedulePress={this.onSchedulePress.bind(this)} />
                {component}
            </View>
        );
    }
}
const contentTypes =  ["Notes", "Summary", "Minutes Of Meeting"];
class ScheduleContentArea extends Component {
    constructor(args) {
        super(args);
        this.state = {
            selectedTabIndex: 1,
            content: null
        };
        if(this.props.schedule && this.props.schedule.ActualMeetings.length > 0) {
            let types  = contentTypes[this.state.selectedTabIndex - 1].replace(/\s/gi,"");
            this.state.content = this.props.schedule.ActualMeetings[0][types];
        }
    }
    componentWillReceiveProps() {
        if(this.props.schedule && this.props.schedule.ActualMeetings.length > 0) {
            let types  = contentTypes[this.state.selectedTabIndex - 1].replace(/\s/gi,"");
            this.setState({ content: this.props.schedule.ActualMeetings[0][types] });
        }
    }
    onTabPress(index) {
        let content = null;
        if(this.props.schedule && this.props.schedule.ActualMeetings.length > 0) {
            let types  = contentTypes[this.state.selectedTabIndex - 1].replace(/\s/gi,"");
            content = this.props.schedule.ActualMeetings[0][types];
        }
        this.setState({ selectedTabIndex: index, content: content });
    }
    renderContent() {
        if(this.state.content == null) {
            let message = "No " + contentTypes[this.state.selectedTabIndex - 1] + " Found."
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Notification message={message} />
                </View>
            );
        }
        else {
            return (<Text>{this.state.content}</Text>)
        }
    }
    render() {
        return (
            <View style={{flex:1, flexDirection:'column', alignItems:'stretch'}}>
                <View style={styles.meetingHeader}>
                    <View style={styles.coverContainer}>
                        <Text style={styles.coverText}>{moment(this.props.schedule.DateOfMeeting).format('DD')}</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{this.props.schedule.Subject}</Text>
                        <Text style={styles.titleTime}>{moment(this.props.schedule.DateOfMeeting).format('MMMM, Do dddd, YYYY - hh:mm A')}</Text>
                    </View>
                    <View style={styles.statusWrapper}>
                        <View style={[styles.notification, styles.info]}>
                            <Text style={[styles.notificationText, styles.infoText]}>Go To Meeting Screen</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tabHeaderWrapper}>
                    <Tab onPress={() => this.onTabPress(1)} icon="sticky-note-o" text="NOTES" selected={this.state.selectedTabIndex == 1} />
                    <Tab onPress={() => this.onTabPress(2)} icon="file-text-o" text="SUMMARY" selected={this.state.selectedTabIndex == 2} />
                    <Tab onPress={() => this.onTabPress(3)} icon = "list-alt" text="MINUTES OF MEETING" selected={this.state.selectedTabIndex == 3} />
                </View>
                <View style={styles.tabBodyWrapper}>
                    <View style={{flex:1}}>
                        <View style={[styles.contentArea]}>
                            {this.renderContent()}
                        </View>
                        <View style={{flex:1}}>
                            <View style={styles.attachmentHeader}>
                                <Text>Attachments</Text>
                            </View>
                            <Attachments showToolbar={false} layout="horizontal" meeting={this.props.schedule} />
                        </View>
                    </View>
                    <UserProfile user={this.props.schedule.Clients} />
                </View>
            </View>
        );
    }
}

class Notification extends Component {
    render() {
        return (
            <View style={styles.notification}>
                <Text style={styles.notificationText}>{this.props.message}</Text>
            </View>
        );
    }
}

class Tab extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={[styles.tabHeader, this.props.selected == true ? { borderBottomColor:"rgb(82, 140, 214)" }: {}, this.props.style]}>
                    <Icon name={this.props.icon} size={16} style={{marginTop:1}}/>
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

class UserProfile extends Component {
    constructor(args) {
        super(args);
        this.state = {
            selectedTabIndex: 1
        };
    }
    onTabPress(index) {
        this.setState({ selectedTabIndex: index });
    }
    render() {
        let component = (<ProfileDetails user={this.props.user}/>);
        if(this.state.selectedTabIndex == 2)
            component = (<Timeline user={this.props.user} />);
        return (
            <View style={styles.rightSidebar}>
                <View style={styles.tabHeaderWrapper}>
                    <Tab onPress={() => this.onTabPress(1)} icon = "user" text="PROFILE" selected={this.state.selectedTabIndex == 1} style={{flex:1}} />
                    <Tab onPress={() => this.onTabPress(2)} icon = "calendar" text="HISTORY" selected={this.state.selectedTabIndex == 2} style={{flex:1}} />
                </View>
                <View style={{flex:1}}>
                    {component}
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    notification: {
        backgroundColor: '#fff1a8',
        padding: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#ffce55'
    },
    contentArea: {
        flex:2,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F4F4F4',
        padding: 10
    },
    container: {
        backgroundColor: '#f0f0f0',
        flex: 1,
        flexDirection: 'row'
    },
    meetingHeader: {
        backgroundColor: '#FFF',
        borderBottomColor: '#F4F4F4',
        borderBottomWidth: 1,
        flexDirection: 'row',
        padding: 10
    },
    margin: {
        marginRight:10,
        marginLeft: 10
    },
    topPlaceHolder: {
        height: 40,
        backgroundColor: 'rgb(82, 140, 214)',
    },
    titleContainer: {
        backgroundColor: '#fff',
        padding: 5,
        flex: 1
    },
    title: {
        color: 'rgb(82, 140, 214)',
        fontSize: 30
    },
    titleTime:{
        color: 'rgb(112, 114, 115)',
    },
    coverContainer: {
        height: 70,
        width: 70,
        backgroundColor: 'rgb(82, 140, 214)',
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
        borderBottomWidth:1,
        backgroundColor: '#fff'
    },
    tabHeader: {
        padding:10,
        borderBottomColor:"rgb(255, 255, 255)",
        borderBottomWidth:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabHeaderSelected: {
        borderBottomColor:"rgb(82, 140, 214)"
    },
    tabBodyWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    rightSidebar: {
        width: 250,
        backgroundColor: '#FFF',
        borderLeftColor: '#F4F4F4',
        borderLeftWidth: 1
    },
    attachmentHeader: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F4F4F4',
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderLeftWidth: 5,
        borderLeftColor: '#2dc3e8'
    },
    info: {
        borderLeftColor: '#11a9cc',
        backgroundColor: '#57b5e3'
    },
    infoText: {
        color: "#FFF"
    },
    statusWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15
    }
});

module.exports = Schedule;
