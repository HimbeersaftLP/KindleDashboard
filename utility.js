var util = {};

(function () {
    "use strict";

    util.httpReq = function (method, url, callback, data) {
        var req = new XMLHttpRequest();
        req.addEventListener("readystatechange", function () {
            if (req.readyState === 4) {
                callback(req.status, req.responseText);
            }
        });
        req.open(method, url);
        req.send(data);
    };

    util.round = function (number, decimals) {
        var mul = Math.pow(10, decimals);
        return Math.round(number * mul) / mul;
    };

    util.format = function (number, unit, decimals) {
        if (typeof decimals === "number") {
            number = util.round(number, decimals);
        }
        return number + " " + unit;
    };

    util.formatWOSpace = function (number, unit, decimals) {
        if (typeof decimals === "number") {
            number = util.round(number, decimals);
        }
        return number + unit;
    };

    var weatherIconMap = { // Map DarkSky icon names to our icon files
        "clear-day": "sun",
        "clear-night": "moon-stars",
        "rain": "cloud-rain",
        "snow": "cloud-snow",
        "sleet": "cloud-sleet",
        "wind": "wind",
        "fog": "fog",
        "cloudy": "clouds",
        "partly-cloudy-day": "cloud-sun",
        "partly-cloudy-night": "cloud-moon"
    };

    util.getWeatherIcon = function (iconNameFromDarkSky) {
        if (weatherIconMap[iconNameFromDarkSky]) {
            return weatherIconMap[iconNameFromDarkSky];
        }
        return "question-circle";
    };

    util.isKindle = function () { /* I don't think there is a reliable way to do this */
        return navigator.vendor === "Apple Inc." &&
            navigator.platform === "Linux armv7l" &&
            navigator.mimeTypes.length === 0 &&
            navigator.plugins.length === 0 &&
            screen.height === 600 &&
            screen.width === 800;
    };

}());