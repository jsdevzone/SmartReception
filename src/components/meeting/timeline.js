/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import moment from 'moment';
import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import UserStore from '../../stores/userStore';
import { getDayName, getMonthName, } from '../../utils/util';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ListView,
} = React;


class TimeLine extends React.Component{

    constructor(args){
        super(args);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            isLoading: false,
            text: 'One'
        }
        this.store = new UserStore();
        this.store.on('historyloaded', (data) => {
            this.setState({ dataSource: dataSource.cloneWithRows(data), isLoading: false, text: 'Done' });
        });
        if(this.props.user) {
            this.store.getPreviousSchedule(this.props.user.ClientId);
        }
    }

    componentDidMount() {

    }

    renderRow(rowData) {
        var date = moment.utc(rowData.DateOfMeeting);

        return(
            <View style={styles.timeline}>
                <View style={styles.tmLeft}>
                    <Icon name="calendar" color="#5FB9CD" size={24} />
                    <Text style={styles.tmTimeText}>{date.format("hh:mm")}</Text>
                </View>
                <View style={styles.tmLine}>
                    <View style={styles.tmLineTop}>
                    </View>
                    <View style={styles.tmLineSeparator}>
                    </View>
                    <View style={styles.tmLineBottom}>
                    </View>
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
    render() {
        var content = this.state.isLoading ? (
            <View>
                <Text>Loading.... {this.state.text}</Text>
            </View>
        ) : (
            <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} style={{ flex: 1}} />
        );

        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}

var styles = StyleSheet.create({
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

module.exports = TimeLine;
