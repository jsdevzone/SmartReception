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
  ScrollView,

} = React;

var baseWidth = 140;
var baseHeight = 140;
var mergin = 5;

var images = [
    "http://www.gfxtr.net/uploads/posts/2014-08/1408087920_shutterstock_13632556.jpg",
    "http://www.gfxtr.net/uploads/posts/2014-09/1411981228_shutterstock_217463887.jpg",
    "http://www.tummytemple.com/images/slideshow/shutterstock_109527617.png"
];

export class Gallery extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView  style={{flex:0.85}} automaticallyAdjustContentInsets={false} horizontal={false}>
                <View style={{ backgroundColor: '#f4f4f4', flexDirection: 'column'}}>
                    <View style={{flexDirection:'row'}}>
                    <View style={{ flexDirection: 'column'}}>
                    <View style={{ flexDirection: 'row'}}>
                        <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                        <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                        <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                    </View>

                    </View>
                    <Image style={[styles.tile, styles.verticalLarge]} source={require('image!background')} />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={[styles.tile, styles.large]} source={require('image!background')} />
                        <View style={{flexDirection:'column'}}>
                            <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                            <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                    <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                    <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection:'column'}}>
                        <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                        <Image style={[styles.tile, styles.small]} source={require('image!background')} />
                    </View>
                        <Image style={[styles.tile, styles.large]} source={require('image!background')} />
                    </View>
                </View>
                </ScrollView>
                <View style={{flex:1, flexDirection: 'column'}}>
                    <View style={{backgroundColor:'#CCC', flex:1}}></View>
                <View style={{backgroundColor:'#E4E4E4', flex:1}}></View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: '#F4F4F4',
      flexDirection: 'row',
      padding: 10
    },
    tile:{
        margin: 5
    },
    small: {
        width: baseWidth,
        height: baseHeight
    },
    large: {
        width: baseWidth * 2 + 10,
        height: baseHeight * 2 + 10
    },
    verticalLarge: {
        width: baseWidth,
        height: baseHeight * 2 + 10
    }
});

AppRegistry.registerComponent('SmartReception', () => SmartReception);
