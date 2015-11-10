/**
* Sample React Native App
* https://github.com/facebook/react-native
* @author Jasim
*/
'use strict';

var React = require('react-native');

var Animatable = require('react-native-animatable');
var Icon = require('react-native-vector-icons/FontAwesome');

import {Routes} from '../../services/routes';
import {getCurrentDateFormatted, getDayName} from '../../services/date';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ToastAndroid,
  ListView,
  TouchableHighlight,
} = React;

const TILE_HEIGHT = 120;
const TILE_WIDTH = 120;
const TILE_MARGIN = 10

var styles = StyleSheet.create({
    tile: {
      backgroundColor: '#FFF',
      margin: 5,
      flexDirection: 'column',
      alignItems: 'center'
    },
    small:{
      backgroundColor: '#FFF',
      width:TILE_WIDTH,
      height:TILE_HEIGHT
    },
    large: {
      backgroundColor: '#FFF',
      width: (TILE_WIDTH * 2) + TILE_MARGIN,
      height: TILE_HEIGHT
    },
    extraLarge: {
      backgroundColor: '#FFF',
      width: (TILE_WIDTH * 2) + TILE_MARGIN,
      height: (TILE_WIDTH * 2) + TILE_MARGIN
    },
    horizontal: {
      flexDirection: 'row'
    },

     icon: {
        color: '#000',
        fontSize: 75,
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        width: 64,
        height: 64
      },
    fullColumn: {
      backgroundColor: '#FFF',
      flex: 1,
      width: ((TILE_WIDTH + 50) * 2) + TILE_MARGIN,
      height: (TILE_WIDTH * 4) + (TILE_MARGIN*3),
  },
  notificationTile: {
      flexDirection:'column',
      alignItems:'stretch'
  },
  statusContainer: {
      flexDirection:'row',
      padding: 10,
  },
  visibility: {
      backgroundColor: '#4CAF50',
      color: '#FFF',
      padding: 2,
      fontSize: 10,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#4CAF50',
      marginLeft: 10
  },
  counterContainer: {
      padding: 15,
      flexDirection: 'row',
      paddingLeft: 25,
      paddingRight: 25,
  },
  counter: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1
  },
  tabStripWrapper: {
      flexDirection: 'row',
      backgroundColor: '#5C6BC0',
      borderTopColor: '#7481CE',
      borderTopWidth: 1
  },
  tab: {
      padding: 13,
      alignItems: 'center',
      flex: 1
  },
  tabText: {
      color: '#FFF'
  },
  tabSelected: {
      backgroundColor: '#5361AD'
  }

});


