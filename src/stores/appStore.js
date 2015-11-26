
import { EventEmitter } from 'events';

var AppStore = Object.assign(EventEmitter.prototype, {

    currentMeeting: null,

    startMeeting: function(meeting) {
        this.currentMeeting = meeting;

        // need to store to async storage 

        this.emit('meetingstarted');
    },

    logoff: function() {
        this.emit('logoff');
    }

})

module.exports = AppStore;
