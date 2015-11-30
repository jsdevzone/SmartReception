
import AbstractStore from '../core/abstractStore';
import moment from 'moment';

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
        this.get('meeting/filter/date', { employeeId: 1, date: moment(date).format("M/D/YYYY  00:00:00") }).then((json) => {
            this.emit('scheduleloaded', json);
        });
    }

    startMeeting(meeting, callback) {
        this.post('meeting/start', meeting).then((json) => callback);
    }
}

module.exports = ScheduleStore;
