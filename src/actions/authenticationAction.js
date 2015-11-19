'use strict';

import Dispatcher from '../dispatchers/dispatcher';
import AppConstants from '../constants/appConstants';

module.exports = {
    isAuthnticated: function() {
        Dispatcher.dispatch({ type: AppConstants.authConstants.IS_AUTHENICATED });
    }
};
