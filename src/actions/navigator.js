var NavigatorActions = {
    _navigator: null,
    registerNavigator: function(navigator) {
        this._navigator = navigator;
    },
    navigateToRoute: function(route) {
        this._navigator.push(route);
    }
};
module.exports = NavigatorActions;
