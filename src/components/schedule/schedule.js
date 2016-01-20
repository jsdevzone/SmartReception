'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */

/**
 * @npmdependencies
 */
import React, { StyleSheet, Text, View, Image, TouchableHighlight, ListView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

/**
 * @componentImports
 */
import Sidebar from '../app/sidebar';
import ScheduleList from './scheduleList';
import ScheduleSidebar from './scheduleSidebar';
import ProfileDetails from '../users/profileDetails';
import Timeline from '../meeting/timeline';
import Attachments from '../app/attachments';
import Meeting from '../meeting/meeting';

// Stores
import ScheduleStore from '../../stores/scheduleStore';

// Three types of contents in a meeting
const contentTypes =  ["Notes", "Summary", "Minutes Of Meeting"];

/**
 * @class Scheule
 * @extends React.Component
 *
 * Schedule Search Screen With Calendar And Details
 *
 * @props {Navigator} navigator
 */
export default class Schedule extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);

        let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

         /**
         * @state
         */
        this.state = {
            isLoading: false,
            scheduleDate: Moment(),
            dataSource: dataSource,
            schedule: {},
            dataSourceWithData: dataSource.cloneWithRows([]),
        };

        /**
         * Loads today's schedules on load of the component
         */
        this.getSchedules(new Date());
    }

    /**
     * Loads the schedules to list of specific days
     * @param {Date} date
     * @return {Void} undefined
     */
    getSchedules(date) {
        ScheduleStore
            .getSchedules(1, date)
            .then(this.onScheduleLoaded.bind(this));
    }

    /**
     * Event handler for schedule loaded from the server.
     *
     * @eventhandler
     * @param {Array<Meetings>} data
     * @return {Void} undefined
     */
    onScheduleLoaded(data) {
        this.setState({isLoading: false, dataSourceWithData: this.state.dataSource.cloneWithRows(data) });
    }

    /**
     * Event handler - When user press on a schedule from the schedule list .
     *
     * @eventhandler
     * @param {Meeting} schedule
     * @return {Void} undefined
     */
    onSchedulePress(schedule) {
        this.setState({ user: schedule.Clients, schedule: schedule });
    }

    /**
     * Event handler - When user tap a date from the calendar.
     *
     * @eventhandler
     * @param {Date} date
     * @return {Void} undefined
     */
    onDateChanged(date) {
        this.setState({ scheduleDate: date, isLoading: true });
        this.getSchedules(date._d);
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {Void} undefined
     */
    render() {

        // Default component is ScheduleContentArea
        let component = (<ScheduleContentArea navigator={this.props.navigator} schedule={this.state.schedule} />);

        // If the component state shedule is null, then don't render the default component
        // As there will be chance to error due to lack of the data
        if(this.state.schedule == null)
            component = null;


        return (
            <View style={styles.container}>
                <Sidebar />
                <ScheduleSidebar
                    isLoading = {this.state.isLoading}
                    scheduleDate={this.state.scheduleDate}
                    onDaySelected={this.onDateChanged.bind(this)}
                    dataSource={this.state.dataSourceWithData}
                    onSchedulePress={this.onSchedulePress.bind(this)} />
                {component}
            </View>
        );
    }
}


/**
 * @class ScheduleContentArea
 * @extends React.Component
 *
 * Schedule Details Screen. It's a wrapper for a schedule with client and attachment details
 *
 * @props {Schedule} schedule
 * @props {Navigator} navigator
 */
