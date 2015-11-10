'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var  { Component, StyleSheet, View, Text, ListView, SwitchAndroid, } = React;

export class Settings extends Component {
    constructor(args) {
        super(args);
    }
    render() {
        return (
            <View style={styles.container}>
                <SettingsSidebar />
                <View style={styles.settingsContent}>
                    <View style={styles.settingsContentTitle}>
                        <Icon name="table" size={18} />
                        <Text style={styles.settingsContentTitleText}>General</Text>
                    </View>
                    <View style={styles.settingsContentBody}>
                        <GeneralSettings />
                    </View>
                </View>
            </View>
        );
    }
}

class GeneralSettings extends Component {
    constructor(args) {
        super(args);
        this.state = {};
    }
    render() {
        return (
            <View style={{padding: 20, backgroundColor:'#FFF', width: 500}}>
                <Text>Settings</Text>
                <View style={{padding: 10, flexDirection: 'row', borderBottomColor:'#E9E9E9', borderBottomWidth: 1}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18}}>Notification</Text>
                        <Text style={{color:'#CCC'}}>Enable Notification On Transactions </Text>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                         <SwitchAndroid value={true} />
                    </View>
                </View>
                <View style={{padding: 10, flexDirection: 'row', borderBottomColor:'#E9E9E9', borderBottomWidth: 1}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18}}>Notification</Text>
                        <Text style={{color:'#CCC'}}>Enable Notification On Transactions </Text>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                         <SwitchAndroid value={true} />
                    </View>
                </View>
                <View style={{padding: 10, flexDirection: 'row', borderBottomColor:'#E9E9E9', borderBottomWidth: 1}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18}}>Notification</Text>
                        <Text style={{color:'#CCC'}}>Enable Notification On Transactions </Text>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                         <SwitchAndroid value={true} />
                    </View>
                </View>
            </View>
        );
    }
}

class SettingsSidebar extends Component {
    constructor(args) {
        super(args);

        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

        this.state = {
            categoryDataSource: dataSource.cloneWithRows(categoryData)
        };
    }
    renderRow(rowData) {
        return (
            <View style={styles.sidebarCategoryTitle}>
                <Icon name={rowData.icon} size={18} />
                <Text style={styles.sidebarCategoryTitleText}>{rowData.name}</Text>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.sidebar}>
                <View style={styles.sidebarTitle}>
                    <Icon name="cog" size={18} />
                    <Text style={styles.sidebarTitleText}>Settings</Text>
                </View>
                <View style={styles.sidebarCategorySeparator}></View>
                <ListView dataSource={this.state.categoryDataSource} renderRow={this.renderRow} />
                <View style={styles.sidebarCategorySeparator}></View>
                <ListView dataSource={this.state.categoryDataSource} renderRow={this.renderRow} />
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
        backgroundColor: '#F0F0F0',
        flexDirection: 'row',
        flex: 1
    },
    sidebar: {
        width: 250,
        flexDirection: 'column',
        borderRightColor: '#E6E6E6',
        borderRightWidth: 1
    },
    sidebarTitle: {
        backgroundColor: '#FFF',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sidebarCategorySeparator:{
        height: 40
    },
    sidebarTitleText: {
        fontSize: 18,
        color: '#000',
    },
    sidebarCategoryTitle: {
        padding: 12,
        borderBottomWidth: 1,
        backgroundColor: '#FFF',
        borderBottomColor: '#F4F4F4',
        flexDirection: 'row'
    },
    sidebarCategoryTitleText: {
        color: '#000',
        marginLeft: 5
    },
    settingsContent: {
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1
    },
    settingsContentTitle: {
        backgroundColor: '#FFF',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    settingsContentTitleText: {
        fontSize: 18,
        color: '#000',
    },
    settingsContentBody: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
