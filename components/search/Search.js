'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var  { Component, StyleSheet, View, Text, ListView, SwitchAndroid, TextInput, Image, } = React;

import {Sidebar} from '../meeting/Sidebar';
import {UserList} from '../dashboard/TileView';

export class Search extends Component {
    constructor(args) {
        super(args);
    }
    render() {
        return (
            <View style={styles.container}>
                <Sidebar/>
                <View style={styles.sidebar}>
                    <View style={styles.sidebarTopBar}>
                        <View style={styles.searchTextBoxWrapper}>
                            <TextInput underlineColorAndroid="#FFF" placeholder="Search here... " style={{ flex:1 }} />
                            <View style={{backgroundColor: '#766946', padding: 10, paddingTop: 15, alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name="search" size={18} color="#FFF" />
                            </View>
                        </View>
                    </View>
                    <UserList showSeparator={true} />
                </View>
                <View style={styles.searchContent}>
                    <View style={styles.searchTitle}>
                        <Image source={{uri: 'http://avenger.kaijuthemes.com/assets/demo/avatar/avatar_02.png'}} style={styles.profileImage} />
                        <View style={styles.profileInfoWrapper}>
                            <Text style={styles.profileName}>Billy Duke</Text>
                            <Text style={styles.proileProfession}>Senior Key Account Manager</Text>
                            <Text style={styles.location}>Sidney, Australia</Text>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Icon name="pencil-square-o" size={65} />
                        </View>
                    </View>
                    <View>
                    </View>
                </View>
            </View>
        );
    }
}

let categoryData = [
    { id: 1, name: 'General', icon: 'table' },
    { id: 2, name: 'Application', icon: 'list-alt' },
    { id: 3, name: 'Security', icon: 'lock' },
    { id: 4, name: 'Service', icon: 'cloud' },
    { id: 5, name: 'About', icon: 'building-o' },
    { id: 6, name: 'Account', icon: 'user' }
];

let styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F9F9',
        flexDirection: 'row',
        flex: 1
    },
    sidebar: {
        width: 300,
        backgroundColor: '#FFF',
        flexDirection: 'column',
    },
    sidebarTopBar: {
        padding: 15
    },
    searchTextBoxWrapper: {
        borderColor: "#766946",
        borderWidth: 1,
        flexDirection: 'row',
    },
    searchContent: {
        flex: 1,
        flexDirection: 'column',
        padding: 25
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 100/2,
      borderColor: '#F1EDED',
      borderWidth: 5,
      marginBottom: 5
    },
    searchTitle: {
        flexDirection: 'row'
    },
    profileInfoWrapper: {
        margin: 20,
        marginTop: 13,
        flex: 1
    },
    profileName: {
        fontSize: 30,
        color: '#000',
        marginBottom: 2
    },
    proileProfession: {
        fontSize: 18,
        marginBottom: 2
    },
    location: {
        fontSize: 16,
        color: '#766946'
    }
});
