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

import React, { StyleSheet, Text, View, Image, TouchableWithoutFeedback,
    ScrollView, ListView, NativeModules, DeviceEventEmitter,TextInput, ToastAndroid, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';

import Button from '../meeting/button';
import AppStore from '../../stores/appStore';
import MeetingStatus from '../../constants/meetingStatus';

const EDIT_MODE = 2;
const READ_MODE = 1;

/**
 * List of attachments
 *
 * @class Attachments
 * @extends React.Component
 */
class Attachments extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);

        /**
         * @state
         */
        this.state = {
            /**
             * Selected attachment
             * @state {Attachments} attachment
             */
            selected: {},
            /**
             * Current Mode - EDIT or READ
             * @state {Number} mode
             */
            mode: READ_MODE,
            /**
             * Currently selected attachment file name
             * @state {String} filename
             */
            currentFile: null,
            /**
             * List of attachments
             * @state {Array<Attachments>} attachments
             */
            attachments: [],
            /**
             * If any sound file is playing currently
             * @state {Boolean} isFilePlaying
             */
            isFilePlaying: false
        };

        /**
         * Check the meeting id is same as ongoing meeting then only enable buttons
         */
         if(this.props.meeting &&
             this.props.meeting.ActualMeetings &&
             this.props.meeting.ActualMeetings.length > 0 &&
             this.props.meeting.Status >= MeetingStatus.STARTED &&
             this.props.meeting.Status < MeetingStatus.CONFIRMED) {
                 this.state.mode = EDIT_MODE;
             }

        /**
         * Register event handler for image capture using camera
         */
        DeviceEventEmitter.addListener('camerapicturereceived', this.onCameraImage.bind(this));

        /**
         * Register event handler gallery image receive
         */
        DeviceEventEmitter.addListener('imagereceivedfromgallery', this.onGalleryImageReceived.bind(this))

        /**
         * Register event handler When Sound Playback is finished
         */
        DeviceEventEmitter.addListener('playbackfinished', this.onPlaybackFinished.bind(this))

    }

    /**
     * @lifecycle
     * @return {Void} undefined
     */
    componentDidMount() {
        if(this.props.meeting.BookedMeetingId) {
            //Load the attachement on each mount to get the updated list each time
            AppStore.getAttachments(this.props.meeting.BookedMeetingId).then(json => {
                this.setState({ attachments: json || [] });
            });
        }
    }

    /**
     * Playback stopped change the state
     * @return {Void} undefined
     */
    onPlaybackFinished() {
        this.setState({ isFilePlaying: false });
    }

    /**
     * Checks the property meeting has attachment array in it
     * @return {Boolean} hasAttachments
     */
     hasAttachments() {
        return this.props.meeting.Attachments && this.props.meeting.Attachments.length > 0;
     }

     /**
      * Play selected sound file from network
      * @return {Void} undefined
      */
     playFromNetwork() {
        let url  = "http://SmartReception.egovservice.com/services/Attachments/" +
            this.state.selected.BookedMeetingId + "/Others/" +
            this.state.selected.AttachmentId + ".3gp";

        NativeModules.MediaHelper.playFromNetwork(url);
        this.setState({ isFilePlaying: true });
     }

    /**
     * @eventhandler
     * @return {Void} undefined
     */
    onCameraImage(filename) {
        this.confirmAttachment(filename);
    }

    /**
     * @eventhandler
     * @return {Void} undefined
     */
    onGalleryImageReceived(filename) {
        this.confirmAttachment(filename);
    }

    /**
     * Shows dialog box to enter the attachment name
     * @param {String} name
     * @return {Void} undefined
     */
    confirmAttachment(filename) {
        let dialog = new DialogAndroid();
        dialog.set({
            title: 'Attachment name',
            content: 'Enter the attachment name',
            input: {
                hint: 'Attachment Name',
                /**
                 * When user press ok this function will be executed with the input as parameter
                 * @param {String} input
                 */
                callback: input => {
                    if(input && input != null && input != "") {
                        this.state.attachments.push({ Name: input, AttachmentId: this.state.attachments.length });
                        this.setState({ attachments: this.state.attachments, currentFile: filename });
                        this.onUpload(input, "desc");
                    }
                    // Show some message when user does not provided input
                }
            }
        });
        dialog.show();
    }

    /**
     * @eventhandle
     * @param {String} name
     * @param {String} desc
     * @return {Void} undefined
     */
    onUpload(name, desc) {

        /**
         * This attachment object should be same the attachment object both in java code and server c# entity and the table name in sql
         * @
         */
        let attachment = {
            AttachmentId: 0,
            Name: name,
            Description: desc,
            AttachmentTypeId: 2
        };

        // Prepare data
        //this.props.meeting.Attachments.push(attachment);
        //this.data = prepareData(this.props.meeting.Attachments);

        // Show waiting dialog
        //NativeModules.DialogAndroid.showProgressDialog();

        // Upload File and data to server
        NativeModules.MediaHelper.uploadFile(
            this.state.currentFile,
            this.props.meeting.BookedMeetingId.toString(),
            name,
            desc,
            () => {}
        );
    }

    /**
     * @eventhandle
     * @return {Void} undefined
     */
    onCamera() {
        NativeModules.MediaHelper.showCamera();
    }

    /**
     * @eventhandle
     * @return {Void} undefined
     */
    onGallery() {
        NativeModules.MediaHelper.showGallery();
    }

    /**
     * @eventhandle
     * @return {Void} undefined
     */
    onIconPress(item) {
        if(!this.state.isFilePlaying) {
            this.setState({ selected: item });
        }
        else {
            ToastAndroid.show("Stop the file and try again", ToastAndroid.LONG);
        }
    }

    /**
     * If the media player is playing stop it
     * @return {Void} undefined
     */
    stopMediaPlayer() {
        NativeModules.MediaHelper.stopMediaPlayer("", ()=>{ this.setState({ isFilePlaying: false }); });
    }

    /**
     * Delete the attachment
     * @return {Void} undefined
     */
    onDelete() {
        if(this.state.selected && this.state.selected.AttachmentId)
        {
            let dialog = new DialogAndroid();
            let options = {
                title: 'Confirm',
                content: 'Are you sure want to delete Attachment?' ,
                positiveText: 'Yes',
                negativeText: 'No',
                onPositive: () => {
                    let attachments = this.state.attachments;
                    attachments.forEach((item, index) => {
                        if(item.AttachmentId == this.state.selected.AttachmentId) {
                            attachments.splice(index, 1);
                            this.setState({ attachment: attachments });
                        }
                    });
                    // Delete attachment from the server
                    AppStore.deleteAttachments(this.state.selected.AttachmentId);
                }
            };
            dialog.set(options);
            dialog.show();
        }
    }

    /**
     * @return {Void} undefined
     */
    viewSelectedImage() {}

    /**
     * @return {Button} actionButton
     */
    renderActionButton() {
        let actionButton = null;
        if(this.state.selected) {
            let type = "";
            if(this.state.selected.Path && this.state.selected.Path != null) {
                type = this.state.selected.Path.substr(this.state.selected.Path.lastIndexOf(".") + 1);
            }
            if(type == "3gp") {
                if(!this.state.isFilePlaying)
                    actionButton = (<Button icon="play" text="Play" borderPosition="bottom" onPress={()=>{ this.playFromNetwork() }} />);
                else
                    actionButton = (<Button icon="stop" text="Stop" borderPosition="bottom" onPress={()=>{ this.stopMediaPlayer() }} />);
            }
            else {
                actionButton = (<Button icon="th" text="View" borderPosition="bottom" onPress={()=>{ this.viewSelectedImage() }} />)
            }
        }
        return actionButton;
    }

    /**
     * React Js  Render method. This is the main component rendering method.
     * Check out React Js documentation for more about render method.
     * @return {View} view
     */
    render() {
        let component = (
            <View style={styles.attachmentContainer}>
                { this.state.attachments.map(item => {
                    let type = "image";
                    if(item.Path && item.Path != null) {
                        type = item.Path.substr(item.Path.lastIndexOf(".") + 1);
                    }
                    return (
                        <FileIcon name={item.Name}
                                isSelected={this.state.selected.AttachmentId == item.AttachmentId ? true: false}
                                onIconPress={()=>this.onIconPress(item)} icon={type} />
                        )
                })}
            </View>
        );

        let isDisabled = this.state.mode == READ_MODE;


        // Right side toolbar
        let toolbar = (
            <View style={styles.buttonBar}>
                <Button disabled={isDisabled} icon="camera" onPress={this.onCamera.bind(this)} text="Take Picture" borderPosition="bottom" />
                <Button disabled={isDisabled} icon="picture-o" text="Take From Gallery" borderPosition="bottom" onPress={this.onGallery.bind(this)} />
                <Button disabled={isDisabled} icon="trash" text="Delete Selected" borderPosition="bottom" onPress={this.onDelete.bind(this)} />
                { this.renderActionButton() }
            </View>
        );

        // Show or hide toolbar on right side
        if(this.props.showToolbar != undefined && this.props.showToolbar == false)
            toolbar = null;

        // Displays the container
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1, padding: 10}}>
                    {component}
                </ScrollView>
                {toolbar}
            </View>
        );
    }

    /**
     * Render row in the list
     * @param {Object} rowData
     * @param {Number} sectionId
     * @param {Number} rowId
     * @return {View} component
     */
    renderRow(rowData, sectionID: number, rowID: number) {
        // create a row from grouped data
        let items = new Array();
        rowData.map((item, index) => {
            let type = "image";
            if(item.Path && item.Path != null) {
                type = item.Path.substr(item.Path.lastIndexOf(".") + 1);
            }
            items.push(
                <FileIcon name={item.Name}
                        isSelected={this.state.selected.AttachmentId == item.AttachmentId ? true: false}
                        onIconPress={()=>this.onIconPress(item)} icon={type} />
            );
        });

        // Render row
        return (
            <View style={styles.row}>
                {items}
            </View>
       );
    }
}
/**
 * @class FileIcon
 * @extends React.Component
 */
