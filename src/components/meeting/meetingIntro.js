/**
 * @class MeetingIntro
 * @author Jasim
 */
'use strict';

import React, { StyleSheet, Text, View, Image, TouchableHighlight,
  TextInput, TouchableWithoutFeedback, NativeModules, ToastAndroid,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';
import AppStore from '../../stores/appStore';
import RequestManager from '../../core/requestManager';

class MeetingIntro extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            status: ''
        };
    }
    startMeeting(_roomNo) {
        AppStore.startMeeting(this.props.meeting, _roomNo);
    }
    onStartButtonPress() {
        let _options = { title: 'Select A Meeting Area', positiveText: 'Select', items: AppStore.meetingAreas };
        _options.itemsCallback = this.startMeeting.bind(this);
        let _dialog = new DialogAndroid();
        _dialog.set(_options);
        _dialog.show();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <View style={styles.headerWrapper}>
                        <Image source={require('../../../resources/images/paperwithclip.png')} style={styles.headerIcon} />
                        <Text style={styles.title}>Meeting - #25632</Text>
                        <Text> an unknown printer took a galley of type and scrambled it to make</Text>
                        <Text>o popular belief, Lorem Ipsum is not simply random tex</Text>
                    </View>

                    <View style={[styles.notification, styles.info]}>
                        <Text>You can start you current meeting by pressing start button below this text.
                        Please note that you can not stop the meeting once you started your meeting </Text>
                    </View>

                    <View style={{width: 500}}>
                        <Text>{this.state.status}</Text>
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

var styles = StyleSheet.create({
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

module.exports = MeetingIntro;
