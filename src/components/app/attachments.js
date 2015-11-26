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
  TouchableWithoutFeedback,
  ScrollView,
} = React;


class Attachments extends React.Component{
    constructor(args) {
        super(args);
        this.state = {

        };
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'column'}}>
                        <GalleryTile style={{width: 210, height: 210}} src={require("../../../resources/images/02.jpg")} />
                        <View style={{flexDirection:'row'}}>
                            <GalleryTile src={require("../../../resources/images/03.jpg")} />
                        <GalleryTile src={require("../../../resources/images/05.jpg")} />
                        </View>
                        <GalleryTile style={{width: 210}}  src={require("../../../resources/images/05.jpg")} />
                    <GalleryTile style={{width: 210, height: 210}}  src={require("../../../resources/images/02.jpg")} />
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <GalleryTile src={require("../../../resources/images/03.jpg")} />
                                <GalleryTile src={require("../../../resources/images/03.jpg")} />
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <GalleryTile src={require("../../../resources/images/03.jpg")} />
                            <GalleryTile src={require("../../../resources/images/03.jpg")} />
                            </View>
                        </View>
                        <GalleryTile style={{width: 210, height: 315}} src={require("../../../resources/images/05.jpg")} />
                        <View style={{flexDirection:'row'}}>
                            <GalleryTile src={require("../../../resources/images/03.jpg")} />
                        <GalleryTile src={require("../../../resources/images/02.jpg")} />
                        </View>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <GalleryTile style={{width: 210}} src={require("../../../resources/images/02.jpg")} />
                    <GalleryTile style={{width: 210, height: 315}} src={require("../../../resources/images/05.jpg")} />
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <GalleryTile src={require("../../../resources/images/03.jpg")} />
                            <GalleryTile  src={require("../../../resources/images/02.jpg")} />
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <GalleryTile src={require("../../../resources/images/05.jpg")} />
                            <GalleryTile src={require("../../../resources/images/02.jpg")} />
                            </View>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }
}

class GalleryTile extends React.Component {
    render() {
        return (<Image style={[styles.tile, this.props.style]} source={this.props.src} />);
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 10
    },
    tile: {
        width: 100,
        height: 100,
        backgroundColor: '#FFF',
        margin: 5
    }
});

module.exports = Attachments;
