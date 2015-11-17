/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');
var MeetingSidebar = require('./meetingSidebar');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ListView,
} = React;

import Calendar from '../ux/calendar';
import MeetingIntro from './meetingIntro';

class MeetingArea extends React.Component{
    constructor(args){
        super(args);
    }
    renderRow(rowData) {
        return(
            <View style={styles.timeline}>
                <View style={styles.tmLeft}>
                    <Icon name={rowData.icon} color="#5FB9CD" size={24} />
                    <Text style={styles.tmTimeText}>{rowData.time}</Text>
                </View>
                <View style={styles.tmLine}>
                    <View style={styles.tmLineTop}>
                    </View>
                    <View style={styles.tmLineSeparator}>
                    </View>
                    <View style={styles.tmLineBottom}>
                    </View>
                </View>
                <View style={styles.tmInfoWrapper}>
                    <View style={styles.tmInfo}>
                        <View style={styles.row}>
                            <Text style={styles.tmDate}>{rowData.date}</Text>
                            <View style={styles.tmDayMonthWrapper}>
                                <Text style={styles.tmDay}>{rowData.day}</Text>
                                <Text style={styles.tmMonth}>{rowData.month}</Text>
                            </View>
                        </View>
                        <View style={styles.tmTitle}>
                            <Text style={styles.tmTitleText}>{rowData.title}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <MeetingTitle />
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex:1,flexDirection:'column'}}>
                        <View style={styles.tabWrapper}>
                            <View style={styles.tab}>
                                <Icon name="user" size={18} color="#A4C1E8" />
                                <Text style={styles.tabText}>NOTES</Text>
                            </View>
                            <View style={styles.tab}>
                                <Icon name="clock-o" size={18} color="#A4C1E8" />
                                <Text style={styles.tabText}>SUMMARY</Text>
                            </View>
                            <View style={[styles.tab]}>
                                <Icon name="image" size={18} color="#A4C1E8" />
                                <Text style={styles.tabText}>MINUTES OF MEETING</Text>
                            </View>
                            <View style={[styles.tab, { borderRightWidth: 0 }]}>
                                <Icon name="image" size={18} color="#A4C1E8" />
                                <Text style={styles.tabText}>ATTACHMENTS</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
                            <MeetingIntro />
                        </View>
                        <View style={styles.footer}>
                            <Button icon="envelope" text="Email Minutes Of Meeting" />
                            <Button icon="comments-o" text="Feedback" />
                            <Button icon="list-alt" text="Questionaire" />
                            <Button icon="check-square-o" text="Survey" />
                            <Button icon="exchange" text="Transfer" />
                            <Button icon="check" text="Finish Meeting" style={{flex:1, borderRightWidth:0}} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

class MeetingTitle extends React.Component {
    render() {
        return (
            <View style={styles.meetingTitle}>
                <View style={styles.meetingTitleInner}>
                    <View style={styles.meetingTitleTextWrapper}>
                        <Text style={styles.meetingTitleText} >Project 1 - Company 1</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name="calendar" style={{marginTop: 3}} />
                            <Text> Tuesday, October 27, 2015 </Text>
                            <Icon name="clock-o" style={{marginTop: 3, marginLeft: 30}} />
                            <Text>07: 00- 09: 00 </Text>
                        </View>
                    </View>
                    <View style={styles.currentDateWrapper}>
                        <Text style={styles.currentWeekText}>Tuesday</Text>
                        <Text style={styles.currentDateText}>27</Text>
                    </View>
                </View>
            </View>
        );
    }
}

class Button extends React.Component {
    render() {
        return (
            <View style={[styles.button, this.props.style]}>
                <Icon name={this.props.icon} size={30} />
                <Text>{this.props.text}</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRightColor: '#D8E0F1',
        borderRightWidth: 1,
        margin: 5
    },
    footer: {
        backgroundColor:'#F0F1F3',
        borderTopColor: '#D8E0F1',
        borderTopWidth: 1,
        height: 75,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    meetingTitle: {
        backgroundColor: '#EAEEF5',
        borderBottomColor: '#D8E0F1',
        borderBottomWidth: 1,
    },
    meetingTitleInner: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    currentDateWrapper: {
        flexDirection: 'column',
        padding: 5,
        textAlign: 'center',
        borderColor: "#D8E0F1",
        borderLeftWidth: 1,
        paddingRight: 25,
        paddingLeft: 25,
        marginTop: 10
    },
    currentDateText: {
        fontSize: 35,
    },
    currentWeekText: {
        fontSize: 18,
        color: "#000"
    },
    meetingTitleTextWrapper: {
        padding: 10,
        flex: 1
    },
    meetingTitleText: {
        fontSize: 28,
        marginBottom: 10
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
    },
});

module.exports = MeetingArea;
