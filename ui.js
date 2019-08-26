var ui = {};

(function () {
    "use strict";

    ui.info = {};

    ui.info.setInfoText = function (text) {
        document.getElementById("infoText").innerText = text;
    };

    ui.info.setTimeAndDate = function (date) {
        var min = date.getMinutes();
        var hour = date.getHours();
        min = min < 10 ? "0" + min : min;
        document.getElementById("clock").innerHTML =
            hour + ":" + min;

        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        document.getElementById("cal").innerHTML =
            date.getDate() + "." + month + "." + date.getFullYear();
    };

    ui.weather = {};

    ui.weather.setSymbol = function (symbol) {
        document.getElementById("weatherInfoIconBig").src = "icons/weather/" + symbol + ".png";
    };

    ui.weather.setWind = function (direction, speed) {
        var elem = document.getElementById("weatherInfoWind");
        if (speed === 0) {
            elem.innerText = "-";
        } else {
            elem.innerHTML =
                util.formatWOSpace(direction, "&deg;") + " " + util.format(speed, "km/h", 2);
        }
    };

    ui.weather.setHumidity = function (humidity) {
        document.getElementById("weatherInfoHumidity").innerText =
            util.formatWOSpace(humidity, "%", 2);
    };

    ui.weather.setPrecipitation = function (intensity, probability) {
        document.getElementById("weatherInfoPrecipitation").innerText =
            util.format(intensity, "mm/h") + " " + util.formatWOSpace(probability, "%", 0);
    };

    ui.weather.setPressure = function (pressure) {
        document.getElementById("weatherInfoPressure").innerText =
            util.format(pressure, "mBar");
    };

    ui.weather.setTemperatureCurrent = function (temperature) {
        document.getElementById("temperatureTextCurrent").innerHTML =
            util.format(temperature, "&deg;C");
    };

    ui.weather.setTemperatureMin = function (temperature) {
        document.getElementById("temperatureTextMin").innerHTML =
            util.format(temperature, "&deg;C");
    };

    ui.weather.setTemperatureMax = function (temperature) {
        document.getElementById("temperatureTextMax").innerHTML =
            util.format(temperature, "&deg;C");
    };

    ui.weather.fromDarkSkyObject = function (w) {
        ui.weather.setSymbol(util.getWeatherIcon(w.icon));
        ui.weather.setWind(w.windBearing, w.windSpeed * 3.6);
        ui.weather.setHumidity(w.humidity * 100);
        ui.weather.setPrecipitation(w.precipIntensity, w.precipProbability * 100);
        ui.weather.setPressure(w.pressure);
        ui.weather.setTemperatureCurrent(w.temperature);
    };

    ui.buttons = {};

    ui.buttons.createButton = function (name, text, callback) {
        var btn = document.createElement("button");
        btn.id = "btn_" + name;
        btn.className = "btn btnNormal";
        btn.addEventListener("click", callback);
        btn.appendChild(document.createTextNode(text));
        return btn;
    };

    ui.buttons.createToggleButton = function (name, callback, defaultValue) {
        var btn = ui.buttons.createButton(name, "OFF", function (e) {
            if (btn.getValue()) {
                btn.setValue(false, e);
            } else {
                btn.setValue(true, e);
            }
        });
        btn.getValue = function () {
            return btn.getAttribute("data-toggle-value") === "true";
        };
        btn.setValue = function (value, e) {
            if (value === btn.getValue()) {
                return;
            }
            if (e) {
                callback(e, value);
            } else {
                callback(null, value);
            }
            btn.setAttribute("data-toggle-value", value);
            btn.innerText = value ? "ON" : "OFF"; /* Accessibility™ */
        };
        btn.className = "btn btnToggle";
        if (defaultValue === true) {
            btn.setValue(true);
        }
        return btn;
    };

    ui.blocks = {};
    ui.blocks.columns = [];

    ui.blocks.createBlock = function (label, elements) {
        var labelElem = document.createElement("p");
        labelElem.appendChild(document.createTextNode(label));
        return {
            label: labelElem,
            elements: elements
        };
    };

    ui.blocks.addColumn = function (blocks) {
        ui.blocks.columns.push(blocks);
    };

    ui.blocks.display = function () {
        var columnContainer = document.getElementById("columnContainer");
        columnContainer.innerHTML = ""; // Empty element before adding blocks
        for (var i = 0; i < ui.blocks.columns.length; i++) {
            var blocksInColumn = ui.blocks.columns[i];
            var blockContainer = document.createElement("table");
            for (var j = 0; j < blocksInColumn.length; j++) {
                var block = blocksInColumn[j];
                var row = document.createElement("tr");

                var labelContainer = document.createElement("td");
                labelContainer.className = "block blockLabel";
                labelContainer.appendChild(block.label);

                var elementContainer = document.createElement("td");
                elementContainer.className = "block blockElements";
                for (var k = 0; k < block.elements.length; k++) {
                    elementContainer.appendChild(block.elements[k]);
                }

                row.appendChild(labelContainer);
                row.appendChild(elementContainer);
                blockContainer.appendChild(row);
            }
            var column = document.createElement("td");
            column.appendChild(blockContainer);
            column.style.width = (100 / ui.blocks.columns.length) + "%";

            columnContainer.appendChild(column);
        }
    };
}());