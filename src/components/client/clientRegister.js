'use strict';
/**
 * Smart reception System
 * @author Jasim
 * @company E-Gov LLC
 */

 import React, {View, StyleSheet, Text, TextInput, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Moment from 'moment';

/**
 * Register New Clients from the tablet itself
 * @class ClientRegister
 * @extends React.Component
 */
export default class ClientRegister extends React.Component {
     /**
      * @constructor
      */
     constructor(args) {
         super(args);
     }

     /**
      * @render
      * @return {View} view
      */
     render() {
         return (
             <View style={styles.container}>
                <View style={styles.widget}>
                    <View style={styles.widgetHeader}>
                        <Text style={styles.widgetHeaderText}>Register New Client</Text>
                    </View>
                    <View style={styles.widgetBody}>
                        <View style={styles.sectionTitle}>
                            <Text>Personal Information</Text>
                        </View>
                        <View style={styles.sectionBody}>
                            <View style={styles.row}>
                                <View style={[styles.formGroup, {flex:1}]}>
                                    <Text style={styles.label}>Arabic First Name</Text>
                                    <TextField icon="user" />
                                </View>
                                <View style={[styles.formGroup, {flex:1}]}>
                                    <Text style={styles.label}>Arabic Last Name</Text>
                                    <TextField  icon="user" />
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.formGroup, {flex:1}]}>
                                    <Text style={styles.label}>First Name</Text>
                                    <TextField  icon="user" />
                                </View>
                                <View style={[styles.formGroup, {flex:1}]}>
                                    <Text style={styles.label}>Last Name</Text>
                                    <TextField  icon="user" />
                                </View>
                            </View>
                            <View style={[styles.row, { alignItems: 'center', justifyContent: 'center', paddingTop: 10 }]}>
                                <Text style={styles.label}>
                                    Note: The name must match the name exists in the Passport Or Emirates's ID
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.formGroup, {flex:1}]}>
                                    <Text style={styles.label}>Nationality</Text>
                                    <TextField  icon="angle-down" />
                                </View>
                                <View style={[styles.formGroup, {flex:1}]}>
                                    <Text style={styles.label}>Gender</Text>
                                    <TextField  icon="angle-down" />
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.formGroup, {flex:1}]}>
                                    <Text style={styles.label}>Birth Day</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <TextField palceholder="Day" style={{width: 60}}  icon="angle-down" />
                                        <TextField palceholder="Month"style={{flex: 1, marginLeft: 10, marginRight: 10}}  icon="angle-down" />
                                        <TextField palceholder="Year" style={{width: 120}}  icon="angle-down" />
                                    </View>
                                </View>
                                <View style={[styles.formGroup, {flex:1}]}>
                                    <Text style={styles.label}>Education Level</Text>
                                <TextField  icon="angle-down" />
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.formGroup, {flex:1}]}>
                                    <Text style={styles.label}>Graduation Year</Text>
                                <TextField icon="angle-down" />
                                </View>
                            </View>
                        </View>
                        <View style={styles.sectionTitle}>
                            <Text>Contact Information</Text>
                        </View>
                        <View style={styles.sectionTitle}>
                            <Text>Employment Information</Text>
                        </View>
                    </View>
                </View>
             </View>
         );
     }
 }


 /**
  * Custom Text Field
  * @class TextField
  * @extends React.Component
  */
 class TextField extends React.Component {
     /**
      * @constructor
      */
     constructor(args) {
         super(args);
     }

     /**
      * @render
      * @return {View} view
      */
     render() {
         return (
             <View style={[styles.textFieldWrapper, this.props.style]}>
                <TextInput style={styles.textField} underlineColorAndroid="#F4F4F4" placeholder={this.props.placeholder} />
                <Icon name={this.props.icon} color="#5db2ff" size={20} />
             </View>
         );
     }
 }

 /**
  * @style
  */
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          flexDirection: 'column',
          padding: 10,
          backgroundColor: '#eee',
          alignItems: 'center',
          justifyContent: 'center'
      },
      widget: {
          backgroundColor: "#FFF",
          alignItems: 'stretch',
          flexDirection: 'column',
          width: 800
      },
      widgetHeader: {
          backgroundColor: '#5db2ff',
          padding: 10
      },
      widgetHeaderText: {
          color: '#FFF'
      },
      widgetBody: {
          backgroundColor: '#FFF',
          padding: 10,
          alignItems: 'stretch',
          flex: 1
      },
      textFieldWrapper: {
          flexDirection: 'row',
          height: 40,
          borderColor:'#F4F4F4',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center'
      },
      textField: {
          color: '#858585',
          flex: 1
      },
      sectionTitle: {
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#F4F4F4',
          borderStyle: 'dashed'
      },
      sectionBody: {
          padding: 10
      },
      formGroup: {
          marginLeft: 10,
          marginRight: 10
      },
      label: {
          fontWeight: 'bold',
          fontStyle: 'bold',
          fontSize: 15,
          marginBottom: 5,
          marginTop: 5
      },
      row: {
          flexDirection: 'row'
      }
  });