class ScheduleContentArea extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);

        /**
         * @state
         */
        this.state = {
            selectedTabIndex: 1,
            content: null
        };

        /**
         * We checks if the schedule property is passed and passed schedule has actual meeting.
         * If yes, then set the content according to the currently selected tab type.
         * Tab types are Nots, Summary and Minutes Of Meeting
         */
        if(this.hasActualMeeting()) {
            let types  = contentTypes[this.state.selectedTabIndex - 1].replace(/\s/gi,"");
            this.state.content = this.props.schedule.ActualMeetings[0][types];
        }
    }

    /**
     * Checks if the schedule property is passed and passed schedule has actual meeting.
     * @return {Boolean} hasActualMeeting
     */
    hasActualMeeting() {
        return this.props.schedule && this.props.schedule.ActualMeetings && this.props.schedule.ActualMeetings.length > 0;
    }

    /**
     *  Life cycle method
     *  This method will be called when the component property is updated either from inside or outside the component
     *  See React Js componentWillReceiveProps method.
     *
     *  @lifecycle
     *  @return {Void} undefined
     */
    componentWillReceiveProps() {
        if(this.hasActualMeeting()) {
            let types  = contentTypes[this.state.selectedTabIndex - 1].replace(/\s/gi,"");
            this.setState({ content: this.props.schedule.ActualMeetings[0][types] });
        }
    }

    /**
     * Event handler on tab press.
     *
     * @eventhandler
     * @param {Number} index index of the tab
     * @return {Void} undefined
     */
    onTabPress(index) {
        let content = null;
        if(this.hasActualMeeting()) {
            let types  = contentTypes[this.state.selectedTabIndex - 1].replace(/\s/gi,"");
            content = this.props.schedule.ActualMeetings[0][types];
        }
        this.setState({ selectedTabIndex: index, content: content });
    }


    /**
     * Render the content based on the tab selected. Here content means the Notes, Summary or Minutes Of Meeting
     * @return {View} component
     */
    renderContent() {

        /**
         * If there is no meeting user content found, display a status message
         */
        if(this.state.content == null) {

            let message = "No " + contentTypes[this.state.selectedTabIndex - 1] + " Found."

            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Notification message={message} />
                </View>
            );
        }

        return (<Text>{this.state.content}</Text>)
    }

    move() {
        if(this.props.schedule) {
            this.props.navigator.push({
                id: 'meeting',
                title: 'Meeting',
                component: Meeting,
                props: {
                    meeting: this.props.schedule
                }
            });
        }
    }

    /**
     * Render the header section for selected meeting
     * @return {View} component
     */
    renderMeetingHeader() {
        return (
            <View style={styles.meetingHeader}>
                <View style={styles.coverContainer}>
                    <Text style={styles.coverText}>{Moment(this.props.schedule.DateOfMeeting).format('DD')}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{this.props.schedule.Subject}</Text>
                    <Text style={styles.titleTime}>{Moment(this.props.schedule.DateOfMeeting).format('MMMM, Do dddd, YYYY - hh:mm A')}</Text>
                </View>
                <View style={styles.statusWrapper}>
                    <TouchableWithoutFeedback onPress={this.move.bind(this)}>
                        <View style={[styles.notification, styles.info]}>
                            <Text style={[styles.notificationText, styles.infoText]}>Go To Meeting Screen</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {Void} undefined
     */
    render() {
        return (
            <View style={{flex:1, flexDirection:'column', alignItems:'stretch'}}>
                { this.renderMeetingHeader() }
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


/**
 * @class Notification
 * @extends React.Component
 *
 * Small Notification Panel shows a meesage to user
 *
 * @props {String} message
 */
class Notification extends React.Component {

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {Void} undefined
     */
    render() {
        return (
            <View style={styles.notification}>
                <Text style={styles.notificationText}>{this.props.message}</Text>
            </View>
        );
    }
}

/**
 * @class Tab
 * @extends React.Component
 *
 * Tab Stripe used internally in schedule content area.
 *
 * @props {Function} onPress
 * @props {Boolean} selected
 * @props {StyleSheet} style
 * @props {String} icon
 * @props {String} text
 */
class Tab extends React.Component {

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {Void} undefined
     */
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>

                <View style={[
                    styles.tabHeader,
                    this.props.selected == true ? { borderBottomColor:"rgb(82, 140, 214)" }: {},
                    this.props.style]}>

                    <Icon name={this.props.icon} size={16} style={{marginTop:1}}/>
                    <Text>{this.props.text}</Text>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}

/**
 * @class UserProfile
 * @extends React.Component
 *
 * Client details on right side panel
 *
 * @props {Client} user
 */
class UserProfile extends React.Component {

     /**
     * @constructor
     */
    constructor(args) {
        super(args);

        /**
         * @state
         */
        this.state = {
            selectedTabIndex: 1
        };
    }

    /**
     * Event handler - on tab item press
     *
     * @eventhandler
     * @param {Number} index
     * @return {Void} undefined
     */
    onTabPress(index) {
        this.setState({ selectedTabIndex: index });
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {Void} undefined
     */
    render() {
        let component = (<ProfileDetails user={this.props.user || { Countries: {}, Companies: {} }}/>);

        if(this.state.selectedTabIndex == 2)
            component = (<Timeline user={this.props.user || { Countries: {}, Companies: {} }} />);

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

/**
 * @style
 */
const styles = StyleSheet.create({
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
