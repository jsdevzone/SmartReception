var { requireNativeComponent, PropTypes } = require('react-native');

var iface = {
  name: 'PenSurface',
  propTypes: {
  	renderToHardwareTextureAndroid: PropTypes.string,
  },
};

module.exports = requireNativeComponent('PenSurface', iface, { nativeOnly: {
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