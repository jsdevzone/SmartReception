'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 *
 * Copyright (C) E-Gov LLC, Dubai, UAE - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

 import React, { View, StyleSheet, Text, TextInput, Image, TouchableNativeFeedback, ToastAndroid, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Moment from 'moment';
 import TextField from '../ux/textField';
 import ComboBox from '../ux/comboBox';

 import { getDays, Months } from '../../utils/util';

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

          /**
           * @test
           * Initial Dummy Data for user
           */
          let initialUser = {
              FirstName: 'Muhammed',
              LastName: 'Jasim',
              FirstNameArabic: 'محمد',
              LastNameArabic: 'جاسم',
              Nationality: 'Male',
              Gender: 'Male',
              Month: 'February',
              Day: 25

          };

          /**
           * @state
           */
           this.state = {
               user: initialUser,
               selectedIndex: 1,
               title: 'Personal Information',
               icon: 'user'
           };

          this.forms = {
              PERSONAL_INFORMATION : 1,
              CONTACT_INFORMATION: 2,
              EMPLOYMENT_INFORMATION : 3
          };
     }

     /**
      * Change the tab by changing the selected index state.
      *
      * @param {Number} index
      * @return {Void} undefined
      */
     onTabPressed(index) {
         this.setState({ selectedIndex: index });
     }

     /**
      * Generic function to handle the text field value property change event
      *
      * @eventhandler
      * @param {String} property - key in the state user
      * @param {String} value - value to be changed
      * @return {Void} undefined
      */
     onTextfieldValueChanged(property, value) {
         let user = this.state.user;
         user[property] = value;
         this.setState({ user: user, title: value });
     }

     /**
      * @render
      * @return {View} view
      */
     render() {
         let component = <PersonalInformation user={this.state.user} onFieldEdit={this.onTextfieldValueChanged.bind(this)} />;

        /**
         * Checking current @state selectedState value then renders appropriate Component
         **/
        switch(this.state.selectedIndex) {
            case this.forms.CONTACT_INFORMATION:
                component = <ContactInformation user={this.state.user} onFieldEdit={this.onTextfieldValueChanged.bind(this)} />;
                break;
            case this.forms.EMPLOYMENT_INFORMATION:
                component = <EmploymentInformation user={this.state.user} onFieldEdit={this.onTextfieldValueChanged.bind(this)} />;
                break;
        }

         return (
             <View style={styles.container}>
                <RegisterSidebar onTabPressed={this.onTabPressed.bind(this)} selectedIndex={this.state.selectedIndex} />
                <View style={{ flex: 1, padding: 10 }}>
                <View style={[styles.widget, { flex: 1 }]}>
                    <View style={styles.widgetHeader}>
                        <Icon name={this.state.icon} size={20} color="#C03C3D" />
                        <Text style={styles.widgetHeaderText}>{this.state.title}</Text>
                    </View>
                    <View style={styles.widgetBody}>
                        { component }
                    </View>
                    <View style={styles.widgetFooter}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('#CCC', false)}>
                            <View style={styles.button}>
                                <Icon name="pencil" size={20}/>
                                <Text> Register New User</Text>
                        </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('#CCC', false)}>
                            <View style={styles.button}>
                                <Icon name="save" size={20}/>
                                <Text>Save User</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('#CCC', false)}>
                            <View style={styles.button}>
                                <Icon name="times" size={20}/>
                                <Text>Cancel Edit</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('#CCC', false)}>
                            <View style={styles.button}>
                                <Icon name="trash" size={20}/>
                                <Text>Delete User</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                </View>
             </View>
         );
     }
 }


 /**
  * The component that's appearing on the left side of the register form
  * @class RegisterSidebar
  * @extends React.Component
  */
class RegisterSidebar extends React.Component {

