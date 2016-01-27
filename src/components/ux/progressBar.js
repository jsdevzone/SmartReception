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
var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  PropTypes,
  } = React;

var ProgressBar = React.createClass({

  propTypes: {
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    styles: PropTypes.object,
    completePercentage: PropTypes.number.isRequired
  },

  getDefaultProps: function () {
    return {
      color: "blue",
      backgroundColor: "#ffffff",
      borderColor: "#ffffff",
      styles: {},
      completePercentage: 50
    };
  },

  render: function () {

    var props = this.props,
      progressColor = props.color,
      borderColor = props.borderColor,
      backgroundColor = props.backgroundColor,
      completePerc = props.completePercentage,
      incompletePerc = Math.abs(completePerc - 100);

    return (
      <View style={[styles.container, props.styles, {backgroundColor: progressColor, borderColor}]}>
        <View style={[styles.complete, {flex: completePerc}]}></View>
        <View style={[styles.incomplete, {flex: incompletePerc, backgroundColor}]}></View>
      </View>
    );

  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    marginBottom: 3
  },

  complete: {},

  incomplete: {
    backgroundColor: "#ffffff"
  }
});

module.exports = ProgressBar;
