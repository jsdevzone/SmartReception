/**
 * @author Jasim
 */
var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

import {Sidebar} from '../meeting/Sidebar';
import {CalendarView} from '../ux/CalendarView';
import {getCurrentDateFormatted} from '../../services/date';

 var {
     StyleSheet,
     View,
     Text,
     ListView,
     TouchableHighlight,
     TouchableWithoutFeedback,
 } = React;

var LOREM_IPSUM = `Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare,
                an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre
                luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam
                intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.`;

var data = [
    { id: 1, name: 'jasim', time: '01-01', icon: 'calendar'},
    { id: 2, name: 'Lorem Ipsum', time: '01-01', icon: 'calendar'},
    { id: 3, name: 'Lorem Ipsum', time: '01-01', icon: 'history'},
    { id: 4, name: 'Lorem Ipsum', time: '01-01', icon: 'calendar-o'},
    { id: 5, name: 'Lorem Ipsum', time: '01-01', icon: 'home'},
    { id: 6, name: 'Lorem Ipsum', time: '01-01', icon: 'calendar-o'},
    { id: 7, name: 'Lorem Ipsum', time: '01-01', icon: 'calendar-o'},
    { id: 8, name: 'Lorem Ipsum', time: '01-01', icon: 'calendar-o'},
    { id: 9, name: 'Lorem Ipsum', time: '01-01', icon: 'calendar-o'},
    { id: 10, name: 'Lorem Ipsum', time: '01-01', icon: 'calendar-o'},
    { id: 11, name: 'Lorem Ipsum', time: '01-01', icon: 'calendar-o'},
];

export class Schedule extends React.Component {
    constructor(args) {
        super(args);

        this.state = {
            tabIndex: 0
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row'}}>
                <Sidebar />
                <ScheduleSidebar />
                <View style={{ flex :1, flexDirection: 'column'}}>
                    <View style={{ backgroundColor:'#F9F7FD',borderBottomColor: '#E4E7E8', borderBottomWidth: 1 }}>
                        <ScheduleTitle/>
                    </View>
                    <View style={styles.tabPanel}>
                        <TouchableWithoutFeedback onPress={() => { this.setState({ tabIndex: 0 })}}>
                            <View style={[styles.tab, styles.noBorderRight, this.state.tabIndex == 0 ? styles.selectedTab: {}]}>
                                <Text style={[{ color: this.state.tabIndex == 0 ? '#FFF': '#766946' }]}>Minutes Of Meeting</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => { this.setState({ tabIndex: 1 })}}>
                            <View style={[styles.tab, styles.noBorderRight, this.state.tabIndex == 1 ? styles.selectedTab: {}]}>
                                <Text style={[{ color: this.state.tabIndex == 1 ? '#FFF': '#766946' }]}>Notes</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => { this.setState({ tabIndex: 2 })}}>
                            <View style={[styles.tab, styles.noBorderRight, this.state.tabIndex == 2 ? styles.selectedTab: {}]}>
                                <Text style={[{ color: this.state.tabIndex == 2 ? '#FFF': '#766946' }]}>Comments</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => { this.setState({ tabIndex: 3 })}}>
                            <View style={[styles.tab, this.state.tabIndex == 3 ? styles.selectedTab: {}]}>
                                <Text style={[{ color: this.state.tabIndex == 3 ? '#FFF': '#766946' }]}>Other</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
         );
     }
}

class ScheduleTitle extends React.Component {
  render() {
    return (
      <View style={styles.meetingTitle}>
        <View style={styles.meetingTitleInner}>
          <View style={styles.currentDateWrapper}>
            <Text style={styles.currentWeekText}>Tuesday</Text>
            <Text style={styles.currentDateText}>27</Text>
          </View>
          <View style={styles.meetingTitleTextWrapper}>
            <Text style={styles.meetingTitleText} >Project 1 - Company 1</Text>
            <View style={{flexDirection: 'row'}}>
                <Icon name="calendar" style={{marginTop: 3}} />
            <Text> Tuesday, October 27, 2015 </Text>
              <Icon name="clock-o" style={{marginTop: 3, marginLeft: 30}} />
                <Text>07: 00- 09: 00 </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class ScheduleSidebar extends React.Component {
    constructor(args) {
        super(args);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: dataSource.cloneWithRows(data)
        }
    }
    render() {
      return (
          <View style={styles.container}>
            <View style={{flex: 1}}>
            </View>
            <View style={styles.today}>
                <Icon name="calendar" size={18} />
                <Text>{getCurrentDateFormatted()}</Text>
            </View>
            <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} style={{flex: 1}} />
          </View>
      );
    }
    renderRow(rowData, sectionID: number, rowID: number) {
        return (
            <TouchableHighlight>
            <View>
             <View style={styles.row}>
                <Text style={styles.time}>08: 00 AM</Text>
                <Icon name={rowData.icon} size={18} />
                <Text style={styles.text}>{rowData.name}</Text>
             </View>
             <View style={styles.separator} />
           </View>
           </TouchableHighlight>
       );
    }
}

var styles = StyleSheet.create({
    container: {
      width: 250,
      backgroundColor: "#F9F7FD",
      borderRightColor: '#E4E7E8',
      borderRightWidth: 1,
      alignItems: 'stretch'
    },
    today: {
        flexDirection: 'row',
        padding: 15,
        borderTopColor: '#DEDDD7',
        borderTopWidth: 1,
        borderBottomColor: '#DEDDD7',
        borderBottomWidth: 1
    },
    row: {
      flexDirection: 'row',
      padding: 12,
      paddingLeft: 15
    },
    separator: {
      height: 1,
      backgroundColor: '#DEDDD7',
    },
    thumb: {
      width: 64,
      height: 64,
    },
    text: {
      flex: 1,
    },
    time: {
        marginRight: 15
    },
    meetingTitle: {
      padding: 10
    },
    meetingTitleInner: {
      flexDirection: 'row'
    },
    currentDateWrapper: {
      flexDirection: 'column',
      padding: 5,
      textAlign: 'center',
      borderColor: "#CCC",
      borderRightWidth: 1,
      paddingRight: 25,
      paddingLeft: 25,
    },
    currentDateText: {
      fontSize: 45,
    },
    currentWeekText: {
      fontSize: 18,
      color: "#000"
    },
    meetingTitleTextWrapper: {
      paddingLeft: 10,
      flex: 1
    },
    meetingTitleText: {
        marginTop: 5,
        fontSize: 30,
        marginBottom: 10
    },
    tabPanel: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    tab: {
         backgroundColor: '#FFF',
         padding: 10,
         flex: 1,
         borderColor:'#766946',
         borderWidth: 1,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center'
    },
    noBorderRight: {
        borderRightWidth: 0
    },

    selectedTab: {
        backgroundColor: '#766946',
        color: '#FFF'
    }
});
