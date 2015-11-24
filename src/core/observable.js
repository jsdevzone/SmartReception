

function Observable() {
    this._events = {};
}

Observable.prototype.addEventListener = function(event, callback, scope) {
    this._events[event] = this._events[event] || [];
    this._events[event].push(callback);
};


Observable.prototype.fireEvent = function(event, params) {
    if(this._events[event]) {
        this._events[event].forEach((callback) => {
            callback(params);
        });
    }
};

Observable.prototype.removeEvent = function(event) {
    if(this._events[event]) {
        this._events[event] = {};
    }
};


module.exports = Observable;
