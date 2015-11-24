
import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var { View, Text, Component, StyleSheet, } = React;

class Notes extends Component {
    constructor(args) {
        super(args);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerInner}>
                    <View style={styles.header}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <Icon name="list" size={18} />
                            <Text style={{fontSize: 15}}>Notes</Text>
                        </View>

                    </View>
                    <View style={{flex:1}}></View>
                    <View style={styles.footer}>
                        <View style={{flex:2}}>
                        </View>
                        <View style={styles.button}>
                            <Icon name="ban" color="#FFF" size={18} />
                            <Text style={{color:'#FFF'}}>Cancel Changes</Text>
                        </View>
                        <View style={[styles.button, { backgroundColor: '#6887ff' }]}>
                            <Icon name="copy" color="#FFF" size={18} />
                            <Text style={{color:'#FFF'}}>Copy From Summary</Text>
                        </View>
                        <View style={[ styles.button, { backgroundColor: '#1fa67a' }]}>
                            <Icon name="save" color="#FFF" size={18} />
                            <Text style={{color:'#FFF'}}>Save Notes</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10
    },
    containerInner: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#EAE5E5',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f4f4f4',
    },
    footer: {
        padding: 5,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f4f4f4',
    },
    button: {
        backgroundColor:'#AF3D3D',
        padding: 10,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = Notes;
