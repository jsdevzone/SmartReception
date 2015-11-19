export function getPercentageColor(percent) {
    if (percent === 100) {
        percent = 99
    }
    var r, g, b;

    if (percent < 50) {
        // green to yellow
        r = Math.floor(255 * (percent / 50));
        g = 255;

    } else {
        // yellow to red
        r = 255;
        g = Math.floor(255 * ((50 - percent % 50) / 50));
    }
    b = 0;

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
