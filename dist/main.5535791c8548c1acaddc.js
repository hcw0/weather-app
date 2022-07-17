/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/addEventListenerToSearchBar.js":
/*!************************************************!*\
  !*** ./src/app/addEventListenerToSearchBar.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addEventListenerToSearchBar\": () => (/* binding */ addEventListenerToSearchBar)\n/* harmony export */ });\n/* harmony import */ var _htmlElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlElements */ \"./src/app/htmlElements.js\");\n\n\n\nfunction addEventListenerToSearchBar () {\n    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBar.addEventListener(\"mouseover\", () => {\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.focus();\n    });\n\n    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.addEventListener(\"input\", () => {\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBar.classList.add(\"search-bar-hover\");\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.classList.add(\"search-box-hover\");\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.magnifyingGlass.classList.add(\"fa-magnifying-glass-hover\");\n    });\n\n\n    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.addEventListener(\"focusout\", () => {\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBar.classList.remove(\"search-bar-hover\");\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.classList.remove(\"search-box-hover\");\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.magnifyingGlass.classList.remove(\"fa-magnifying-glass-hover\");\n        document.querySelector(\".pac-container\").style.display = \"none\";\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.value = \"\";\n    })\n    \n}\n\n//# sourceURL=webpack://weather-app/./src/app/addEventListenerToSearchBar.js?");

/***/ }),

/***/ "./src/app/addGooglePlacesAPI.js":
/*!***************************************!*\
  !*** ./src/app/addGooglePlacesAPI.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addGooglePlacesAPI\": () => (/* binding */ addGooglePlacesAPI)\n/* harmony export */ });\n/* harmony import */ var _getCityName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCityName */ \"./src/app/getCityName.js\");\n/* harmony import */ var _openWeatherMapCall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./openWeatherMapCall */ \"./src/app/openWeatherMapCall.js\");\n\n\n\nfunction addGooglePlacesAPI (){\n    let tag = document.createElement(\"script\");\n    tag.setAttribute('defer','');\n    tag.setAttribute('async','');\n    tag.src = \"https://maps.googleapis.com/maps/api/js?key=AIzaSyB0s970PqYGaxnHPxFOZYzeJ2RMUB2Pej0&libraries=places&callback=initMap\";\n    window.initMap = function() {\n        let input = document.getElementById(\"search-bar\");\n        \n        const options = {\n            fields: [\"address_components\", \"geometry\"],\n            types: ['(cities)'],\n        }\n        let autocomplete = new google.maps.places.Autocomplete(input);\n        \n        autocomplete.addListener(\"place_changed\", () => {\n            const place = autocomplete.getPlace();\n            if (!place.geometry || !place.geometry.location){\n                return;\n            }\n\n            const latitude = place.geometry.location.lat();\n            const longitude = place.geometry.location.lng();\n            \n            console.log(latitude + \" \" + longitude);\n            (0,_getCityName__WEBPACK_IMPORTED_MODULE_0__.getCityName)(latitude, longitude);\n            (0,_openWeatherMapCall__WEBPACK_IMPORTED_MODULE_1__.openWeatherMapCall)(latitude, longitude, \"metric\");\n        });\n    }\n    document.getElementsByTagName(\"head\")[0].appendChild(tag);\n\n\n}\n\n\n//# sourceURL=webpack://weather-app/./src/app/addGooglePlacesAPI.js?");

/***/ }),

