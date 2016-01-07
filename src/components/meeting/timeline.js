
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

import React, { View, StyleSheet, Text,  TouchableNativeFeedback, ListView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';
import Moment from 'moment';

import UserStore from '../../stores/userStore';

/**
 * Custom Class Header
 *
 * @class TimeLine
 * @extends React.Component
 */
 export default class TimeLine extends React.Component {
     /**
      * @constructor
      */
     constructor(args) {
        super(args);

        /**
         * List Data Source
         */
         this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        /**
         * @state
         */
         this.state = {
             dataSource: this.dataSource.cloneWithRows([]),
             isLoading: false
         };
     }
     /**
      *  Life cycle method
      *  This method will be called when the component is mounted to the application
      *  See React Js componentDidMount method.
      *
      *  @lifecycle
      *  @return {Void} undefined
      */
     componentDidMount() {
         if(this.props.user)
            UserStore.getPreviousSchedule(this.props.user.ClientId).then(this.onTimelineLoaded.bind(this));
     }

     /**
      * Timeline data loaded from the server
      *
      * @eventhandler
      * @param {Clients} data
      * @return {Void} undefined
      */
     onTimelineLoaded(data) {
            this.setState({ dataSource: this.dataSource.cloneWithRows(data) });
     }

     /**
      * Transforms each row of list view. [See ListView for more details]
      *
      * @param {Object} rowData
      * @param {Number} sectionID
      * @param {Number} rowID
      */
     renderRow(rowData, sectionID: number, rowID: number) {
         var date = Moment.utc(rowData.DateOfMeeting);

         return(
             <View style={styles.timeline}>
                 <View style={styles.tmLeft}>
                     <Icon name="calendar" color="#5FB9CD" size={24} />
                     <Text style={styles.tmTimeText}>{date.format("hh:mm")}</Text>
                 </View>
                 <View style={styles.tmLine}>
                     <View style={styles.tmLineTop} />
                     <View style={styles.tmLineSeparator} />
                     <View style={styles.tmLineBottom} />
                 </View>
                 <View style={styles.tmInfoWrapper}>
                     <View style={styles.tmInfo}>
                         <View style={styles.row}>
                             <Text style={styles.tmDate}>{date.format("DD")}</Text>
                             <View style={styles.tmDayMonthWrapper}>
                                 <Text style={styles.tmDay}>{date.format("dddd")}</Text>
                                 <Text style={styles.tmMonth}>{date.format("MMMM")}</Text>
                             </View>
                         </View>
                         <View style={styles.tmTitle}>
                             <Text style={styles.tmTitleText}>{rowData.Subject}</Text>
                         </View>
                     </View>
                 </View>
             </View>
         );
     }


     /**
      * @render
      * @return {View} view
      */
     render() {
         let component = <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} style={{ flex: 1}} />;
         if(this.state.isLoading)
            component  = (
                <View>
                    <Text>Loading....</Text>
                </View>
            );

         return (
             <View style={styles.container}>
                 { component }
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
        backgroundColor: '#f9f9f9',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: 10
    },
    timeline: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        height: 100
    },
    tmLeft: {
        width:55,
        alignItems:'flex-end',
        flexDirection:'column',
        paddingTop: 25,
        height: null
    },
    tmLine: {
        width:20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    tmLineTop: {
        width:3,
        backgroundColor:'#5FB9CD',
        height:30, marginBottom: 5
    },
    tmLineBottom: {
        width:3,
        backgroundColor:'#5FB9CD',
        flex: 1
    },
    tmLineSeparator: {
        width:10,
        height: 10,
        backgroundColor:'#5FB9CD',
        marginBottom: 5,
        borderRadius: 5
    },
    tmTimeText: {
        color:'#CCC'
    },
    tmInfoWrapper: {
         flex: 1,
         flexDirection: 'column',
         padding: 20
    },
    tmInfo: {
        backgroundColor:'#FFF',
        borderColor:'#E6EBE3',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'column',
        padding: 10
    },
    tmDate:{
        fontSize: 28
    },
    tmDayMonthWrapper: {
        paddingTop: 5,
        marginLeft: 5
    },
    tmDay:{
        fontSize: 12
    },
    tmMonth: {
        fontSize: 12,
        color: "#CCC"
    },
    row: {
        flexDirection: 'row'
    },
    tmTitleText: {
        fontSize: 18
    },
    tmTitle: {
        flexDirection: 'row',
        paddingLeft: 5,
        paddingTop: 5
    },
});
