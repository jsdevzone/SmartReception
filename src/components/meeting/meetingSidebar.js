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
} = React;

var data = [
    { name: '', icon: 'home'},
    { name: '', icon: 'calendar'},
    { name: '', icon: 'cog'},
    { name: '', icon: 'calendar-check-o'},
    { name: '', icon: 'comments-o'},
    { name: '', icon: 'check-square-o'},
    { name: '', icon: 'power-off'},
];

class MeetingSidebar extends React.Component{
    constructor(args) {
        super(args);
        this.state = {
            selectedIndex: 0
        };
    }
    onPress(index) {
        this.setState({ selectedIndex: index });
    }
    render() {
        return (
            <View style={styles.sidebar}>
                {(() => {
                    var components = [];
                    data.map((item, index) => {
                        var isSelected = this.state.selectedIndex == index;
                        components.push(
                            <TouchableWithoutFeedback onPress={this.onPress.bind(this, index)}>
                                <View  style={[styles.iconWrapper, isSelected ? styles.selected : {}]} >
                                    <Icon name={item.icon} size={25} style={styles.icon}/>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    });
                    return components;
                })()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    sidebar: {
        width: 50,
        flexDirection: 'column',
        backgroundColor:'#F0F1F3',
        borderLeftColor: '#D8E0F1',
        borderLeftWidth: 1
    },
    iconWrapper: {
        padding: 15,
        height: 50
    },
    icon: {
        color: '#FFF',
        fontSize: 25,
    },
    selected: {
        backgroundColor: '#766946'
    }
});

module.exports = MeetingSidebar;
