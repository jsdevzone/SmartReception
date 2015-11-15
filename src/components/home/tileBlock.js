/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var Animatable = require('react-native-animatable');
var Icon = require('react-native-vector-icons/FontAwesome');

import { getRandomColor } from '../../utils/util';
var NavigatorActions = require('../../actions/navigator');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} = React;


const TILE_HEIGHT = 120;
const TILE_WIDTH = 120;
const TILE_MARGIN = 10

class Tile extends React.Component{
    onTilePress() {
        NavigatorActions.navigateToRoute(this.props.route);
    }
    render() {
        var scale = this.props.scale ? this.props.scale : 'small';
        var iconColor = this.props.iconColor ? this.props.iconColor : getRandomColor();
        var textColor = this.props.textColor ? this.props.textColor: '#313131'

        if(this.props.scale == 'fullColumn') {
            return (
                <Animatable.View animation="slideInDown" duration={500} style={[styles.tile, styles[scale], this.props.style]}>
                    {this.props.children}
                </Animatable.View>
            );
        }
        else {
            return (
                <TouchableWithoutFeedback onPress={this.onTilePress.bind(this)}>
                    <Animatable.View animation="slideInDown" duration={500} style={[styles.tile, styles[scale], this.props.style]}>
                        {(() => {
                            if(!this.props.children) {
                                return (
                                    <View style={styles.tileInner}>
                                        <Icon name={this.props.icon} size={65} color={iconColor} style={{marginLeft: 10, flex: 1}}/>
                                        <Text style={{color: textColor}}>{this.props.text}</Text>
                                    </View>
                                );
                            }
                            else {
                                return this.props.children;
                            }
                        })()}
                    </Animatable.View>
                </TouchableWithoutFeedback>
            );
        }
    }
}

var styles = StyleSheet.create({
    tile: {
        backgroundColor: '#FFF',
        margin: 5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    tileInner: {
        paddingTop: 20,
        flex: 1,
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
    fullColumn: {
        backgroundColor: '#FFF',
        flex: 1,
        width: ((TILE_WIDTH + 50) * 2) + TILE_MARGIN,
        height: (TILE_WIDTH * 4) + (TILE_MARGIN*3),
    },
});
module.exports = Tile;
