/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimeLine from './timeline';
import MeetingProgress from './meetingProgress';
import ProfileDetails from '../users/profileDetails';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
} = React;

class UserProfile extends React.Component{
    constructor(args){
        super(args);


        this.state = {
            selectedTabIndex: 1,
            userId: 0,
            meeting: this.props.meeting || {},
        };
    }
    onTabPress(index) {
        this.setState({ selectedTabIndex: index})
    }
    render() {
        let _component = null;
        if(true) {
            _component =(
                <View style={styles.container}>
                    <View style={styles.titleBar}>
                        <Icon name="user" color="#BCCFE7" size={16} />
                        <Text style={styles.titleText}>User Profile</Text>
                    </View>
                    <View style={styles.userProfileWrapper}>
                        <Image source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'}} style={styles.profileImage} />
                        <View style={styles.profileInfoWrapper}>
                            <Text style={styles.name}>{this.props.user.FirstName + " " + this.props.user.LastName}</Text>
                            <View style={styles.profileItemWrapper}>
                                <Icon name="envelope" size={18} color="#B5C8E2" />
                                <Text style={styles.profileItem}>{this.props.user.Email}</Text>
                            </View>
                            <View style={styles.profileItemWrapper}>
                                <Icon name="phone" size={18} color="#B5C8E2" />
                                <Text style={styles.profileItem}>{this.props.user.Mobile}</Text>
                            </View>
                            <View style={styles.profileItemWrapper}>
                                <Icon name="map-marker" size={18} color="#B5C8E2" />
                                <Text style={styles.profileItem}>{this.props.user.Location}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tabWrapper}>
                        <TouchableWithoutFeedback onPress={() => this.onTabPress(1) }>
                            <View style={styles.tab}>
                                <Icon name="user" size={18} style={{ color: this.state.selectedTabIndex == 1 ? '#193F71': '#A4C1E8'   }}/>
                                <Text style={[styles.tabText, this.state.selectedTabIndex == 1 ? styles.tabSelected : {}]}> PROFILE</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.onTabPress(2) }>
                            <View style={[styles.tab, { borderRightWidth: 0 }]}>
                                <Icon name="clock-o" size={18} style={{ color: this.state.selectedTabIndex == 2 ? '#193F71': '#A4C1E8' }}/>
                                <Text style={[styles.tabText, this.state.selectedTabIndex == 2 ? styles.tabSelected : {}]}> HISTORY</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {(() => {
                        switch(this.state.selectedTabIndex) {
                            case 1:
                                return (<ProfileDetails user={this.props.user} />);
                            case 2:
                                return (<TimeLine user={this.props.user} />);
                        }
                    })()}
                </View>
            );
        }
        else {
            _component = (
                <View style={styles.container}>
                    <Text>No User Found</Text>
                </View>
            );
        }

        return _component;
    }
}

var styles = StyleSheet.create({
    container: {
        width: 300,
        backgroundColor: '#d3d3d3',
        flexDirection: 'column',
        alignItems: 'stretch',
        borderRightColor: '#D8E0F1',
        borderRightWidth: 1
    },
    titleBar: {
        backgroundColor: '#F7F8FC',
        padding: 10,
        borderBottomColor: '#C4D3E7',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    titleText: {
        color: '#5075B2',
        fontWeight: 'bold'
    },
    userProfileWrapper: {
        padding: 20,
        backgroundColor: '#EAEEF5',
        borderBottomColor: '#D8E0F1',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderColor: '#FFF',
        borderWidth: 5,
        borderRadius: 5
    },
    profileInfoWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5B7EB8'
    },
    profileItemWrapper: {
        flexDirection: 'row',
        paddingTop: 2,
    },
    profileItem: {
        color: '#5B7EB8'
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
        color: '#193F71',
        fontWeight: 'bold'
    }
});

module.exports = UserProfile;
