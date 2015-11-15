/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

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

var data = [
    { time: '08:00', icon: 'envelope', date: '01', month: 'October 2015', day: 'Thursday', title: 'Project Planning', },
    { time: '10:00', icon: 'calendar', date: '03', month: 'October 2015', day: 'Sunday', title: 'Sprint Scheduling',  },
    { time: '13:30', icon: 'user', date: '05', month: 'October 2015', day: 'Tuesday', title: 'Workshop' },
    { time: '12:00', icon: 'twitter', date: '13', month: 'October 2015', day: 'Wednesday', title: 'Social Marketing' },
    { time: '14:00', icon: 'table', date: '20', month: 'October 2015', day: 'Monday', title: 'Delivery Planning' }
];

class TimeLine extends React.Component{
    constructor(args){
        super(args);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: dataSource.cloneWithRows(data)
        }
    }
    renderRow(rowData) {
        return(
            <View style={styles.timeline}>
                <View style={styles.tmLeft}>
                    <Icon name={rowData.icon} color="#5FB9CD" size={24} />
                    <Text style={styles.tmTimeText}>{rowData.time}</Text>
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
                            <Text style={styles.tmDate}>{rowData.date}</Text>
                            <View style={styles.tmDayMonthWrapper}>
                                <Text style={styles.tmDay}>{rowData.day}</Text>
                                <Text style={styles.tmMonth}>{rowData.month}</Text>
                            </View>
                        </View>
                        <View style={styles.tmTitle}>
                            <Text style={styles.tmTitleText}>{rowData.title}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} style={{ flex: 1}} />
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
