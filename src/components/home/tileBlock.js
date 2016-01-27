'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */

import React, { StyleSheet, Text, View, Image, TouchableHighlight, NativeModules, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const config = { width: 120, height: 120, margin: 10 };
const possibleIconColors = [ '#8F78D4', '#58AB6A', '#BD79C1', '#B7A047', '#DE7A99', '#55A09A' ];
/**
 * @class Tile
 * @extends React.Component
 *
 * Represents a single tile in dashboard screen
 *
 * @props {String} scale represents the size of a tile. Values can be small, large, extralarge, fullColumn
 * @props {String} iconColor hex color code for icon
 * @props {String} textColor hex color code for text
 * @props {Function} onPress event handler for on tile press event
 * @props {String} text tile text
 * @props {String} icon for tile, should be the font icon name
 * @props {StyleSheet} style if any extra styles should be rendered
 * @props {Function} onPress press event handler
 */
export default class Tile extends React.Component {

    /**
     * On Tile press
     *
     * @eventhandler
     * @return {Void} undefined
     */
    onTilePress() {
        /**
         * Play the native tap sound, as it's not supported in default view component by react native
         */
        NativeModules.MediaHelper.playClickSound();
        /**
         * execute on press event passed through the props
         */
        if(this.props.onPress)
            this.props.onPress();
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {View} the tile view
     */
    render() {

        let scale = this.props.scale || 'small';
        let iconColor = this.props.iconColor || possibleIconColors[Math.floor(Math.random() * 6)];
        let textColor = this.props.textColor || '#313131';

        /**
         * This is the default tile content. A text and icon placed vertically in container using flexDirection column style.
         */
        let content = (
            <View style={styles.tileInner}>
                <Icon name={this.props.icon || "table"} size={65} color={iconColor} style={{ marginLeft: 10, flex: 1 }}/>
                <Text style={{opacity:1}}>{this.props.text}</Text>
            </View>
        );

        /**
         * If we pass some child object then it should be displayed instead of default content
         */
        if(this.props.children)
            content = this.props.children;

        let component = (
            <TouchableHighlight onPress={this.onTilePress.bind(this)} underlayColor="#FF0">
                <View style={[styles.tile, styles[scale], this.props.style]}>
                    {content}
                </View>
            </TouchableHighlight>
        );

        /**
         * Scale full column means the container with full screen height.
         * When using this mode childrens are mandatory
         */
        if(this.props.scale == 'fullColumn') {
            component = (
                <View style={[styles.tile, styles[scale], this.props.style]} accessible={true}>
                    {this.props.children}
                </View>
            );
        }

        return component;
    }
}

/**
 * @style
 */
const styles = StyleSheet.create({
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    small:{
        backgroundColor: '#FFF',
        width:config.width,
        height:config.height
    },
    large: {
        backgroundColor: '#FFF',
        width: (config.width * 2) + config.margin,
        height: config.height
    },
    extraLarge: {
        backgroundColor: '#FFF',
        width: (config.width * 2) + config.margin,
        height: (config.height * 2) + config.margin
    },
    extraLargex2: {
        backgroundColor: '#FFF',
        width: (config.width * 2) + (config.width + config.margin) + config.margin,
        height: (config.height * 2) + config.margin
    },
    fullColumn: {
        backgroundColor: '#FFF',
        flex: 1,
        width: ((config.width + 50) * 2) + config.margin,
        height: (config.height * 4) + (config.margin * 3),
    },
});