    /**
     * @render
     * React Js render method - See React Js For more details
     */
    render() {
        return (
            <View style={styles.userProfileWrapper}>
                <View style={styles.profile}>
                    <Image
                        source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'}}
                        style={styles.profileImage} />
                    <Text style={styles.profileName}>dgsdfghdfhdfh</Text>
                    <Text style={styles.profileProfession}>dfghdfhdfhdfh</Text>
                </View>
                <View style={styles.profileLinks}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('#CCC', false)}
                        onPress={() => this.props.onTabPressed(1) }>
                        <View style={[styles.link, this.props.selectedIndex == 1 ? styles.linkActive: null]}>
                            <Icon name="user" size={14}
                                style={[styles.linkIcon, this.props.selectedIndex == 1 ? { color: '#FFF'}: null ]} />
                             <Text style={this.props.selectedIndex == 1 ? { color: '#FFF'}: null}>Personal Information</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('#CCC', false)}
                        onPress={() => this.props.onTabPressed(2) }>
                        <View style={[styles.link, this.props.selectedIndex == 2 ? styles.linkActive: null]}>
                            <Icon name="envelope" size={14}
                                style={[styles.linkIcon, this.props.selectedIndex == 2 ? { color: '#FFF'}: null ]} />
                            <Text style={this.props.selectedIndex == 2 ? { color: '#FFF'}: null}>Contact Information</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('#CCC', false)}
                        onPress={() => this.props.onTabPressed(3) }>
                        <View style={[styles.link, this.props.selectedIndex == 3 ? styles.linkActive: null]}>
                            <Icon name="briefcase" size={14}
                                  style={[styles.linkIcon, this.props.selectedIndex == 3 ? { color: '#FFF'}: null ]} />
                            <Text style={this.props.selectedIndex == 3 ? { color: '#FFF'}: null}>Employment Information</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{flex:1}}></View>
            </View>
        );
    }
}

 /**
  * Personal Information tab inside the registration form
  * @class PersonalInformation
  * @extends React.Component
  */
class PersonalInformation extends React.Component {

    /**
     * @render
     * React Js render method - See React Js For more details
     */
    render() {
        return (
            <View style={[styles.sectionBody, { flex: 1}]}>
                <View style={styles.row}>
                    <View style={[styles.formGroup, {flex:1}]}>
                        <Text style={styles.label}>Arabic First Name</Text>
                        <TextField icon="file-code-o"
                                onChangeText={(text) => this.props.onFieldEdit('FirstNameArabic', text)}
                                value={this.props.user.FirstNameArabic}  />
                    </View>
                    <View style={[styles.formGroup, {flex:1}]}>
                        <Text style={styles.label}>Arabic Last Name</Text>
                        <TextField  icon="file-code-o"
                                    onChangeText={(text) => this.props.onFieldEdit('LastNameArabic', text)}
                                    value={this.props.user.LastNameArabic}  />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={[styles.formGroup, {flex:1}]}>
                        <Text style={styles.label}>First Name</Text>
                        <TextField  icon="pencil-square-o"
                                    onChangeText={(text) => this.props.onFieldEdit('FirstName', text)}
                                    value={this.props.user.FirstName}  />
                    </View>
                    <View style={[styles.formGroup, {flex:1}]}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextField  icon="pencil-square-o"
                                    onChangeText={(text) => this.props.onFieldEdit('LastName', text)}
                                    value={this.props.user.LastName}  />
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
                        <ComboBox data={['Male', 'Female']}
                                icon="flag"
                                value={this.props.user.Nationality}
                                onSelect={(data) => this.props.onFieldEdit('Nationality', data)} />
                    </View>
                    <View style={[styles.formGroup, {flex:1}]}>
                        <Text style={styles.label}>Gender</Text>
                        <ComboBox data={['Male', 'Female']}
                                onSelect={(data) => this.props.onFieldEdit('Gender', data)}
                                value={this.props.user.Gender}/>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={[styles.formGroup, {flex:1}]}>
                        <Text style={styles.label}>Birth Day</Text>
                        <View style={{flexDirection: 'row'}}>
                            <ComboBox data={getDays()}
                                style={{width: 60}}
                                onSelect={(data) => this.props.onFieldEdit('Day', data)}
                                value={this.props.user.Day}/>
                            <ComboBox data={Months}
                                style={{flex: 1, marginLeft: 10, marginRight: 10}}
                                onSelect={(data) => this.props.onFieldEdit('Month', data)}
                                value={this.props.user.Month}/>
                            <TextField value="2015" keyboardType="numeric" maxLength={4} style={{width: 70}}  icon="calendar" />
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
                        <TextField icon="calendar" keyboardType="numeric" maxLength={4} />
                    </View>
                    <View style={[styles.formGroup, {flex:1}]}>
                    </View>
                </View>
            </View>
        );
    }
}

