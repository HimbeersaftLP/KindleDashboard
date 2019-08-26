# KindleDashboard
Home Automation/Whatever dashboard designed for eInk Kindles.

It provides means of displaying and controlling data in an eInk friendly way.

Please excuse the excessive use of HTML tables, the Kindle Web Browser doesn't support CSS grid.

## Screenshots
Soon™

## How to use
### What you need
* A [jailbroken Kindle](https://www.mobileread.com/forums/showthread.php?t=320564) ([Disclaimer](#kindle-disclaimer))(note that it's very hard/impossible to jailbreak modern Kindles, I recommend going for a used Kindle Touch) with [landscape-patched WebLaunch](https://github.com/HimbeersaftLP/WebLaunch) (or any landscape device with a web browser)
* Some knowledge of JavaScript
* [Icon files](#icons)
* Means of providing weather data. I have included code that can parse [DarkSky](https://darksky.net/dev)'s API response, however you will need to set up a proxy for that (note that the Kindle Browser doesn't support CORS)
* A simple web server to serve this page to your device
### WebLaunch configuration
If you decide to use this on your jailbroken Kindle, here is my WebLaunch settings.js
```js
var settings = {
	url: 'http://<INSERT YOUR WEB SERVER URL HERE>',
	title: 'KindleDashboard',
	hideStatusbar: true,
	enableWireless: true,
	powerButtonClose: false,
	enablePreventScreenSaver: true,
	landscape: true
};
```
### Customisation 
The script `ui.js` provides basic UI functionality, the script `script.js` contains some examples and should be used for your own code.

The bottom part of the page can be easily adjusted to your needs thanks to some useful helper functions in `ui.js`. See `script.js` for example code.
### More Information
Feel free to ask me on [Discord](https://himbeer.me/discord/) or create an issue on this repo. 
# Misc
## Kindle Disclaimer
I'm not responsible if you damage, break or otherwise your Kindle.
## Icons
A [PowerShell script](https://github.com/HimbeersaftLP/KindleDashboard/blob/master/icons/svgconverter.ps1) for converting SVGs to PNGs (because of bugs with SVGs in the Kindle Browser) has been provided.

The following icons are needed for the dashboard to fully function:
```
icons
   │   barometer.png
   │   humidity.png
   │   raindrops.png
   │   windsock.png
   │
   ├───thermometers
   │       temperature-frigid.png
   │       temperature-hot.png
   │       thermometer-half.png
   │
   └───weather
           cloud-moon.png
           cloud-rain.png
           cloud-sleet.png
           cloud-snow.png
           cloud-sun.png
           clouds.png
           fog.png
           moon-stars.png
           question-circle.png
           sun.png
           wind.png
```