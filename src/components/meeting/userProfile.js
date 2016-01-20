
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

 import React, { View, StyleSheet, Text, TextInput,TouchableWithoutFeedback,
     TouchableNativeFeedback, ToastAndroid, Image, TouchableHighlight, NativeModules, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import DialogAndroid from 'react-native-dialogs';

 import TimeLine from './timeline';
 import MeetingProgress from './meetingProgress';
 import ProfileDetails from '../users/profileDetails';
 /**
  * Custom Class Header
  *
  * @class UserProfile
  * @extends React.Component
  */
export default class UserProfile extends React.Component {
      /**
       * @constructor
       */
     constructor(args) {
         super(args);

         /**
          * @state
          */
          this.state = {
              selectedTabIndex: 1,
              userId: 0,
              meeting: this.props.meeting || {},
          };
     }

      /**
       * On Tab press
       *
       * @eventhandler
       * @param {Number} index
       * @return {Void} undefined
       */
     onTabPress(index) {
         /**
          * Play the native tap sound, as it's not supported in default view component by react native
          */
         NativeModules.MediaHelper.playClickSound();
         /**
          * Change the tab by changing the tabindex state
          */
          this.setState({ selectedTabIndex: index})
     }

     /**
      * Renders a single tab
      *
      * @param {Number} index
      * @param {String} icon
      * @param {String} text
      * @param {Boolean} showSeparator
      * @return {TouchableWithoutFeedback} component
      */
     renderTab(index, icon, text, showSeparator) {
         let style = { borderRightWidth: 0 };
         /**
          * If it's not the last item, then show the separator
          **/
         if(showSeparator)
            style= { borderRightWidth: 1 };

         return (
             <TouchableWithoutFeedback onPress={() => this.onTabPress(index) }>
                 <View style={[ styles.tab, style ]}>
                     <Icon name={icon}size={18} style={{ color: this.state.selectedTabIndex == index ? '#193F71': '#A4C1E8' }}/>
                     <Text style={[styles.tabText, this.state.selectedTabIndex == index ? styles.tabSelected : {}]}>{text}</Text>
                 </View>
             </TouchableWithoutFeedback>
         );
     }

     /**
      * Renders the tab stripe
      * @return {View} component
      */
     renderTabStrip() {
         return (
             <View style={styles.tabWrapper}>
                 { this.renderTab(1, "user", "PROFILE", true)}
                 { this.renderTab(2, "clock-o", "HISTORY")}
             </View>
         );
     }

      /**
       * @render
       * @return {View} view
       */
      render() {
           let component = (this.state.selectedTabIndex == 1) ?
                (<ProfileDetails user={this.props.user} />) :
                (<TimeLine user={this.props.user} />);

           return (
               <View style={styles.container}>
                   <ProfileCard user={this.props.user} />
                   { this.renderTabStrip() }
                   { component }
               </View>
           );
      }
}

/**
 * Custom Class Header
 *
 * @class ProfileCard
 * @extends React.Component
 */
class ProfileCard extends React.Component {
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
      * @render
      * @return {View} view
      */
    render() {
        return (
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
                </View>
            </View>
        );
    }
 }

 /**
  * @style
  */

/**
 * @styles
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        justifyContent: 'center',
        padding: 10
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
