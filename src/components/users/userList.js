'use strict';

var React = require('react-native');

var Animatable = require('react-native-animatable');
var Icon = require('react-native-vector-icons/FontAwesome');

import { getRandomColor, } from '../../utils/util';

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

export class UserList extends React.Component {
    constructor(args) {
        super(args);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: dataSource.cloneWithRows(data)
        }
    }
    render() {
        return (<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} style={styles.container} />)
    }
    renderRow(rowData, sectionID: number, rowID: number) {

        var showSeparator = this.props.showSeparator ? {borderBottomColor: '#F9F9F9', borderBottomWidth: 1}: {};

        return (
            <TouchableHighlight underlayColor="#C6C7EA">
                <View style={[styles.listItem, showSeparator ]}>
                    <Image source={{uri: rowData.image }} style={styles.profileImage} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{rowData.name}</Text>
                        <Text style={styles.position}>{rowData.position}</Text>
                    </View>
                </View>
           </TouchableHighlight>
       );
    }
}

var styles = StyleSheet.create({
    container: {
        flex :1
    },
    listItem: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 25
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    profileInfo: {
        flexDirection: 'column',
        marginLeft: 14,
        paddingTop: 10
    },
    profileName: {
        color:'#000',
        fontSize: 15
    },
    position: {
        color:"#A1A1A1"
    }
});