/***/ "./src/app/getCityName.js":
/*!********************************!*\
  !*** ./src/app/getCityName.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCityName\": () => (/* binding */ getCityName)\n/* harmony export */ });\n/* harmony import */ var _htmlElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlElements */ \"./src/app/htmlElements.js\");\n\nfunction getCityName(latitude, longitude) {\n    let geocoder = new google.maps.Geocoder();\n    const latlng = {\n        lat: parseFloat(latitude),\n        lng: parseFloat(longitude)\n    }\n    geocoder.geocode({location: latlng}, function (results, status) {\n        if (status !== google.maps.GeocoderStatus.OK) {\n            alert(status);\n        }\n        if (status == google.maps.GeocoderStatus.OK) {\n            let [sublocality, locality, country] = [\"\", \"\", \"\"];\n            const firstResult = results[0].address_components;\n            firstResult.forEach(element => {\n                element.types.forEach(type => {\n                    if (type.toLowerCase() == \"sublocality\"){\n                        sublocality = element.long_name.toString();\n                    } else if (type.toLowerCase() == \"locality\"){\n                        locality = element.long_name.toString();\n                    } else if(type.toLowerCase() == \"country\"){\n                        country = element.long_name.toString();\n                    }\n                })\n            })\n\n            if (sublocality != \"\" && country != \"\"){\n                _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.cityElement.textContent = `${sublocality}, ${country}`;\n            } else if (locality != \"\" && country != \"\"){\n                _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.cityElement.textContent = `${locality}, ${country}`;\n            } else if (country != \"\"){\n                _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.cityElement.textContent = `${country}`;\n            }\n        }\n    });\n}\n\n//# sourceURL=webpack://weather-app/./src/app/getCityName.js?");

/***/ }),

/***/ "./src/app/htmlElements.js":
/*!*********************************!*\
  !*** ./src/app/htmlElements.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"htmlElements\": () => (/* binding */ htmlElements)\n/* harmony export */ });\nconst htmlElements = {\n    dateObject: document.querySelector(\".date\"),\n    timeObject: document.querySelector(\".current-time\"),\n    metric: document.querySelector(\".metric\"),\n    imperial: document.querySelector(\".imperial\"),\n    searchBar: document.querySelector(\".search-bar\"),\n    searchBox: document.querySelector(\".search-box\"),\n    magnifyingGlass: document.querySelector(\".fa-magnifying-glass\"),\n    cityElement: document.querySelector(\".city-element\"),\n    weatherCards: document.querySelectorAll(\".weather-cards\"),\n    currentTemperature: document.querySelector(\".current-temperature\"),\n    currentWeatherType: document.querySelector(\".current-weather-type\"),\n    currentFeelsLike: document.querySelector(\".current-feels-like\"),\n    currentHumidity: document.querySelector(\".current-humidity\"),\n    currentPressure: document.querySelector(\".current-pressure\"),\n    currentWindSpeed: document.querySelector(\".current-wind-speed\"),\n    mainImage: document.querySelector(\".main-image\"),\n}\n\n//# sourceURL=webpack://weather-app/./src/app/htmlElements.js?");

/***/ }),

