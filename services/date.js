let days = [ 'Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March','April','May','June','July', 'August', 'Spetember', 'October', 'November','December'];

export function getCurrentDateFormated() {
    let date = new Date();
    let dateString  = days[date.getDay()] + ',' +  date.getDate() + ' ' + months[date.getMonth()] + ',' + date.getFullYear();
    return dateString;
}
