'use strict';

import { requireNativeComponent, PropTypes } from 'react-native';

var iface = {
	name: 'Calendar',
	propTypes: {
		textColor: PropTypes.string
	}
};

module.exports = requireNativeComponent('RCTCalendarView', iface);