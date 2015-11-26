/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MeetingSidebar from './meetingSidebar';
import Calendar from '../ux/calendar';
import MeetingIntro from './meetingIntro';
import Notes from './notes';
import MeetingTitle from './meetingTitle';
import AppStore from '../../stores/appStore';
import Attachments from '../app/attachments';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  ListView,
} = React;



class MeetingArea extends React.Component{
    constructor(args){
        super(args);
        this.state = { selectedTabIndex: 1 };
    }
    onTabPress(index) {
        this.setState({ selectedTabIndex: index});
    }
    render() {
        return (
            <View style={styles.container}>
                <MeetingTitle meeting={this.props.meeting} />
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex:1,flexDirection:'column'}}>
                        <View style={styles.tabWrapper}>
                            <TouchableWithoutFeedback onPress={()=>this.onTabPress(1)}>
                                <View style={styles.tab}>
                                    <Icon name="user" size={18} style={{ color: this.state.selectedTabIndex == 1 ? '#6477C1': '#A4C1E8'   }} />
                                <Text style={[styles.tabText, this.state.selectedTabIndex == 1 ? styles.tabSelected : {}]}>NOTES</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>this.onTabPress(2)}>
                                <View style={styles.tab}>
                                    <Icon name="clock-o" size={18} style={{ color: this.state.selectedTabIndex == 2 ? '#6477C1': '#A4C1E8'   }} />
                                    <Text style={[styles.tabText, this.state.selectedTabIndex == 2 ? styles.tabSelected : {}]}>SUMMARY</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>this.onTabPress(3)}>
                                <View style={[styles.tab]}>
                                    <Icon name="image" size={18} style={{ color: this.state.selectedTabIndex == 3 ? '#6477C1': '#A4C1E8'   }}/>
                                    <Text style={[styles.tabText, this.state.selectedTabIndex == 3 ? styles.tabSelected : {}]}>MINUTES OF MEETING</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>this.onTabPress(4)}>
                                <View style={[styles.tab, { borderRightWidth: 0 }]}>
                                    <Icon name="image" size={18} style={{ color: this.state.selectedTabIndex == 4 ? '#6477C1': '#A4C1E8'   }} />
                                    <Text style={[styles.tabText, this.state.selectedTabIndex == 4 ? styles.tabSelected : {}]}>ATTACHMENTS</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
                            {(() => {
                                switch(this.state.selectedTabIndex) {
                                    case 1:
                                        return (<Notes />);
                                    case 4:
                                        return (<Attachments />);
                                    default:
                                        return (<View><Text>{this.state.selectedTabIndex}</Text></View>);
                                }
                            })()}
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

class Button extends React.Component {
    onPress() {
        AppStore.logoff();
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={[styles.button, this.props.style]}>
                    <Icon name={this.props.icon} size={30} />
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>
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
    tabSelected: {
        color: '#6477C1'
    }
});

module.exports = MeetingArea;