class FileIcon extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);

        /**
         * #state
         */
        this.state = {
        };
    }

    /**
     * Handler for icon press
     * @eventhandler
     * @param {Event} evt
     * @return {Void} undefined
     */
    onIconPress() {
        /**
         * Play the native tap sound, as it's not supported in default view component by react native
         */
        NativeModules.MediaHelper.playClickSound();
        /**
         * Execute if any parent component Handler is passed to the compnent
         */
        if(this.props.onIconPress)
            this.props.onIconPress();
    }

    /**
     * React Js  Render method. This is the main component rendering method.
     * Check out React Js documentation for more about render method.
     * @return {View} view
     */
    render() {
        var type = require('../../../resources/images/pdf.png');
        switch(this.props.icon) {
            case '3gp':
                type = require('../../../resources/images/audio.png');
                break;
            case 'image': case 'png':
            case 'jpg': case 'gif':
                type = require('../../../resources/images/image.png');
                break;
            case 'doc': case 'docx':
                type = require('../../../resources/images/doc.png');
                break;
            case 'folder':
                type = require('../../../resources/images/folder.png');
                break;
        }

        return (
            <TouchableWithoutFeedback onPress={this.onIconPress.bind(this)}>
                <View style={[iconStyles.container, this.props.isSelected ? iconStyles.selected : {}]}>
                    <Image source={type} style={iconStyles.icon} />
                    <Text style={{textAlign:'center'}}>{this.props.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
/**
 * @style
 */
const iconStyles = StyleSheet.create({
    container: {
        width: 100,
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    icon: {
        width: 64,
        height: 64
    },
    selected: {
        backgroundColor: '#B0CFFF',
        borderWidth: 1,
        borderColor: '#3D76CE'
    }
});

/**
 * @style
 */
const styles = StyleSheet.create({
    attachmentContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap : 'wrap',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF'
    },
    tile: {
        width: 100,
        height: 100,
        backgroundColor: '#FFF',
        margin: 5
    },
    row: {
        flexDirection: 'row'
    },
    buttonBar: {
        backgroundColor:'#F0F1F3',
        borderLeftColor: '#D8E0F1',
        borderLeftWidth: 1,
        width: 100,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    attachmentEditor: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    incomplete: {
        backgroundColor: '#CCC'
    },
    complete: {
        flex: 0
    }
});

module.exports = Attachments;
