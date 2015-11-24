




var ApplicationRoutes = (function(){
    function ApplicationRoutes() {}
    ApplicationRoutes.prototype.routes = {
        userLogin: { name: 'userlogin', title: 'User Login' },
        dashboard: { name: 'dashboard', title: 'Dashboard' },
        settings: { name: 'settings', title: 'Settings' },
        
    };
    ApplicationRoutes.prototype.getRoute = function(name, obj) {
        if(this.routes[name]) {
            Object.assign(obj, this.routes[name]);
            return obj;
        }
    }
    return ApplicationRoutes;
})();

module.exports = new ApplicationRoutes();
