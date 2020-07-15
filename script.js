(function () {
    "use strict";

    function updateTime() {
        ui.info.setTimeAndDate(new Date());
    }

    updateTime();
    setInterval(updateTime, 15000);

    function updateWeather() {
        util.httpReq("GET", "forecast.json", function (status, response) { // Insert your DarkSky proxy here
            if (status === 200) {
                var data = JSON.parse(response);
                ui.weather.fromDarkSkyObject(data.currently);
                var day = data.daily.data[0];
                ui.weather.setTemperatureMin(day.temperatureMin);
                ui.weather.setTemperatureMax(day.temperatureMax);
            }
        });
    }

    updateWeather();

    if (!util.isKindle()) { /* Ensure responsiveness™ */
        var style = document.createElement("style");
        style.appendChild(document.createTextNode("html, body {width: 100%; height: 100%; overflow: initial;}"));
        document.head.appendChild(style);
    }

    var refButton = ui.buttons.createButton("refresh", "Refresh", function () {
        window.location.reload();
    });
    var refBlock = ui.blocks.createBlock("Refresh page", [refButton]);

    var lightToggle = ui.buttons.createToggleButton("toggleTest", function (e, value) {
        // Do web request here
    });
    var lightSlider = ui.sliders.createSlider("sliderTest", function(e) {
      ui.info.setInfoText(e.target.value);
    }, 0, 200, 50);
    var lightBlock = ui.blocks.createBlock("Light", [lightToggle]);
    var lightBlock2 = ui.blocks.createBlock("", [lightSlider]);

    var weatherUpdateButton = ui.buttons.createButton("updateWeather", "Refresh", function () {
        updateWeather();
    });
    var weatherBlock = ui.blocks.createBlock("Update Weather", [weatherUpdateButton]);

    var kindleInfo = document.createElement("p");
    kindleInfo.appendChild(document.createTextNode("Kindle: " + util.isKindle()));
    var kindleInfoBlock = ui.blocks.createBlock("Responsiveness", [kindleInfo]);

    ui.blocks.addColumn([refBlock, lightBlock, lightBlock2]);
    ui.blocks.addColumn([weatherBlock, kindleInfoBlock]);

    ui.blocks.display(); // Update / show blocks

    ui.info.setInfoText("");
}());