export class TileView extends React.Component {
    onTilePress(route) {
        this.props.navigator.push(route);
    }
    render() {
    return (
      <View style={[{margin:15, alignItems:'center'}]}>
      <View style={[styles.horizontal, {marginTop: 25}]}>
        <View>
          <View style={styles.horizontal}>

            <TouchableWithoutFeedback onPress={()=>{this.onTilePress(Routes.meeting)}}>
                <Animatable.View animation="slideInDown" duration={500} style={[styles.tile,styles.small, {paddingTop: 20}]}>
                    <Icon name="home" size={65} color="#00869C" style={{marginLeft: 10, flex: 1}}/>
                    <Text>Home</Text>
                </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={()=>{this.onTilePress(Routes.schedule)}}>
                <Animatable.View  animation="slideInDown" duration={500} style={[styles.tile,styles.small, {paddingTop: 20}]}>
                    <Icon name="calendar-check-o" size={65} color="#DA522C" style={{marginLeft: 10, flex: 1}}/>
                    <Text>Schedule</Text>
                </Animatable.View>
            </TouchableWithoutFeedback>

          </View>
          <Animatable.View animation="slideInLeft" duration={500} ref="tile" style={[styles.tile,styles.large,{paddingTop: 10}]}>
              <Text style={{fontSize: 55, color: '#BC1C48'}}>
                  1
              </Text>
              <Text style={{fontSize: 18}}>Client</Text>
            <Text>Waiting in Waiting Area </Text>
          </Animatable.View>
          <View style={styles.horizontal}>
        <TouchableWithoutFeedback onPress={()=>{this.onTilePress(Routes.settings)}}>
          <Animatable.View animation="slideInLeft" duration={500} style={[styles.tile,styles.small, {paddingTop: 20}]}>
              <Icon name="cog" size={65} color="#A300AB" style={{marginLeft: 10, flex: 1}}/>
            <Text>Settings</Text>
        </Animatable.View>
        </TouchableWithoutFeedback>
          <Animatable.View animation="slideInRight" duration={500}  style={[styles.tile,styles.small, {paddingTop: 20}]}>
              <Icon name="calendar" size={65} color="#603BBC" style={{marginLeft: 10, flex: 1}}/>
            <Text>Calendar</Text>
            </Animatable.View>
          </View>
          <View style={styles.horizontal}>
             <Animatable.View animation="slideInUp" duration={500}  style={[styles.tile,styles.small, {paddingTop: 20}]}>
                <Icon name="comments-o" size={65} color="#2E84F1" style={{marginLeft: 10, flex: 1}}/>
              <Text>Feedback</Text>
          </Animatable.View>
             <Animatable.View animation="slideInUp" duration={500}   style={[styles.tile,styles.small, {paddingTop: 20}]}>
                <Icon name="check-square-o" size={65} color="#01A11B" style={{marginLeft: 10, flex: 1}}/>
              <Text>Survey</Text>
            </Animatable.View>
          </View>
        </View>
        <View>
          <View style={[styles.tile,styles.extraLarge, {flexDirection: 'column', alignItems:'stretch', padding: 10}]}>
            <Image source={require('image!chart')} style={{flex: 1, width: null, height: 100}}>
            </Image>
          </View>
          <View style={styles.horizontal}>
          <View style={[styles.tile,styles.small, {paddingTop: 25}]}>
              <Icon name="list-alt" size={65} color="#2574EB" style={{marginLeft: 20, flex: 1}}/>
            <Text>Questionaire</Text>
          </View>
          <View style={[styles.tile,styles.small, {flexDirection: 'column', alignItems:'stretch', padding: 3 }]}>
              <Text>Wednsday, 11:19:05</Text>
              <View style={{flex: 1, alignItems:'center', paddingTop: 3, flexDirection: 'column',}}>
                    <Text style={{fontSize: 20}}>October</Text>
                  <Text style={{fontSize: 35}}>28</Text>
                <Text style={{fontSize: 20}}>2015</Text>
                </View>
            </View>
          </View>
              <TouchableWithoutFeedback onPress={()=>{this.onTilePress(Routes.search)}}>
          <View style={[styles.tile,styles.large, {flexDirection: 'row'}]}>
            <Icon name="search" size={65} color="#F03552" style={{marginLeft: 10}}/>
          <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 18}}>Search</Text>
            <Text>Search people or meeting here...</Text>
          </View>
        </View>
    </TouchableWithoutFeedback>
        </View>
        <View style={{flex:1, flexDirection: 'column', height: null}}>
            <NotificationTile />
        </View>
        </View>
        </View>
    );
  }
}

