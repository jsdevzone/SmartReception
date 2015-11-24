
import AbstractStore from '../core/abstractStore';

var employeeId = 1;



class UserStore extends AbstractStore {
    constructor() {
        super();
    }

    getUserDetails(userId) {

        fetch('http://192.168.4.77/SmartReception.Service/api/client?id=' + userId)
  .then((response) => response.json())
  .then((json) => {
    this.fireEvent('userloaded', json);
  })
  .catch((error) => {
    console.warn(error);
  });
    }

    getHistory() {
        fetch('http://192.168.4.77/SmartReception.Service/api/client/history')
  .then((response) => response.json())
  .then((json) => {
    this.fireEvent('historyloaded', json);
  })
  .catch((error) => {
    console.warn(error);
  });
    }

    getPreviousSchedule(clientId) {
        this.get('meeting/history', { employeeId: 1, clientId: clientId }).then((json) => {
            this.emit('historyloaded', json);
        });
    }

    getNextMeeting() {
        this.get('meeting/upcoming', { employeeId: 1 }).then((json) => {
            this.emit('nextmeetingloaded', json);
        });
    }

}

module.exports = UserStore;
