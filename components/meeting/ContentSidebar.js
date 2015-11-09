/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';
var React = require('react-native');
var  {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Component,
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');


var styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: "#F9F7FD",
    borderRightColor: '#E4E7E8',
    borderRightWidth: 1,
    alignItems: 'stretch'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    borderColor: '#F1EDED',
    borderWidth: 5,
    marginTop: 30,
    marginBottom: 5
  },
  profileName: {
      fontSize: 25,
      color: '#5D626D',
      fontWeight: 'bold'
  },
  contactsWrapper: {
    margin: 5,
    borderColor: '#D7DBDC',
    borderWidth: 1,
    padding: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10
 },
 contactInfoWrapper: {
   width: 250,
   padding: 5,
   flexDirection: 'row',
   alignItems: 'flex-end'
 },
 icon: {
   color: '#5964CD',
   fontSize: 16,
   height: 25,
   flex: 1
 },
 buttonBar: {
   backgroundColor: '#F4F4F4',
   width: 250,
   flexDirection: 'row',
   alignItems: 'stretch'
 },
 button: {
   borderColor: '#CCC',
   borderWidth: 1,
   flexDirection: 'column',
   margin: 1,
   alignItems: 'center',
   padding: 10
 },
 contactItem: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    textAlign: 'center'
 },
});

export class ContentSidebar extends Component{
  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image source={{uri: 'http://avenger.kaijuthemes.com/assets/demo/avatar/avatar_02.png'}} style={styles.profileImage} />
          <Text style={styles.profileName}>Billy Duke</Text>
          <Text>Chief Executive Officer</Text>
          <Text>Globex Corporation</Text>
          <View style={{flexDirection: 'row'}}>
            <Icon name="location-arrow" size={18} />
            <Text>United Arab Emirates</Text>
          </View>
        </View>
        <View style={[styles.contactItem, {margin: 4, marginTop: 20}]}>
            <Image source={require('image!contact')} style={{ width: 16, height: 16, marginRight: 5 }} />
          <Text>+971 52 3663566</Text>
        </View>

        <View style={[styles.contactItem, {margin: 5}]}>
            <Image source={require('image!contact')} style={{ width: 16, height: 16, marginRight: 5 }} />
          <Text>+971 52 526589655</Text>
        </View>

        <View style={[styles.contactItem, {margin: 5}]}>
            <Image source={require('image!e_mail')} style={{ width: 16, height: 16, marginRight: 5 }} />
            <Text>info@ontime.com</Text>
        </View>

        <View style={[styles.contactItem, {margin: 5}]}>
            <Image source={require('image!applications_internet')} style={{ width: 16, height: 16, marginRight: 5 }} />
          <Text>http://www.ontime.ae</Text>
        </View>


        <View style={{flex: 1}}></View>
        <View style={styles.buttonBar}>
          <SidebarButton style={{flex:1}} text="History" icon="calendar" />
        <SidebarButton style={{flex:1}} text="Company" icon="building-o"/>
      <SidebarButton style={{flex:1}} text="Notes" icon="sticky-note-o"/>
        </View>
        <View style={styles.buttonBar}>
          <SidebarButton style={{flex:1}} text="Search" icon="search"/>
        <SidebarButton style={{flex:1}} text="Minutes Of Meeting" icon="file-text-o"/>
        </View>
      </View>
    );
  }
}

export class SidebarButton extends Component {
  render() { 
    return (
      <View style={[styles.button, this.props.style]}>
        <Icon name={this.props.icon} style={{fontSize: 25, height: 25, width: 25, margin: 5, marginBottom: 0}} size={25}/>
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}
