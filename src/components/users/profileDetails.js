
import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var { View, Text, Component, StyleSheet, } = React;

class ProfileDetails extends Component {
    constructor(args) {
        super(args);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Icon name="envelope" size={18} color="#5C87FF" />
                    <View style={{marginLeft: 10}}>
                        <Text style={styles.profileKey}>Email</Text>
                        <Text style={styles.profileValue}>{this.props.user.Email}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Icon name="phone" size={18} color="#33886D" />
                    <View style={{marginLeft: 10}}>
                        <Text style={[styles.profileKey,{ color: '#33886D'}]}>Phone</Text>
                        <Text style={styles.profileValue}>{this.props.user.Mobile}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Icon name="map-marker" size={18} color="#AF4242" />
                    <View style={{marginLeft: 10}}>
                        <Text style={[styles.profileKey,{ color: '#AF4242'}]}>Address</Text>
                        <Text style={styles.profileValue}>{this.props.user.Location}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Icon name="envelope" size={18} color="#9EAB56" />
                    <View style={{marginLeft: 10}}>
                        <Text style={[styles.profileKey,{ color: '#9EAB56'}]}>Post Box</Text>
                        <Text style={styles.profileValue}>{this.props.user.PoBox}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Icon name="users" size={18} color="#307682" />
                    <View style={{marginLeft: 10}}>
                        <Text style={[styles.profileKey,{ color: '#307682'}]}>Company</Text>
                        <Text style={styles.profileValue}>{this.props.user.Companies.Name}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Icon name="briefcase" size={18} color="#0F4899" />
                    <View style={{marginLeft: 10}}>
                        <Text style={[styles.profileKey,{ color: '#0F4899'}]}>Position</Text>
                        <Text style={styles.profileValue}>{this.props.user.Position}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Icon name="flag" size={18} color="#A26912" />
                    <View style={{marginLeft: 10}}>
                        <Text style={[styles.profileKey,{ color: '#A26912'}]}>Nationality</Text>
                        <Text style={styles.profileValue}>{this.props.user.Countries.Name}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F4F4F4',
        flexDirection: 'row'
    },
    profileKey: {
        fontSize: 18,
        color: '#5C87FF'
    },
    profileValue: {

    }
});

module.exports = ProfileDetails;
