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

import React, {View, Text, Component, StyleSheet,TextInput,
	TouchableHighlight, ScrollView, NativeModules, ToastAndroid, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';
import Button from '../meeting/button';
import MeetingStatus from '../../constants/meetingStatus';
//Stores
import AppStore from '../../stores/appStore';

const modes = { EDIT: 1, READ: 2 };

/**
 * @class MinutesOfMeeting
 * @extends React.Component
 *
 * Summary Editor
 *
 * @props {Function} onMeetingUpdate
 * @props {Meeting} meeting
 * @props {Navigator} navigator
 */
export default class MinutesOfMeeting extends React.Component {

    /**
     * @constructor
     */
	constructor(args) {
		super(args);

        /**
         * @state
         */
		this.state = {
			minutes: null,
			mode: modes.READ,
			isEditable: false
		};

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
         * If the meeting has actual meeting in object set the summary
         */
		if(this.props.meeting && this.props.meeting.ActualMeetings.length > 0)
			this.state.minutes = this.props.meeting.ActualMeetings[0].MinutesOfMeeting;

        /**
         * Add handler for meeing updated event
         */
		AppStore.addEventListener('actualMeetingupdated', this.onMeetingUpdated.bind(this));
	}

    /**
     * Copy notes from the notes component
     * @return {Void} undefined
     */
	copyNotes() {
		let options = { title: 'Select an option', positiveText: 'Select', items: AppStore.copyOptions };
        options.itemsCallback = (selectedOption) => {
        	let minutes = null;
        	switch(selectedOption) {
        		case 0:
        			minutes = this.state.minutes || "" + " " + this.props.meeting.ActualMeetings[0].Notes;
        			break;
        		case 1:
        			minutes = this.props.meeting.ActualMeetings[0].Notes;
        			break;
        		case 2:
        			minutes = this.props.meeting.ActualMeetings[0].Notes + " " + this.state.minutes || "";
        			break;
        	}
        	this.setState({ minutes: minutes });
        };
        let dialog = new DialogAndroid();
        dialog.set(options);
        dialog.show();
	}

    /**
     * Copy summary from the summary component
     * @return {Void} undefined
     */
	copySummary() {
		let options = { title: 'Select an option', positiveText: 'Select', items: AppStore.copyOptions };
        options.itemsCallback = (selectedOption) => {
        	let minutes = null;
        	switch(selectedOption) {
        		case 0:
        			minutes = this.state.minutes || "" + " " + this.props.meeting.ActualMeetings[0].Summary;
        			break;
        		case 1:
        			minutes = this.props.meeting.ActualMeetings[0].Summary;
        			break;
        		case 2:
        			minutes = this.props.meeting.ActualMeetings[0].Summary + " " + this.state.minutes || "";
        			break;
        	}
        	this.setState({ minutes: minutes });
        };
        let dialog = new DialogAndroid();
        dialog.set(options);
        dialog.show();
	}

    /**
     * Change Text
     *
     * @eventhandler
     * @param {String} text
     * @return {Void} undefined
     */
	onChangeText(text) {
		this.setState({ minutes: text});
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
			content: 'Are you sure ?' ,
			positiveText: 'Yes',
			negativeText: 'No',
			onPositive: () => {
				this.setState({ mode: modes.READ, minutes: this.props.meeting.ActualMeetings[0].MinutesOfMeeting });
			}
		};
		dialog.set(options);
		dialog.show();
	}

    /**
     * Update meeting upate triggered
     * @eventhandler
     * @param {Meeting} meeting
     * @return {Void} undefined
     */
    onMeetingUpdated() {
         //Hide progress dialog
        NativeModules.DialogAndroid.hideProgressDialog();

        //change state
        this.setState({ mode: modes.READ });
    }

    /**
     * Save minutes of meeting
     *
     * @eventhandler
     * @return {Void} undefined
     */
	onSave() {
        // Show waiting dialog
        NativeModules.DialogAndroid.showProgressDialog();

		this.props.meeting.ActualMeetings[0].MinutesOfMeeting = this.state.minutes;
		if(this.props.onMeetingUpdate) {
            this.props.onMeetingUpdate(this.props.meeting)
				.then(json => ToastAndroid.show('Minutes Of Meeting Saved Successfully!', ToastAndroid.LONG))
        }
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
                    value={this.state.minutes}
                    onChangeText={this.onChangeText.bind(this)}
                    placeholder=""
                    underlineColorAndroid="#FFFFFF" />
            </View>
        );

        if(this.state.mode == modes.READ) {
            component = (
                <ScrollView style={styles.notesArea}>
                    <Text style={[styles.input, {flex: 1}]}>{this.state.minutes}</Text>
                </ScrollView>
            );
        }

		return (
			<View style={styles.container}>
                <View style={styles.containerInner}>
                    <View style={styles.header}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <Icon name="list" size={18} />
                            <Text style={{fontSize: 15}}>Minutes Of Meeting</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        { component }
                    </View>
                </View>
                <View style={styles.buttonBar}>
                    <View style={[styles.button, {flex:1} ]}></View>
                        <Button disabled={!this.state.isEditable} icon="clone" text="Copy Notes" borderPosition="bottom" onPress={this.copyNotes.bind(this)} />
                        <Button disabled={!this.state.isEditable} icon="files-o" text="Copy Summary" borderPosition="bottom" onPress={this.copySummary.bind(this)} />
                        <Button disabled={!this.state.isEditable} icon="pencil" text="Edit" borderPosition="bottom" onPress={this.onEdit.bind(this)} />
                        <Button disabled={!this.state.isEditable} icon="ban" text="Cancel" borderPosition="bottom" onPress={this.onCancel.bind(this)} />
                        <Button disabled={!this.state.isEditable} icon="floppy-o" text="Save" borderPosition="none" onPress={this.onSave.bind(this)} />
                    </View>
            </View>
		);
	}
}

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