/**
 * Contact Information tab inside the registration form
 * @class ContactInformation
 * @extends React.Component
 */
class ContactInformation extends React.Component {
    /**
     * @render
     * React Js render method - See React Js For more details
     */
     render() {
         return (
             <View style={[styles.sectionBody, { flex: 1}]}>
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
                             <TextField palceholder="Month" style={{flex: 1, marginLeft: 10, marginRight: 10}}  icon="angle-down" />
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
         );
     }
}

/**
 * Employment Information tab inside the registration form
 * @class ContactInformation
 * @extends React.Component
 */
class EmploymentInformation extends React.Component {
    /**
     * @render
     * React Js render method - See React Js For more details
     */
     render() {
         return (
             <View style={[styles.sectionBody, { flex: 1}]}>
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
                             <TextField palceholder="Month" style={{flex: 1, marginLeft: 10, marginRight: 10}}  icon="angle-down" />
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
         );
     }
}

 /**
  * @style
  */
 const styles = StyleSheet.create({
      container: {
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#eee',
          alignItems: 'stretch',
      },
      widget: {
          backgroundColor: "#FFF",
          alignItems: 'stretch',
          flexDirection: 'column',
          borderWidth: 1,
          borderColor: '#C03C3D'
      },
      widgetHeader: {
          backgroundColor: '#FFF',
          padding: 10,
          borderBottomWidth: 5,
          borderBottomColor: '#C03C3D',
          flexDirection: 'row'
      },
      widgetHeaderText: {
          color: '#262626',
          marginLeft: 2
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
          fontSize: 15,
          marginBottom: 5,
          marginTop: 5
      },
      row: {
          flexDirection: 'row'
      },
      userProfileWrapper: {
  		padding: 10,
  		width: 200
  	},
  	profile: {
  		borderColor: '#eeeeee',
  		backgroundColor: '#FFF',
  		borderWidth: 1,
  		padding: 20,
  		alignItems: 'center',
  		justifyContent: 'center'
  	},
  	profileImage: {
  		width: 80,
  		height: 80,
  		borderRadius: 40
  	},
  	profileName: {
  		fontSize: 18,
  		color: '#000',
  		margin: 10,
  		marginBottom: 2
  	},
  	profileProfession: {

  	},
  	profileLinks: {
  		borderColor: '#eeeeee',
  		borderWidth: 1,
  		alignItems: 'stretch',
  		justifyContent: 'center',
  		marginTop: 20
  	},
  	link: {
  		padding: 10,
  		flexDirection: 'row',
  		backgroundColor: '#FFF',
  		borderBottomColor:'#EEEEEE',
  		borderBottomWidth: 1
  	},
  	linkIcon: {
  		marginTop: 2
  	},
  	linkActive: {
  		backgroundColor: '#B52216',
  	},
    registerButton: {
        backgroundColor: '#B52216',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 0,
        borderColor: '#a0d468',
        borderWidth: 1
    },

    saveButton: {
        backgroundColor: '#B52216',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 0,
        borderColor: '#B52216',
        borderWidth: 1
    },
    cancelButton: {
        backgroundColor: '#B52216',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 0,
        borderColor: '#B52216',
        borderWidth: 1
    },
    deleteButton: {
        backgroundColor: '#B52216',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 0,
        borderColor: '#B52216',
        borderWidth: 1
    },
    button: {
        backgroundColor: '#FFF',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 0,
        borderColor: '#F4F4F4',
        borderWidth: 1,
        marginLeft: 10,
    },
    widgetFooter: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor:'#F4F4F4',
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
  });
