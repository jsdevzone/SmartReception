import Config from './config';
import { EventEmitter } from 'events';


class AbstractStore extends EventEmitter {
    get(action, params) {
        var url = Config.endpointBase + action;
        if(params) {
            var querystring = Object.keys(params)
                .map(key => key + '=' + encodeURIComponent(params[key]))
                .join('&');

            url = url + '?' + querystring;
        }
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                resolve(response.json());
            })
            .catch((error) => {
                if(reject)
                    reject(error);
            })
        });
    }
}


module.exports = AbstractStore;
