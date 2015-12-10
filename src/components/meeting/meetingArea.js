/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React, {  StyleSheet, Text, View, Image, TouchableHighlight,
  TouchableWithoutFeedback, TextInput, ListView, NativeModules, } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Notes from './notes';
import Summary from './summary';
import MinutesOfMeeting from './minutesOfMeeting';
import MeetingTitle from './meetingTitle';
import AppStore from '../../stores/appStore';
import Attachments from '../app/attachments';
import DialogAndroid from 'react-native-dialogs';
import MeetingStatus from '../../constants/meetingStatus';

class MeetingArea extends React.Component{
    constructor(args){
        super(args);
        this.state = { selectedTabIndex: 1, isRecording: false };
        if(AppStore.isRecording)
            this.state.isRecording = true;
    }
    onTabPress(index) {
        this.setState({ selectedTabIndex: index});
    }
    onMeetingUpdate(meeting) {
        AppStore.updateActualMeeting(meeting);
    }
    onFinishPress() {
        if(AppStore.getCurrentMeetingId() == this.props.meeting.BookedMeetingId) {
            let dialog = new DialogAndroid();
            let options = { 
                title: 'Confirm', 
                content: 'Are you sure want to finish current meeting?' ,
                positiveText: 'Yes',
                negativeText: 'No',
                onPositive: () => AppStore.finishCurrentMeeting()
            };
            dialog.set(options);
            dialog.show();      
        }
    }
    postMeeting() {
        let dialog = new DialogAndroid();
        let options = { 
            title: 'Confirm', 
            content: 'Are you sure ?' ,
            positiveText: 'Yes',
            negativeText: 'No',
            onPositive: () => AppStore.postMeeting(this.props.meeting)
        };
        dialog.set(options);
        dialog.show();      
    }
    recordAudio() {
        this.setState({ isRecording: true });
        AppStore.isRecording = true;
        NativeModules.MediaHelper.startRecording() 
    }
    stopRecording() {
        this.setState({ isRecording: false });
        AppStore.isRecording = false;
        NativeModules.MediaHelper.stopRecording() 
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
                                    <Icon name="sticky-note-o" size={18} style={{ color: this.state.selectedTabIndex == 1 ? '#6477C1': '#A4C1E8'   }} />
                                    <Text style={[styles.tabText, this.state.selectedTabIndex == 1 ? styles.tabSelected : {}]}>NOTES</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>this.onTabPress(2)}>
                                <View style={styles.tab}>
                                    <Icon name="file-text-o" size={18} style={{ color: this.state.selectedTabIndex == 2 ? '#6477C1': '#A4C1E8'   }} />
                                    <Text style={[styles.tabText, this.state.selectedTabIndex == 2 ? styles.tabSelected : {}]}>SUMMARY</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>this.onTabPress(3)}>
                                <View style={[styles.tab]}>
                                    <Icon name="list-alt" size={18} style={{ color: this.state.selectedTabIndex == 3 ? '#6477C1': '#A4C1E8'   }}/>
                                    <Text style={[styles.tabText, this.state.selectedTabIndex == 3 ? styles.tabSelected : {}]}>MINUTES OF MEETING</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>this.onTabPress(4)}>
                                <View style={[styles.tab, { borderRightWidth: 0 }]}>
                                    <Icon name="paperclip" size={18} style={{ color: this.state.selectedTabIndex == 4 ? '#6477C1': '#A4C1E8'   }} />
                                    <Text style={[styles.tabText, this.state.selectedTabIndex == 4 ? styles.tabSelected : {}]}>ATTACHMENTS </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
                            {(() => {
                                switch(this.state.selectedTabIndex) {
                                    case 1:
                                        return (<Notes {...this.props} onMeetingUpdate={this.onMeetingUpdate.bind(this)} />);
                                    case 2:
                                        return (<Summary {...this.props}  onMeetingUpdate={this.onMeetingUpdate.bind(this)}/>);
                                    case 3:
                                        return (<MinutesOfMeeting {...this.props} onMeetingUpdate={this.onMeetingUpdate.bind(this)}/>);
                                    case 4:
                                        return (<Attachments {...this.props} />);
                                }
                            })()}
                        </View>
                        <View style={styles.footer}>
                            {(()=>{
                                if(!this.state.isRecording) {
                                    return (<Button icon="microphone" text="Record Audio" onPress={this.recordAudio.bind(this)} />);
                                }
                                else {
                                    return (<Button icon="stop" text="Stop Recording" onPress={this.stopRecording.bind(this)} />);
                                }
                            })()}
                            

                            <Button icon="comments-o" text="Feedback" />
                            <Button icon="list-alt" text="Questionaire" />
                            <Button icon="check-square-o" text="Survey" />
                            <Button icon="exchange" text="Transfer" />
                            {(() => {
                                if(this.props.meeting.Status == MeetingStatus.FINISHED) {
                                    return (
                                        <Button icon="check" 
                                            text="Confirm & Update Meeting" 
                                            style={{flex:1, borderRightWidth:0}} 
                                            onPress={this.postMeeting.bind(this)} />
                                    );
                                }
                                else {
                                    return (
                                        <Button icon="check" 
                                            text="Finish Meeting" 
                                            disabled={AppStore.getCurrentMeetingId() != this.props.meeting.BookedMeetingId} 
                                            style={{flex:1, borderRightWidth:0}} 
                                            onPress={this.onFinishPress.bind(this)} />
                                    );
                                }
                            })()}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

class Button extends React.Component {
    render() {
        let color = "#424242";
        if(this.props.disabled)
            color = "#CCC";
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={[styles.button, this.props.style]}>
                    <Icon name={this.props.icon} size={30} color={color} />
                    <Text style={{color: color}}>{this.props.text}</Text>
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
