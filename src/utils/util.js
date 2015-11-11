
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

export function getCurrentDateFormatted() {
    let date = new Date();
    let dateString  = days[date.getDay()] + ', ' +  date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
    return dateString;
}

export function getDayName(number) {
    return days[number];
}
