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
import React, {View, Text, StyleSheet,TextInput,
	TouchableHighlight, NativeModules, ScrollView, ToastAndroid, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';
import Button from '../meeting/button';
import MeetingStatus from '../../constants/meetingStatus';
//Stores
import AppStore from '../../stores/appStore';

const modes = { EDIT: 1, READ: 2 };

/**
 * @class Summary
 * @extends React.Component
 *
 * Summary Editor
 *
 * @props {Function} onMeetingUpdate
 * @props {Meeting} meeting
 * @props {Navigator} navigator
 */
export default class Summary extends React.Component {

    /**
     * @constructor
     */
	constructor(args) {
		super(args);

        /**
         * @state
         */
		this.state = {
			summary: null,
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
        if(this.hasActualMeeting())
		  this.state.summary = this.props.meeting.ActualMeetings[0].Summary;

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
     * Copy notes from the notes component
     * @return {Void} undefined
     */
	copyNotes() {
        if(this.hasActualMeeting())
		{
            let options = { title: 'Select an option', positiveText: 'Select', items: AppStore.copyOptions };
            options.itemsCallback = (selectedOption) => {
            	let summary = null;
        	   	switch(selectedOption) {
        			case 0:
        				summary = this.state.summary || "" + " " + this.props.meeting.ActualMeetings[0].Notes;
        				break;
        		  	case 1:
        			 	summary = this.props.meeting.ActualMeetings[0].Notes;
        			 	break;
        		  	case 2:
        			 	summary = this.props.meeting.ActualMeetings[0].Notes + " " + this.state.summary || "";
        			 	break;
        	   	}
        		this.setState({ summary: summary });
            };
            let dialog = new DialogAndroid();
            dialog.set(options);
            dialog.show();
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
		this.setState({ summary: text});
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
				this.setState({ mode: modes.READ, summary: this.props.meeting.ActualMeetings[0].Summary });
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
     * Save summary
     *
     * @eventhandler
     * @param {Meeting} meeting
     * @return {Void} undefined
     */
	onSaveSummary() {
        if(this.hasActualMeeting()) {

            // Show waiting dialog
            NativeModules.DialogAndroid.showProgressDialog();

            this.props.meeting.ActualMeetings[0].Summary = this.state.summary;
            if(this.props.onMeetingUpdate) {
                this.props.onMeetingUpdate(this.props.meeting).then(() => {
					// Show notification
					ToastAndroid.show("Summary Updated Successfully", ToastAndroid.LONG);
				})
            }
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
                    value={this.state.summary}
                    onChangeText={this.onChangeText.bind(this)}
                    placeholder=""
                    underlineColorAndroid="#FFFFFF" />
            </View>
        );

        if(this.state.mode == modes.READ) {
            component = (
                <ScrollView style={styles.notesArea}>
                    <Text style={[styles.input, {flex: 1}]}>{this.state.summary}</Text>
                </ScrollView>
            );
        }

		return (
			<View style={styles.container}>
                <View style={styles.containerInner}>
                    <View style={styles.header}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <Icon name="list" size={18} />
                            <Text style={{fontSize: 15}}>Summary</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        { component }
                    </View>
                </View>
                <View style={styles.buttonBar}>
                    <View style={[styles.button, {flex:1} ]}></View>
                    <Button disabled={!this.state.isEditable} icon="clone" text="Copy Notes" borderPosition="bottom" onPress={this.copyNotes.bind(this)} />
                    <Button disabled={!this.state.isEditable} icon="pencil" text="Edit" borderPosition="bottom" onPress={this.onEdit.bind(this)} />
                    <Button disabled={!this.state.isEditable} icon="ban" text="Cancel" borderPosition="bottom" onPress={this.onCancel.bind(this)} />
                    <Button disabled={!this.state.isEditable} icon="floppy-o" text="Save" borderPosition="none" onPress={this.onSaveSummary.bind(this)} />
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
        alignItems: 'stretch'
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
    buttonBar: {
        backgroundColor:'#F0F1F3',
        borderLeftColor: '#D8E0F1',
        borderLeftWidth: 1,
        width: 100,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    input: {
        fontSize: 20
    }
});
