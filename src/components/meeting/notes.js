
import React, {View, Text, Component, StyleSheet,TextInput, TouchableHighlight,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStore from '../../stores/appStore';
import Button from '../meeting/button';

const modes = { EDIT: 1, READ: 2 };

class Notes extends Component {
    constructor(args) {
        super(args);
        this.state = {
            notes: "",
            mode: modes.READ
        };
        if(this.hasActualMeeting())
            this.state.notes = this.props.meeting.ActualMeetings[0].Notes;
        AppStore.addEventListener('actualMeetingupdated', this.onMeetingUpdated.bind(this));
    }
    hasActualMeeting() {
        return this.props.meeting && this.props.meeting.ActualMeetings.length > 0;
    }
    onMeetingUpdated(meeting) {
        this.setState({ mode: modes.READ });
    }
    onNoteSave() {
        if(this.hasActualMeeting()) {
            this.props.meeting.ActualMeetings[0].Notes = this.state.notes;
            if(this.props.onMeetingUpdate) {
                this.props.onMeetingUpdate(this.props.meeting);
            }
        }
    }
    onChangeText(text) {
        this.setState({ notes: text });
    }
    isCurrentMeeting() {
        return (AppStore.currentMeeting && AppStore.currentMeeting.BookedMeetingId == this.props.meeting.BookedMeetingId);
    }
    onEdit() {
        this.setState({ mode: modes.EDIT });
    }
    onCancel() {
        this.setState({ mode: modes.READ });
    }
    render() {
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
                        <View style={styles.notesArea}>
                           {
                            (() => {
                                if(this.state.mode == modes.READ) {
                                    return (<Text style={[styles.input, {flex: 1}]}>{this.state.notes}</Text>);
                                }
                                else
                                {
                                return (
                                    <TextInput style={[styles.input, {flex: 1}]}
                                        multiline={true}
                                        value={this.state.notes}
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
                    <Button icon="pencil" text="Edit" borderPosition="bottom" onPress={this.onEdit.bind(this)} />
                    <Button icon="ban" text="Cancel" borderPosition="bottom" onPress={this.onCancel.bind(this)} />
                    <Button icon="floppy-o" text="Save" borderPosition="none" onPress={this.onNoteSave.bind(this)} />
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
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

module.exports = Notes;
