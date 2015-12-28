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
];


import ClientStore from '../../stores/clientStore';


export class UserList extends React.Component {
    constructor(args) {
        super(args);

        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            isLoading: false,
            dataSource: this.dataSource.cloneWithRows(data),
        };

        ClientStore.addEventListener('clientlistloaded', this.clientStoreLoaded.bind(this));
        ClientStore.addEventListener('beforeclientload', this.beforeClientLoad.bind(this));
        ClientStore.getClients('');
    }
    clientStoreLoaded(clients) {
        this.setState({ isLoading: false, dataSource: this.dataSource.cloneWithRows(clients)})
    }
    beforeClientLoad() {
        this.setState({ isLoading: true });
    }
    render() {
        return (<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} style={[styles.container, this.props.style]} />)
    }
    renderRow(rowData, sectionID: number, rowID: number) {
        let showSeparator = this.props.showSeparator ? {borderBottomColor: '#F9F9F9', borderBottomWidth: 1}: {};
        let photo = null;
        if(rowData.Photo != null) {
            photo =(<Image source={{uri: rowData.Photo }} style={styles.profileImage} />);
        }
        else {
            photo =(
                <View style={[styles.profileImage, {backgroundColor: getRandomColor()}]}>
                    <Text style={styles.profileText}>{rowData.FirstName ? rowData.FirstName.substr(0,1) : ""}</Text>
                </View>
            );
        }

        return (
            <TouchableHighlight underlayColor="#C6C7EA" onPress={() => this.props.onPress(rowData) }>
                <View style={[styles.listItem, showSeparator ]}>
                    { photo }
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{rowData.FirstName + " " + rowData.LastName}</Text>
                        <Text style={styles.position}>{rowData.Position}</Text>
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
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    profileText: {
        color: '#FFF',
        fontSize: 25
    }
});
