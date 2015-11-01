/**
* Sample React Native App
* https://github.com/facebook/react-native
* @author Jasim
*/
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var Animatable = require('react-native-animatable');
var Icon = require('react-native-vector-icons/FontAwesome');

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
    }

});


export class TileView extends React.Component {
  render() {
    return (
      <View style={[{margin:15, alignItems:'center'}]}>
      <View style={[styles.horizontal, {marginTop: 25}]}>
        <View>
          <View style={styles.horizontal}>
             <Animatable.View animation="slideInDown" duration={500} style={[styles.tile,styles.small, {paddingTop: 20}]}>
              <Icon name="home" size={65} color="#00869C" style={{marginLeft: 10, flex: 1}}/>
              <Text>Home</Text>
            </Animatable.View>
            <Animatable.View animation="slideInDown" duration={500} style={[styles.tile,styles.small, {paddingTop: 20}]}>
                <Icon name="calendar-check-o" size={65} color="#DA522C" style={{marginLeft: 10, flex: 1}}/>
                <Text>Schedule</Text>
            </Animatable.View>

          </View>
          <Animatable.View animation="slideInLeft" duration={500} ref="tile" style={[styles.tile,styles.large,{paddingTop: 10}]}>
              <Text style={{fontSize: 55, color: '#BC1C48'}}>
                  1
              </Text>
              <Text style={{fontSize: 18}}>Client</Text>
            <Text>Waiting in Waiting Area </Text>
          </Animatable.View>
          <View style={styles.horizontal}>
          <Animatable.View animation="slideInLeft" duration={500} style={[styles.tile,styles.small, {paddingTop: 20}]}>
              <Icon name="cog" size={65} color="#A300AB" style={{marginLeft: 10, flex: 1}}/>
            <Text>Settings</Text>
        </Animatable.View>
          <Animatable.View animation="slideInRight" duration={500}  style={[styles.tile,styles.small, {paddingTop: 20}]}>
              <Icon name="calendar" size={65} color="#603BBC" style={{marginLeft: 10, flex: 1}}/>
            <Text>Calendar</Text>
            </Animatable.View>
          </View>
          <View style={styles.horizontal}>
            <View style={[styles.tile,styles.small, {paddingTop: 20}]}>
                <Icon name="comments-o" size={65} color="#2E84F1" style={{marginLeft: 10, flex: 1}}/>
              <Text>Feedback</Text>
            </View>
            <View style={[styles.tile,styles.small, {paddingTop: 20}]}>
                <Icon name="check-square-o" size={65} color="#01A11B" style={{marginLeft: 10, flex: 1}}/>
              <Text>Survey</Text>
            </View>
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
          <View style={[styles.tile,styles.large, {flexDirection: 'row'}]}>
            <Icon name="search" size={65} color="#F03552" style={{marginLeft: 10}}/>
          <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 18}}>Search</Text>
            <Text>Search people or meeting here...</Text>
          </View>
        </View>

        </View>
        <View style={{flex:1, flexDirection: 'column', height: null}}>
            <View style={[styles.tile,styles.fullColumn, {flexDirection:'column', alignItems:'stretch'}]}>
              <View style={{ width: null, height: 180, alignItems: 'stretch'}}>
                <Image source={require('image!day_view')} style={{flex: 1, width: null, height: 180}}>
                </Image>
              </View>
              <View style={{flex:1, alignItems:'flex-start'}}>
              <Image source={require('image!user_list')} style={{flex: 1, width: 240, height: 180, marginTop: 5, marginLeft:10}}>
              </Image>
              </View>
            </View>
        </View>
        </View>
        </View>
    );
  }
}
