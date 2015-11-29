
import AbstractStore from '../core/abstractStore';

var employeeId = 1;

class ScheduleStore extends AbstractStore {
    constructor() {
        super();
    }

    getTodaySchedules() {
        this.get('meeting/filter/today', { employeeId: 1 }).then((json) => {
            this.emit('gettodayschedules', json);
        });
    }

    getSchedule(date) {
        this.get('meeting/filter/date', { employeeId: 1, date: date }).then((json) => {
            this.emit('scheduleloaded', json);
        });
    }

    startMeeting(meeting, callback) {
        this.post('meeting/start', meeting).then((json) => callback);
    }
}

module.exports = ScheduleStore;