class NotificationTile extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            selectedTabIndex: 0
        };
    }
    onTabPress(idx) {
        this.setState({ selectedTabIndex: idx });
    }
    render() {
        return (
            <View style={[styles.tile,styles.fullColumn, styles.notificationTile ]}>
                <View style={styles.statusContainer}>
                    <View style={{ flex:1 }}></View>
                    <View style={{ flexDirection: 'row'}}>
                        <Icon name="clock-o" size={12}  style={{ color: '#FF6335', marginRight: 4}} />
                        <Text style={{ color: '#515151', fontSize: 11 }}>{getCurrentDateFormatted()}</Text>
                    </View>
                    <View style={styles.visibility}>
                        <Text style={{fontSize: 11, color: '#FFF' }}>Online</Text>
                    </View>
                </View>
                <View style={styles.counterContainer}>
                    <View style={styles.counter}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="calendar" size={15} />
                            <Text style={{ marginLeft: 5, fontStyle: 'bold', color: '#423E39' }}>5,256</Text>
                        </View>
                        <View>
                            <Text style={{color:'#AEA3B0', size: 6}}>messages</Text>
                        </View>
                    </View>
                    <View style={styles.counter}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="calendar" size={15} />
                            <Text style={{ marginLeft: 5, fontStyle: 'bold', color: '#423E39' }}>5,256</Text>
                        </View>
                        <View>
                            <Text style={{color:'#AEA3B0', size: 6}}>messages</Text>
                        </View>
                    </View>
                    <View style={styles.counter}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="calendar" size={15} />
                            <Text style={{ marginLeft: 5, fontStyle: 'bold', color: '#423E39' }}>5,256</Text>
                        </View>
                        <View>
                            <Text style={{color:'#AEA3B0', size: 6}}>messages</Text>
                        </View>
                    </View>
                </View>
                <Image source={require('image!fancy_separator')} style={{width: null, height: 30}} />
                <View style={styles.tabStripWrapper}>
                    {(()=>{
                        var array = [];
                        var d = new Date();
                        var dates=[];
                        if(d.getDay() > 4) {
                            dates.push({ name: "Sunday", date: new Date() });
                            dates.push({ name: "Monday", date: new Date() }),
                            dates.push({ name: "Tuesday", date: new Date() });
                        }
                        else {
                            if(d.getDay() + 1 > 4) {
                                dates.push({ name: "Today", date: new Date() });
                                dates.push({ name: "Tomorrow", date: new Date() }),
                                dates.push({ name: "Sunday", date: new Date() });
                            }
                            else {
                                var day = getDayName(d.getDay() + 2)
                                dates.push({ name: "Today", date: new Date() });
                                dates.push({ name: "Tomorrow", date: new Date() }),
                                dates.push({ name: ""+day+"", date: new Date() });
                            }
                        }


                        for(var i = 0; i < dates.length; i++) {
                            array.push(
                                <TouchableWithoutFeedback onPress={this.onTabPress.bind(this, i)}>
                                    <View style={[styles.tab, this.state.selectedTabIndex == i ? styles.tabSelected : null]}>
                                        <Text style={styles.tabText}>{dates[i].name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }
                        return array;
                    })()}
                </View>
                <UserList />
            </View>
        );
    }
}

export class UserList extends React.Component {
    constructor(args) {
        super(args);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: dataSource.cloneWithRows(data)
        }
    }
    render() {
        return (<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} style={{flex: 1}} />)
    }
    renderRow(rowData, sectionID: number, rowID: number) {
        return (
            <TouchableHighlight underlayColor="#C6C7EA">
                <View style={[{flexDirection: 'row', padding: 10, paddingLeft: 25},this.props.showSeparator ? {borderBottomColor: '#F9F9F9', borderBottomWidth: 1}: {}]}>
                    <Image source={{uri: rowData.image }}
                        style={{width: 50, height: 50, borderRadius: 25}} />
                    <View style={{flexDirection: 'column', marginLeft: 14, paddingTop: 10}}>
                        <Text style={{color:'#000', fontSize: 15}}>{rowData.name}</Text>
                        <Text style={{color:"#A1A1A1"}}>{rowData.position}</Text>
                    </View>
                </View>
           </TouchableHighlight>
       );
    }
}

var data = [
    { name: 'Mogen Polish', position: 'Writer, Mag Editor', image: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg' },
    { name: 'Joge Lucky', position: 'Art Director, Movie Cut', image: 'https://s3.amazonaws.com/uifaces/faces/twitter/sauro/128.jpg' },
    { name: 'Folisise Chosielie', position: 'Musician, Player',image: 'https://s3.amazonaws.com/uifaces/faces/twitter/mlane/128.jpg' },
    { name: 'Peter', position: 'Musician, Player', image: 'https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg' },
    { name: 'John Doe', position: 'Art Director, Moview Cut', image: 'https://s3.amazonaws.com/uifaces/faces/twitter/chadengle/128.jpg' },
    { name: 'Billy Duke', position: 'Director, Operations', image: 'https://s3.amazonaws.com/uifaces/faces/twitter/tutvid/128.jpg' },
    { name: 'Folisise Chosielie', position: 'Musician, Player',image: 'https://s3.amazonaws.com/uifaces/faces/twitter/philcoffman/128.jpg' },
    { name: 'Joge Lucky', position: 'Art Director, Movie Cut', image: 'https://s3.amazonaws.com/uifaces/faces/twitter/msurguy/128.jpg' },
    { name: 'Mogen Polish', position: 'Writer, Mag Editor', image: 'https://s3.amazonaws.com/uifaces/faces/twitter/danbenoni/128.jpg' },
];
