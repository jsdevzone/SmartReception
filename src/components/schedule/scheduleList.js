
import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import ScheduleStore from '../../stores/scheduleStore';
import { getRandomColor } from '../../utils/util';

var { View, Text, StyleSheet, Component, ListView, TouchableHighlight, Image, } = React;

var data = [
];
class ScheduleList extends Component {
    constructor(args) {
        super(args);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.store = new ScheduleStore();
        this.store.on('gettodayschedules', (json)=>{ this.setState({dataSource: dataSource.cloneWithRows(json)}) })
        //this.store.getTodaySchedules();
        this.state = {
            dataSource: dataSource.cloneWithRows(data)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView dataSource={this.props.dataSource} renderRow={this.renderRow.bind(this)} style={{flex: 1}} />
            </View>
        );
    }
    renderRow(rowData, sectionID: number, rowID: number) {
        var showSeparator = this.props.showSeparator ? {borderBottomColor: '#F9F9F9', borderBottomWidth: 1}: {};
        var time  = moment.utc(rowData.DateOfMeeting).format('h:mmA');
        var photo =(<Image source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg' }} style={styles.profileImage} />);
        if(rowData.Clients && rowData.Clients.Photo) {
            photo =(<Image source={{uri: rowData.Clients.Photo }} style={styles.profileImage} />);
        }
        else {
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

var styles = StyleSheet.create({
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

module.exports = ScheduleList;
