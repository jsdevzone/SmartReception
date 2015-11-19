
var Dispatcher = require('./dispatcher.js');

var _navigator = null;

var AppDispatcher = Object.assign(Dispatcher.prototype, {
    handleViewAction: function(action) {
        this.dispatch({ source: 'VIEW_ACTION', action: action });
    }
});


module.exports = AppDispatcher;
