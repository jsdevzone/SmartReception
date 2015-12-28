'use strict';
/**
 * Smart reception System
 * @author Jasim
 * @company E-Gov LLC
 */

 import React, { View, StyleSheet, Text, TextInput, Image, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Moment from 'moment';
 import TextField from '../ux/textField';
 import ComboBox from '../ux/comboBox';

 import { getDays } from '../../utils/util';

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
           * @state
           */
           this.state = {
               user: {},
               selectedIndex: 2
           };

          this.forms = {
              PERSONAL_INFORMATION : 1,
              CONTACT_INFORMATION: 2,
              EMPLOYMENT_INFORMATION : 3
          };
     }

     /**
      * @render
      * @return {View} view
      */
     render() {
         let component = <PersonalInformation />;

        /**
         * Checking current @state selectedState value then renders appropriate Component
         **/
        switch(this.state.selectedState) {
            case this.forms.CONTACT_INFORMATION:
                component = <ContactInformation />;
                break;
            case this.forms.EMPLOYMENT_INFORMATION:
                component = <EmploymentInformation />;
                break;
        }

         return (
             <View style={styles.container}>
                <RegisterSidebar />
                <View style={{ flex: 1, padding: 10 }}>
                    { component }
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
                    <View style={[styles.link, styles.linkActive]}>
                        <Icon name="user" size={14} style={styles.linkIcon} />
                        <Text>Personal Information</Text>
                    </View>
                    <View style={[styles.link, { borderBottomWidth:0 }]}>
                        <Icon name="calendar" size={14} style={styles.linkIcon} />
                        <Text>Contact Information</Text>
                    </View>
                    <View style={[styles.link, { borderBottomWidth:0 }]}>
                        <Icon name="calendar" size={14} style={styles.linkIcon} />
                        <Text>Employment Information</Text>
                    </View>
                </View>
                <View style={{flex:1}}></View>
                <View style={styles.registerButton}>
                    <Text style={{ color: '#FFF' }}> Register New User</Text>
                </View>
                <View style={styles.saveButton}>
                    <Text style={{ color: '#FFF' }}>Save User</Text>
                </View>
                <View style={styles.cancelButton}>
                    <Text style={{ color: '#FFF' }}>Cancel Edit</Text>
                </View>
                <View style={styles.deleteButton}>
                    <Text style={{ color: '#FFF' }}>Delete User</Text>
                </View>
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
            <View style={[styles.widget, { flex: 1 }]}>
                <View style={styles.widgetHeader}>
                    <Text style={styles.widgetHeaderText}>Personal Information</Text>
                </View>
                <View style={styles.widgetBody}>
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
                                <ComboBox data={['Male', 'Female']} />
                            </View>
                            <View style={[styles.formGroup, {flex:1}]}>
                                <Text style={styles.label}>Gender</Text>
                                <ComboBox data={['Male', 'Female']} />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.formGroup, {flex:1}]}>
                                <Text style={styles.label}>Birth Day</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <ComboBox data={getDays()}  style={{width: 60}}  />
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
             <View style={[styles.widget, { flex: 1 }]}>
                 <View style={styles.widgetHeader}>
                     <Text style={styles.widgetHeaderText}>Contact Information</Text>
                 </View>
                 <View style={styles.widgetBody}>
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
class Employment extends React.Component {
    /**
     * @render
     * React Js render method - See React Js For more details
     */
     render() {
         return (
             <View style={[styles.widget, { flex: 1 }]}>
                 <View style={styles.widgetHeader}>
                     <Text style={styles.widgetHeaderText}>Employment Information</Text>
                 </View>
                 <View style={styles.widgetBody}>
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
          flexDirection: 'column'
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
  		backgroundColor: '#fafafa',
  	},
    registerButton: {
        backgroundColor: '#a0d468',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 0,
        borderColor: '#a0d468',
        borderWidth: 1
    },

    saveButton: {
        backgroundColor: '#427fed',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 0,
        borderColor: '#427fed',
        borderWidth: 1
    },
    cancelButton: {
        backgroundColor: '#f4b400',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 0,
        borderColor: '#f4b400',
        borderWidth: 1
    },
    deleteButton: {
        backgroundColor: '#d73d32',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 0,
        borderColor: '#d73d32',
        borderWidth: 1
    }
  });
