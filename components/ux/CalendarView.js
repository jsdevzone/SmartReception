
var { requireNativeComponent, PropTypes } = require('react-native');

var iface = {
  name: 'CalendarView',
  propTypes: {
      scaleX: PropTypes.number,
      scaleY: PropTypes.number,
      translateX: PropTypes.number,
      translateY: PropTypes.number,
      rotation: PropTypes.number
  },
};

module.exports = requireNativeComponent('RCTCalendarView', iface);
