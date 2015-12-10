/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

class UserCard extends React.Component{
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
    userProfileWrapper: {
        flexDirection: 'row',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderColor: '#f4f4f4',
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
});

module.exports = UserCard;
