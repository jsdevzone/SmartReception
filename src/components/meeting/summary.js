'use strict';
import React, {View, Text, Component, StyleSheet,TextInput, TouchableHighlight,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStore from '../../stores/appStore';
import DialogAndroid from 'react-native-dialogs';
import Button from '../meeting/button';

const modes = { EDIT: 1, READ: 2 };

export default class Summary extends React.Component {
	constructor(args) {
		super(args);
		this.state = {
			summary: null,
			mode: modes.READ
		};
        if(this.hasActualMeeting())
		  this.state.summary = this.props.meeting.ActualMeetings[0].Summary;
		AppStore.addEventListener('actualMeetingupdated', this.onMeetingUpdated.bind(this));
	}
    hasActualMeeting() {
        return this.props.meeting && this.props.meeting.ActualMeetings.length > 0;
    }
	copyNotes() {
        if(this.hasActualMeeting())
		{
            let options = { title: 'Select an option', positiveText: 'Select', items: AppStore.copyOptions };
            options.itemsCallback = (selectedOption) => {
            	let summary = null;
        	   switch(selectedOption) {
            		case 0:
        			 summary = this.state.summary + " " + this.props.meeting.ActualMeetings[0].Notes;
        			 break;
        		  case 1:
        			 summary = this.props.meeting.ActualMeetings[0].Notes;
        			 break;
        		  case 2:
        			 summary = this.props.meeting.ActualMeetings[0].Notes + " " + this.state.summary;
        			 break;
        	   }
        	      this.setState({ summary: summary });
            };
            let dialog = new DialogAndroid();
            dialog.set(options);
            dialog.show();
        }
	}
	onChangeText(text) {
		this.setState({ summary: text});
	}
	onEdit() {
		this.setState({ mode: modes.EDIT });
	}
	onCancel() {
		this.setState({ mode: modes.READ, summary: this.props.meeting.ActualMeetings[0].Summary });
	}
	onMeetingUpdated() {
		this.setState({ mode: modes.READ });
	}
	onMeetingUpdate() {
		this.props.meeting.ActualMeetings[0].Summary = this.state.summary;
		if(this.props.onMeetingUpdate) {
            this.props.onMeetingUpdate(this.props.meeting);
        }
	}
	render() {
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
                        <View style={styles.notesArea}>
                           {
                            (() => {
                                if(this.state.mode == modes.READ) {
                                    return (<Text style={[styles.input, {flex: 1}]}>{this.state.summary}</Text>);
                                }
                                else
                                {
                                return (
                                    <TextInput style={[styles.input, {flex: 1}]} 
                                        multiline={true}
                                        value={this.state.summary} 
                                        onChangeText={this.onChangeText.bind(this)}
                                        placeholder="" underlineColorAndroid="#FFFFFF" />);
                                }
                            })()
                           }
                        </View>
                    </View>
                </View>
                <View style={styles.buttonBar}>
                    <View style={[styles.button, {flex:1} ]}></View>
                    <Button icon="clone" text="Copy Notes" borderPosition="bottom" onPress={this.copyNotes.bind(this)} />
                    <Button icon="pencil" text="Edit" borderPosition="bottom" onPress={this.onEdit.bind(this)} />
                    <Button icon="ban" text="Cancel" borderPosition="bottom" onPress={this.onCancel.bind(this)} />
                    <Button icon="floppy-o" text="Save" borderPosition="none" onPress={this.onMeetingUpdate.bind(this)} />
                </View>
            </View>
		);
	}
}

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
});

module.exports = Summary;