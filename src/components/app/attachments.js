'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */

import React, { StyleSheet, Text, View, Image, TouchableWithoutFeedback, 
    ScrollView, ListView, NativeModules, DeviceEventEmitter,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DialogAndroid from 'react-native-dialogs';
import Button from '../meeting/button';

/** 
 * Split data into equal separate arrays. To display as horizontal folder view in list 
 * @param {Array} data
 * @return {Array} data
 */
function prepareData(data) {
    let _data = new Array(),
        index = 0,
        lastIndex = 0;

    while(index <= data.length) {
        if(index % 5 == 0) {
            if(lastIndex != index) {
                let row = new Array();
                for(let j = lastIndex; j < index; j++) {
                    row.push(data[j])
                }
                _data.push(row);
            }
            lastIndex = index;
        }
        index = index + 1;
    }

    if(lastIndex < data.length - 1) {
        let row = new Array();
        for(let j = lastIndex; j < data.length; j++) {
            row.push(data[j])
        }
        _data.push(row);
    }
    return _data;
 }

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

        //List data source
        this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        //Transformed data 
        this.data = prepareData([]);

        /**
         * @state
         */
        this.state = {
            dataSource: this.dataSource.cloneWithRows(this.data),
            selected: {},
            mode: READ_MODE,
            currentFile: null
        };


        /**
         * If the meeting has attachments in it create data source
         */
        if(this.hasAttachments()) {
            this.data = prepareData(this.props.meeting.Attachments);
            this.state.dataSource = this.dataSource.cloneWithRows(this.data);
        }

        /**
         * Register event handler for image capture using camera
         */
        DeviceEventEmitter.addListener('camerapicturereceived', this.onCameraImage.bind(this));

        /**
         * Register event handler gallery image receive
         */
        DeviceEventEmitter.addListener('imagereceivedfromgallery', this.onGalleryImageReceived.bind(this))
    }

    /**
     * Checks the property meeting has attachment array in it
     * @return {Boolean} hasAttachments
     */
     hasAttachments() {
        return this.props.meeting.Attachments && this.props.meeting.Attachments.length > 0;
     }

    /**
     * @eventhandler
     * @return {Void} undefined
     */
    onCameraImage() {
        this.setState({ mode: EDIT_MODE });
    }

    /**
     * @eventhandler
     * @return {Void} undefined
     */
    onGalleryImageReceived(filename) {
        this.setState({ mode: EDIT_MODE, currentFile: filename });
    }

    /**
     * @eventhandle
     * @param {String} name
     * @param {String} desc
     * @return {Void} undefined
     */
    onUpload(name, desc) {

        let attachment = {
            AttachmentId: 0,
            Name: name,
            Description: desc,
            AttachmentTypeId: 2
        };

        // Prepare data
        this.props.meeting.Attachments.push(attachment);
        this.data = prepareData(this.props.meeting.Attachments);

        // Show waiting dialog
        NativeModules.DialogAndroid.showProgressDialog();
        
        // Upload File and data to server 
        NativeModules.MediaHelper.uploadFile(
            this.state.currentFile, 
            this.props.meeting.BookedMeetingId.toString(), 
            name, 
            desc,
            () => { 
                NativeModules.DialogAndroid.hideProgressDialog(); 
                // Set state
                this.setState({ 
                    dataSource: this.dataSource.cloneWithRows(this.data), 
                    mode: READ_MODE 
                });
            }
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
        this.setState({ selected: item });
    }

    /**
     * React Js  Render method. This is the main component rendering method.
     * Check out React Js documentation for more about render method.
     * @return {View} view
     */
    render() {

        // file list view
        let component = (<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}  />);

        // Right side toolbar 
        let toolbar = (
            <View style={styles.buttonBar}>
                <Button icon="camera" onPress={this.onCamera.bind(this)} text="Take Picture" borderPosition="bottom" />
                <Button icon="picture-o" text="Take From Gallery" borderPosition="bottom" onPress={this.onGallery.bind(this)} />
                <Button icon="trash" text="Delete Selected" borderPosition="bottom" />
                <Button icon="upload" text="Upload All" borderPosition="bottom" />
                <Button icon="download" text="Download Selected" borderPosition="none" />
            </View>
        );

        // Show or hide toolbar on right side
        if(this.props.showToolbar != undefined && this.props.showToolbar == false) 
            toolbar = null;
        
        // if edit mode show editor instead of list view
        if(this.state.mode == EDIT_MODE) 
            component = (<AttachmentEditor onSave={this.onUpload.bind(this)} />)
        
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
 ***/
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
    render() {
        var type = require('../../../resources/images/pdf.png');
        switch(this.props.icon) {
            case 'image':
            case 'png':
            case 'jpg':
            case 'gif':
                type = require('../../../resources/images/image.png');
                break;
            case 'doc':
            case 'docx':
                type = require('../../../resources/images/doc.png');
                break;
            case 'folder':
                type = require('../../../resources/images/folder.png');
                break;
        }

        return (
            <TouchableWithoutFeedback onPress={this.props.onIconPress}>
                <View style={[iconStyles.container, this.props.isSelected ? iconStyles.selected : {}]}>
                    <Image source={type} style={iconStyles.icon} />
                    <Text style={{textAlign:'center'}}>{this.props.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

class AttachmentEditor extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            name: null,
            desc: null
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.attachmentEditor}>

                    <Image source={require('../../../resources/images/image.png')} style={{width:200, height: 150, margin: 10}} />

                    <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 10 }} >
                        <TextInput textAlign="center"
                          underlineColorAndroid="#FFF"
                          value={this.state.name}
                          onTextChange={text=>this.setState({name:text})}
                          onChangeText={text=>this.setState({name:text})}
                          placeholder="Name of the attachment" style={{ flex: 1 }} />
                    </View>
                     <View style={{ width: 350,height: 80, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 10 }} >
                        <TextInput textAlign="center"
                          underlineColorAndroid="#FFF"
                          multiline={true}
                          onTextChange={text=>this.setState({desc:text})}
                          onChangeText={text=>this.setState({desc:text})}
                          value={this.state.desc}
                          placeholder="Description" style={{ flex: 1 }} />
                    </View>

                    <TouchableWithoutFeedback onPress={()=>{ this.props.onSave(this.state.name, this.state.desc)}}>
                        <View style={{paddingTop: 10, paddingBottom:10, paddingRight: 20,paddingLeft: 20, backgroundColor:'#F53333', margin: 10}}>
                            <Text style={{color:'#FFF'}}>Upload</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>
        );
    }
}

var iconStyles = StyleSheet.create({
    container: {
        width: 100,
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
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

var styles = StyleSheet.create({
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