/***/ "./src/app/openWeatherMapCall.js":
/*!***************************************!*\
  !*** ./src/app/openWeatherMapCall.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"openWeatherMapCall\": () => (/* binding */ openWeatherMapCall)\n/* harmony export */ });\n/* harmony import */ var _htmlElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlElements */ \"./src/app/htmlElements.js\");\n/* harmony import */ var _updateDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateDate */ \"./src/app/updateDate.js\");\n\n\n\n\nconst openWeatherMapCall = async (latitude, longitude, units) => {\n    try{\n        const unitsVar = {\n            degrees: units == \"metric\" ? \"C\" : \"F\",\n            humidity: \"%\",\n            pressure: units == \"metric\" ? \"hPa\" : \"psi\",\n            speed: units == \"metric\" ? \"m/s\" : \"mph\",\n        }\n        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=9e4b95876253dc331b1210331c2fd5d7&units=${units}`,\n        {mode: 'cors'});\n        const data = await response.json();\n        console.log(data);\n\n        const pressure = units == \"metric\" ? data.current.pressure : (data.current.pressure * 0.0145038).toFixed(1);\n        const currentTemperature = Math.trunc(data.current.temp);\n        let currentWeatherType = data.current.weather[0].main;\n\n        if (currentWeatherType.toString().toLowerCase() == \"clear\"){\n            if (units == \"metric\" && currentTemperature > 28){\n                console.log(currentWeatherType);\n                currentWeatherType = \"Sunny\";\n            } else if(units == \"imperial\" && currentTemperature > 82){\n                console.log(currentWeatherType)\n                currentWeatherType = \"Sunny\";\n            }\n        }\n\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentTemperature.textContent = Math.trunc(data.current.temp).toString() + \"°\" + unitsVar.degrees;\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentWeatherType.textContent = \"[ \" + currentWeatherType.toString() + \" ]\";\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentFeelsLike.textContent = Math.round(data.current.feels_like).toString() + \"°\" + unitsVar.degrees;\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentHumidity.textContent = data.current.humidity.toString() + unitsVar.humidity;\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentPressure.textContent = pressure.toString() + \" \" + unitsVar.pressure;\n        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentWindSpeed.textContent = (data.current.wind_speed.toFixed(1)).toString() + \" \" + unitsVar.speed;\n\n\n        if (currentWeatherType.toString().toLowerCase() == \"thunderstorm\"){\n            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = \"./images/Storm.gif\";\n        } else if(currentWeatherType.toString().toLowerCase() == \"drizzle\" || currentWeatherType.toString().toLowerCase() == \"rain\"){\n            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = \"./images/Rain.gif\";\n        } else if(currentWeatherType.toString().toLowerCase() == \"snow\"){\n            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = \"./images/Snow.gif\";\n        } else if(currentWeatherType.toString().toLowerCase() == \"clear\"){\n            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = \"./images/Clear.gif\";\n        } else if(currentWeatherType.toString().toLowerCase() == \"sunny\"){\n            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = \"./images/Sunny.gif\";\n        } else if(currentWeatherType.toString().toLowerCase() == \"clouds\"){\n            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = \"./images/Cloudy.gif\";\n        } else if(currentWeatherType.toString().toLowerCase() == \"tornado\"){\n            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = \"./images/Tornado.gif\";\n        } else{\n            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = \"./images/Default.gif\";\n        }\n\n        console.log(currentTemperature);    \n        console.log(currentWeatherType);\n\n        const unixTimeStamp = data.current.dt;\n        const offset = data.timezone_offset;\n        (0,_updateDate__WEBPACK_IMPORTED_MODULE_1__.updateDate)(unixTimeStamp, offset);\n\n\n        data.daily.forEach(day => {\n            var dayname = new Date(day.dt * 1000).toLocaleDateString(\"en\", {\n                weekday: \"long\",\n            });\n            console.log(dayname);\n            \n        })\n    } catch(error){\n        console.log(error);\n    }\n\n}\n\n//# sourceURL=webpack://weather-app/./src/app/openWeatherMapCall.js?");

/***/ }),

/***/ "./src/app/updateDate.js":
/*!*******************************!*\
  !*** ./src/app/updateDate.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"updateDate\": () => (/* binding */ updateDate)\n/* harmony export */ });\n/* harmony import */ var _htmlElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlElements */ \"./src/app/htmlElements.js\");\n\n\nconst updateDate = (unixTimeStamp, offsetSeconds) => {\n    const correctTimeStamp = unixTimeStamp + (offsetSeconds / 3600); //convert seconds to hour offset\n    const date = new Date(correctTimeStamp * 1000);\n    let day;\n\n    switch (date.getDay()) {\n        case 0:\n            day = \"Sunday\";\n            break;\n        case 1:\n            day = \"Monday\";\n            break;\n        case 2:\n            day = \"Tuesday\";\n            break;\n        case 3:\n            day = \"Wednesday\";\n            break;\n        case 4:\n            day = \"Thursday\";\n            break;\n        case 5:\n            day = \"Friday\";\n            break;\n        case 6:\n            day = \"Saturday\";\n                break;\n    }\n\n    const amOrPm = date.getHours() >= 12 ? \"PM\" : \"AM\";\n    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.dateObject.textContent = day + \", \" + date.toLocaleDateString(\"en-US\");\n    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.timeObject.textContent = date.getHours() + \":\" + date.getMinutes() + \" \" + amOrPm;\n}\n\n//# sourceURL=webpack://weather-app/./src/app/updateDate.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_addGooglePlacesAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/addGooglePlacesAPI */ \"./src/app/addGooglePlacesAPI.js\");\n/* harmony import */ var _app_addEventListenerToSearchBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/addEventListenerToSearchBar */ \"./src/app/addEventListenerToSearchBar.js\");\n\n\n\n\n\ndocument.activeElement.blur();\n(0,_app_addEventListenerToSearchBar__WEBPACK_IMPORTED_MODULE_1__.addEventListenerToSearchBar)();\n(0,_app_addGooglePlacesAPI__WEBPACK_IMPORTED_MODULE_0__.addGooglePlacesAPI)();\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;