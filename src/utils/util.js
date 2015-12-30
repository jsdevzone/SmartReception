
export function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let days = [ 'Sunday', 'Monday', 'Tuesday', "Wednesday", 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March','April','May','June','July', 'August', 'Spetember', 'October', 'November','December'];
let icons = [];


export function getCurrentDateFormatted() {
    let date = new Date();
    let dateString  = days[date.getDay()] + ', ' +  date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
    return dateString;
}

export function getDayName(number) {
    return days[number];
}

export function getMonthName(number) {
    return months[number];
}

export function getDateFromISOFormat(dateStr) {
    var date = new Date(dateStr.split("T")[0]);
    var timeParts = dateStr.split("T")[1].split(":");
    date.setHours(timeParts[0]);
    date.setMinutes(timeParts[1]);
    date.setSeconds(timeParts[2]);
    return date;
}

export function getDays() {
    let array = new Array();
    for(var i = 0; i < 31; i++) {
        array.push(i + 1);
    }
    return array;
}

export var Months = months;
