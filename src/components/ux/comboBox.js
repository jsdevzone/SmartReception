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
 import React, { View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, ToastAndroid, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import DialogAndroid from 'react-native-dialogs';

 /**
  * Custom Web Like Combo box. When you tap on the combo,
  * this will pop up a dialog box with the data that you passed through the props.
  *
  * @class ComboBox
  * @extends React.Component
  *
  * @props {Object} style - Custom style object
  * @props {String} iconColor - Hex color for icon color
  * @props {Function} onSelect - Handler function on value select
  * @props {String} displayField - The field name in the data to be displayed in the comboxbox
  * @props {String} valueField - The field name in the data to be used as value.
  * @props {String|Object|Number} value -The text field value. It should be attached with some state
  *
  * @usage
  * <code>
  *    let data = [{ id: 1, value: 'Male' }, { id: 2, value: 'Female'}];
  *
  *    <ComboBox displayField="value"
  *        valueField="id"
  *        value={this.state.value || 0}
  *        onSelect={(data) => {}}
  *        iconColor="#CCC"
  *        label="Gender"
  *        style={{ flex: 1}} />
  * </code>
  */
export default class ComboBox extends React.Component {
    /**
     * @constructor
     */
    constructor(args) {
         super(args);
         /**
          * @state
          */
          this.state = {
              displayValue: null
          };

          /**
           * Prepare data for the dialog box. As it only accepts string array.
           */
          this.prepareData();
    }

    /**
     * Prepare data for the dialog box. As it only accepts string array.
     * @return {Array} transformedArray
     */
    prepareData() {
        this.dataTransformed = new Array();

        /**
         * Iterate over the passed data and extract the display field value from it.
         * Add to temporary array.
         */
        if(this.props.valueField && this.props.displayField) {
            if(this.props.data && this.props.data.length > 0) {
                this.props.data.forEach((item) => {
                    this.dataTransformed.push(item[this.props.displayField]);
                });
            }
        }
         //Else case assumes that passed array is just a plain array and no need to transform
         else
            this.dataTransformed = this.props.data.map(item => item.toString());

        return this.dataTransformed;
    }

    /**
     *  Life cycle method
     *  This method will be called when the component is mounted to the application
     *  See React Js componentDidMount method.
     *
     *  @lifecycle
     *  @return {Void} undefined
     */
    componentDidMount() {
        /**
         * If the value is passed from the parent component. Then iterate over the data, find the corresponding data item.
         * Then set the value
         */
        if(this.props.value) {
            /**
             * Means passed property data is arrat of object. Transform it.
             */
            if(this.props.valueField && this.props.displayField) {
                this.data.forEach((item, index) => {
                    if(item[this.props.valueField] == this.props.value)
                        this.setState({ displayValue: item[this.props.displayField] });
                });
            }
            else {
                this.dataTransformed.forEach((item, index) => {
                    if(item.toLowerCase() == this.props.value.toString().toLowerCase())
                        this.setState({ displayValue: item });
                });
            }
        }
    }

    /**
     * Handles view press and show the dialog box. Dialog box is temporary we need to change it to
     * standard web like comboBox.
     *
     * @eventhandler
     * @return {Void} undefined
     */
     onComboViewPress() {
         let dialog = new DialogAndroid();
         let options = {};

         if(this.dataTransformed.length <= 0){
             options = {
                 title: 'Error!',
                 content: "Can't find any items passed to the Component",
                 positiveText: "OK"
             };
         }
         else {
             /**
              * Dialog  options with array inline
              */
             options = {
                 title: 'Select',
                 positiveText: 'Select',
                 items: this.dataTransformed
             };

             /**
              * Callback for item select
              */
             options.itemsCallback = (index) => {
                 let data = this.props.data[index];
                 let value = data;
                 if(this.props.onSelect)
                    this.props.onSelect(data);

                 if(this.props.displayField && this.props.valueField) {
                     value = data[this.props.displayField];
                 }

                 /**
                  * Change the display to the selected value
                  */
                 this.setState({ displayValue: value });
             };
         }

         /**
          * Shows the dialog
          */
         dialog.set(options);
         dialog.show();
     }

    /**
     * @render
     * @return {View} view
     */
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onComboViewPress.bind(this)}>
                <View style={[styles.textFieldWrapper, this.props.style]}>
                    <View style={styles.textField}>
                        <Text style={{ color: '#000' }}>{this.state.displayValue}</Text>
                    </View>
                    <Icon name={this.props.icon || "angle-down"} color={this.props.iconColor || "#B52216" } size={20} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
 }

/**
 * @style
 */
const styles = StyleSheet.create({
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
        flex: 1,
        padding: 5
    },
});
