'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */

import React, { StyleSheet, Text, View, Image,TouchableWithoutFeedback, NativeModules,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';

// Store
import AppStore from '../../stores/appStore';

/**
 * @class MeetingIntro
 * @extends React.Component 
 * 
 * If the meeting is not started yet, this screen will be displayed and they can start meeting from this screen.
 *
 * @props {Meeting} meeting
 */
export default class MeetingIntro extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);
        /**
         * @state
         */
        this.state = {};
    }

    /**
     * Event handler for start button press
     * @eventhandler
     * @return {Void} undefined
     */
    onStartButtonPress() {

        // Show waiting dialog
        NativeModules.DialogAndroid.showProgressDialog();

        let dialog = new DialogAndroid();
        let options = {};

        // If the passed meeting dont have actual
        // meeting inside we shows the room selection screen

        if(!AppStore.hasActualMeeting()) {
            // Get the availaable rooms
            AppStore.getAvailableMeetingRooms().then(data => { 
                
                // Hide progress dialog
                NativeModules.DialogAndroid.hideProgressDialog();

                /**
                 * Dialog only accepts string array
                 * So transforms server data into string array and save the same locally in this class
                 */
                var rooms = new Array();
                data.map(item  => rooms.push(item.Name));

                options = { 
                    title: 'Select A Meeting Area', 
                    positiveText: 'Select', 
                    items: rooms
                };

                /**
                 * Callback for item select 
                 */
                options.itemsCallback = (index) => {
                    AppStore.startMeeting(this.props.meeting, data[index].RoomId);
                };

                /**
                 * Shows the dialog
                 */
                dialog.set(options);
                dialog.show();
            });
        }
        /**
         * Means that the current meeting has actual meeting.
         * So the user can't start it again.
         */
        else
        {
            options = { 
                title: 'Error!', 
                content: "Can't start start new meeting without stopping current one", 
                positiveText: "OK"
            };
            dialog.set(options);
            dialog.show();
        }
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     * 
     * @render
     * @return {View} component
     */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <View style={styles.headerWrapper}>
                        <Image source={require('../../../resources/images/paperwithclip.png')} style={styles.headerIcon} />
                        <Text style={styles.title}>Meeting - #{this.props.meeting.BookedMeetingId}</Text>
                        <Text> an unknown printer took a galley of type and scrambled it to make</Text>
                        <Text>o popular belief, Lorem Ipsum is not simply random tex</Text>
                    </View>

                    <View style={[styles.notification, styles.info]}>
                        <Text>You can start you current meeting by pressing start button below this text.
                        Please note that you can not stop the meeting once you started your meeting </Text>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <TouchableWithoutFeedback onPress={this.onStartButtonPress.bind(this)}>
                            <View style={[styles.button, {marginTop: 35}]}>
                                <View style={styles.buttonIcon}>
                                    <Icon name="check" size={24} color="#FFF" style={{marginLeft: 10}} />
                                </View>
                                <View style={styles.buttonTextWrapper}>
                                    <Text style={styles.buttonText}>Start Your Meeting</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
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
        flexDirection: 'column',
        backgroundColor: '#FFF',
        alignItems: 'stretch'
    },
    titleWrapper: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        color: '#919DF1',
        marginBottom: 10
    },
    buttonWrapper: {},
    button: {
        backgroundColor: '#0072bc',
        flexDirection: 'row',
        width: 300,
        alignItems: 'center'
    },
    buttonIcon: {
        backgroundColor: "#8BC34A",
        padding: 10,
        borderColor: '#8BC34A',
        borderWidth: 1
    },
    headerWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerIcon: {
        width: 150,
        height: 150,
        marginBottom: 20
    },
    notification: {
        padding: 10,
        borderWidth:1,
        borderColor:'#66B061',
        margin: 25,
        marginTop: 35,
        width: 450
    },
    info: {
        backgroundColor: '#F2FFF8'
    },
    buttonTextWrapper: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 22
    }
});