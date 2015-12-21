'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */

import React, { StyleSheet, Text, View, TouchableHighlight, ListView, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import { getRandomColor } from '../../utils/util';

// Store
import ScheduleStore from '../../stores/scheduleStore';

/**
 * @class ScheduleList 
 * @extends React.Component 
 * 
 * List of schedules 
 *
 * @props {DataSource} dataSource
 * @props {Boolean}  showSeparator
 * @props {Function} onSchedulePress 
 */
export default class ScheduleList extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     * 
     * @render
     * @return {View} undefined
     */
    render() {
        return (
            <View style={styles.container}>
                <ListView dataSource={this.props.dataSource} renderRow={this.renderRow.bind(this)} style={{flex: 1}} />
            </View>
        );
    }

    /**
     * Transforms each row of list view. [See ListView for more details]
     *
     * @param {Object} rowData
     * @param {Number} sectionID
     * @param {Number} rowID
     */
    renderRow(rowData, sectionID: number, rowID: number) {
        
        var showSeparator = this.props.showSeparator ? { borderBottomColor: '#F9F9F9', borderBottomWidth: 1 }: {};
        var time  = Moment.utc(rowData.DateOfMeeting).format('h:mmA');
        var photo = (
            <Image source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg' }} style={styles.profileImage} />
        );
        
        // If the client does have the photo use it
        if(rowData.Clients && rowData.Clients.Photo) 
            photo =(<Image source={{uri: rowData.Clients.Photo }} style={styles.profileImage} />);   
        
        else {

            // If the client does not have the photo use the first letter of name as profile picture
            photo =(
                <View style={[styles.profileImage, {backgroundColor: getRandomColor()}]}>
                    <Text style={styles.profileText}>{rowData.Clients.FirstName.substr(0,1)}</Text>
                </View>
            );
        }

        return (
            <TouchableHighlight underlayColor="#C6C7EA" onPress={() => this.props.onSchedulePress(rowData) }>
                <View style={[styles.listItem, showSeparator ]}>
                    {photo}
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{ rowData.Clients.FirstName + " " +rowData.Clients.LastName }</Text>
                        <Text style={styles.position}>{rowData.Clients.Position}</Text>
                    </View>
                    <View style={styles.timeWrapper}>
                        <Text style={styles.time}>{time}</Text>
                    </View>
                </View>
           </TouchableHighlight>
       ); 
    }
}

/**
 * @style
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    listItem: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 25
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileInfo: {
        flexDirection: 'column',
        marginLeft: 14,
        paddingTop: 10,
        flex: 1
    },
    profileName: {
        color:'#000',
        fontSize: 15
    },
    time: {
        color:'#999',
    },
    position: {
        color:"#A1A1A1"
    },
    timeWrapper: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingTop:15
    },
    profileText: {
        color: '#FFF',
        fontSize: 25
    }
});