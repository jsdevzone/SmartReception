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
var { requireNativeComponent, PropTypes } = require('react-native');

var iface = {
  name: 'PieChart',
  propTypes: {
  },
};

module.exports = requireNativeComponent('PieChart', iface, { nativeOnly: {
  'scaleX': true,
  'scaleY': true,
  'testID': true,
  'decomposedMatrix': true,
  'backgroundColor': true,
  'accessibilityComponentType': true,
  'renderToHardwareTextureAndroid': true,
  'translateY': true,
  'translateX': true,
  'accessibilityLabel': true,
  'accessibilityLiveRegion': true,
  'importantForAccessibility': true,
  'rotation': true,
  'opacity': true,
  'onLayout': true
}});
