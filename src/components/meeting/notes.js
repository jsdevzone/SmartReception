'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 *
 * Copyright (C) E-Gov LLC, Dubai, UAE - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import React, { View, Text, StyleSheet,TextInput,
    TouchableHighlight, NativeModules, ScrollView, ToastAndroid, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';
import Button from '../meeting/button';
import MeetingStatus from '../../constants/meetingStatus';
// Store
import AppStore from '../../stores/appStore';

const modes = { EDIT: 1, READ: 2 };

/**
 * @class Notes
 * @extends React.Component
 *
 * Notes editor
 *
 * @props {Function} onMeetingUpdate
 * @props {Meeting} meeting
 * @props {Navigator} navigator
 */
export default class Notes extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);

        /**
         * @state
         */
        this.state = {
            notes: "",
            mode: modes.READ,
            isEditable: false
        };

        /**
         * If the meeting has actual meeting in object set the notes
         */
        if(this.hasActualMeeting())
            this.state.notes = this.props.meeting.ActualMeetings[0].Notes;

        /**
         * Check the meeting id is same as ongoing meeting then only enable buttons
         */
         if(this.props.meeting &&
             this.props.meeting.ActualMeetings &&
             this.props.meeting.ActualMeetings.length > 0 &&
             this.props.meeting.Status >= MeetingStatus.STARTED &&
             this.props.meeting.Status < MeetingStatus.CONFIRMED) {
                 this.state.isEditable = true;
        }

        /**
         * Add handler for meeing updated event
         */
        AppStore.addEventListener('actualMeetingupdated', this.onMeetingUpdated.bind(this));
    }

    /**
     * Checks the meeting has ActualMeeting.
     * @return {Boolean} hasActualMeeting
     */
    hasActualMeeting() {
        return this.props.meeting && this.props.meeting.ActualMeetings.length > 0;
    }

    /**
     * Update meeting triggered
     * @eventhandler
     * @param {Meeting} meeting
     * @return {Void} undefined
     */
    onMeetingUpdated(meeting) {
        //Hide progress dialog
        NativeModules.DialogAndroid.hideProgressDialog();

        //change state
        this.setState({ mode: modes.READ });
    }

    /**
     * Save notes
     *
     * @eventhandler
     * @return {Void} undefined
     */
    onNoteSave() {
        if(this.hasActualMeeting()) {

            // Show waiting dialog
            NativeModules.DialogAndroid.showProgressDialog();

            this.props.meeting.ActualMeetings[0].Notes = this.state.notes;
            if(this.props.onMeetingUpdate) {
                this.props.onMeetingUpdate(this.props.meeting)
                    .then(json => ToastAndroid.show("Notes Updated Successfully", ToastAndroid.LONG))
            }
        }
    }

    /**
     * Change Text
     *
     * @eventhandler
     * @param {String} text
     * @return {Void} undefined
     */
    onChangeText(text) {
        this.setState({ notes: text });
    }

    /**
     * checks meeting in props is current meeting
     *
     * @eventhandler
     * @return {Boolean} isCurrentMeeting
     */
    isCurrentMeeting() {
        return (AppStore.currentMeeting && AppStore.currentMeeting.BookedMeetingId == this.props.meeting.BookedMeetingId);
    }

    /**
     * Change mode to edit
     *
     * @eventhandler
     * @return {Boolean} isCurrentMeeting
     */
    onEdit() {
        this.setState({ mode: modes.EDIT });
    }

    /**
     * Cancel changes. Change the mode to read.
     *
     * @eventhandler
     * @return {Boolean} isCurrentMeeting
     */
    onCancel() {
        let dialog = new DialogAndroid();
        let options = {
            title: 'Confirm',
            content: 'Are you sure ?',
            positiveText: 'Yes',
            negativeText: 'No',
            onPositive: () => {
                this.setState({ mode: modes.READ, notes: this.props.meeting.ActualMeetings[0].Notes });
            }
        };
        dialog.set(options);
        dialog.show();
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {View} component
     */
    render() {

        var component = (
            <View style={styles.notesArea}>
                <TextInput style={[styles.input, {flex: 1}]}
                    multiline={true}
                    value={this.state.notes}
                    onChangeText={this.onChangeText.bind(this)}
                    placeholder=""
                    underlineColorAndroid="#FFFFFF" />
            </View>
        );

        if(this.state.mode == modes.READ)
            component = (
                <ScrollView style={styles.notesArea}>
                    <Text style={[styles.input, {flex: 1}]}>{this.state.notes}</Text>
                </ScrollView>
            );

        return (
            <View style={styles.container}>
                <View style={styles.containerInner}>
                    <View style={styles.header}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <Icon name="list" size={18} />
                            <Text style={{fontSize: 15}}>Notes</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        { component }
                    </View>
                </View>
                <View style={styles.buttonBar}>
                    <View style={[styles.button, {flex:1} ]}></View>
                    <Button disabled={!this.state.isEditable} icon="pencil" text="Edit" borderPosition="bottom" onPress={this.onEdit.bind(this)} />
                    <Button disabled={!this.state.isEditable} icon="ban" text="Cancel" borderPosition="bottom" onPress={this.onCancel.bind(this)} />
                    <Button disabled={!this.state.isEditable} icon="floppy-o" text="Save" borderPosition="none" onPress={this.onNoteSave.bind(this)} />
                </View>
            </View>
        );
    }
}

/**
 * @style
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    containerInner: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f4f4f4',
    },
    footer: {
        padding: 5,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f4f4f4',
    },
    button: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EAE5E5',
    },
    content: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'stretch'
    },
    notesArea: {
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        width: 100,
        borderLeftWidth: 1,
        borderLeftColor: '#EAE5E5'
    },
    input: {
        fontSize: 22
    },
    buttonBar: {
        backgroundColor:'#F0F1F3',
        borderLeftColor: '#D8E0F1',
        borderLeftWidth: 1,
        width: 100,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
});
