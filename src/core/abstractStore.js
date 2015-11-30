import { EventEmitter } from 'events';
import RequestManager from './requestManager';

class AbstractStore extends EventEmitter {
    get(action, params) {
        return RequestManager.get(action, params);
    }
    post(action, params) {
        return RequestManager.post(action, params);
    }
    addEventListener(eventName, callback) {
    	this.on(eventName, callback);
    }
}

module.exports = AbstractStore;
