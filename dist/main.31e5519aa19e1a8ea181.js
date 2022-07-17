/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/addEventListenerToSearchBar.js":
/*!************************************************!*\
  !*** ./src/app/addEventListenerToSearchBar.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEventListenerToSearchBar": () => (/* binding */ addEventListenerToSearchBar)
/* harmony export */ });
/* harmony import */ var _htmlElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlElements */ "./src/app/htmlElements.js");


function addEventListenerToSearchBar () {
    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBar.addEventListener("mouseover", () => {
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.focus();
    });

    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.addEventListener("input", () => {
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBar.classList.add("search-bar-hover");
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.classList.add("search-box-hover");
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.magnifyingGlass.classList.add("fa-magnifying-glass-hover");
    });


    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.addEventListener("focusout", () => {
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBar.classList.remove("search-bar-hover");
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.classList.remove("search-box-hover");
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.magnifyingGlass.classList.remove("fa-magnifying-glass-hover");
        document.querySelector(".pac-container").style.display = "none";
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.value = "";
    })
    
}

/***/ }),

/***/ "./src/app/addGooglePlacesAPI.js":
/*!***************************************!*\
  !*** ./src/app/addGooglePlacesAPI.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addGooglePlacesAPI": () => (/* binding */ addGooglePlacesAPI)
/* harmony export */ });
/* harmony import */ var _getCityName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCityName */ "./src/app/getCityName.js");
/* harmony import */ var _openWeatherMapCall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./openWeatherMapCall */ "./src/app/openWeatherMapCall.js");



function addGooglePlacesAPI (){
    let tag = document.createElement("script");
    tag.setAttribute('defer','');
    tag.setAttribute('async','');
    tag.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB0s970PqYGaxnHPxFOZYzeJ2RMUB2Pej0&libraries=places&callback=initMap";
    window.initMap = function() {
        let input = document.getElementById("search-bar");
        
        const options = {
            fields: ["address_components", "geometry"],
            types: ['(cities)'],
        }
        let autocomplete = new google.maps.places.Autocomplete(input);
        
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location){
                return;
            }

            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            
            console.log(latitude + " " + longitude);
            (0,_getCityName__WEBPACK_IMPORTED_MODULE_0__.getCityName)(latitude, longitude, place.formatted_address.toString());
            (0,_openWeatherMapCall__WEBPACK_IMPORTED_MODULE_1__.openWeatherMapCall)(latitude, longitude, "metric");
        });

    }
    document.getElementsByTagName("head")[0].appendChild(tag);


}


/***/ }),

/***/ "./src/app/getCityName.js":
/*!********************************!*\
  !*** ./src/app/getCityName.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCityName": () => (/* binding */ getCityName)
/* harmony export */ });
/* harmony import */ var _htmlElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlElements */ "./src/app/htmlElements.js");

function getCityName(latitude, longitude, fallbackName) {
    let geocoder = new google.maps.Geocoder();
    const latlng = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    }
    geocoder.geocode({location: latlng}, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        if (status == google.maps.GeocoderStatus.OK) {
            let [sublocality, locality, country] = ["", "", ""];
            const firstResult = results[0].address_components;
            console.log(firstResult)
            firstResult.forEach(element => {
                element.types.forEach(type => {
                    if (type.toLowerCase() == "sublocality"){
                        sublocality = element.long_name.toString();
                    } else if (type.toLowerCase() == "locality"){
                        locality = element.long_name.toString();
                    } else if(type.toLowerCase() == "country"){
                        country = element.long_name.toString();
                    }
                })
            })

            if (sublocality != "" && country != ""){
                _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.cityElement.textContent = `${sublocality}, ${country}`;
            } else if (locality != "" && country != ""){
                _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.cityElement.textContent = `${locality}, ${country}`;
            } else if (country != ""){
                _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.cityElement.textContent = `${country}`;
            } else{
                _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.cityElement.textContent = `${fallbackName}`
            }
        }
    });
}

/***/ }),

/***/ "./src/app/getDayOfWeek.js":
/*!*********************************!*\
  !*** ./src/app/getDayOfWeek.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDayOfWeek": () => (/* binding */ getDayOfWeek)
/* harmony export */ });

function getDayOfWeek(dayNumber){
    switch (dayNumber) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}

/***/ }),

/***/ "./src/app/getIconClass.js":
/*!*********************************!*\
  !*** ./src/app/getIconClass.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getIconClass": () => (/* binding */ getIconClass)
/* harmony export */ });


function getIconClass(weatherType){
    if (weatherType.toString().toLowerCase() == "thunderstorm"){
        return "fa-cloud-bolt";
    } else if(weatherType.toString().toLowerCase() == "drizzle" || weatherType.toString().toLowerCase() == "rain"){
        return "fa-cloud-rain";
    } else if(weatherType.toString().toLowerCase() == "snow"){
        return "fa-snowflake";
    } else if(weatherType.toString().toLowerCase() == "clear" || weatherType.toString().toLowerCase() == "sunny"){
        return "fa-sun";
    } else if(weatherType.toString().toLowerCase() == "clouds"){
        return "fa-cloud";
    } else if(weatherType.toString().toLowerCase() == "tornado"){
        return "fa-tornado";
    } else{
        return "fa-smog";
    }
}

/***/ }),

/***/ "./src/app/htmlElements.js":
/*!*********************************!*\
  !*** ./src/app/htmlElements.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlElements": () => (/* binding */ htmlElements)
/* harmony export */ });
const htmlElements = {
    dateObject: document.querySelector(".date"),
    timeObject: document.querySelector(".current-time"),
    metric: document.querySelector(".metric"),
    imperial: document.querySelector(".imperial"),
    searchBar: document.querySelector(".search-bar"),
    searchBox: document.querySelector(".search-box"),
    magnifyingGlass: document.querySelector(".fa-magnifying-glass"),
    cityElement: document.querySelector(".city-element"),
    currentTemperature: document.querySelector(".current-temperature"),
    currentWeatherType: document.querySelector(".current-weather-type"),
    currentFeelsLike: document.querySelector(".current-feels-like"),
    currentHumidity: document.querySelector(".current-humidity"),
    currentPressure: document.querySelector(".current-pressure"),
    currentWindSpeed: document.querySelector(".current-wind-speed"),
    mainImage: document.querySelector(".main-image"),
    forecastDayElements: document.querySelectorAll(".day"),
    forecastMaxTempElements: document.querySelectorAll(".max-temp"),
    forecastMinTempElements: document.querySelectorAll(".min-temp"),
    forecastIcons: document.querySelectorAll(".forecast-icon"),
}

/***/ }),

/***/ "./src/app/openWeatherMapCall.js":
/*!***************************************!*\
  !*** ./src/app/openWeatherMapCall.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openWeatherMapCall": () => (/* binding */ openWeatherMapCall)
/* harmony export */ });
/* harmony import */ var _htmlElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlElements */ "./src/app/htmlElements.js");
/* harmony import */ var _updateDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateDate */ "./src/app/updateDate.js");
/* harmony import */ var _getIconClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getIconClass */ "./src/app/getIconClass.js");
/* harmony import */ var _getDayOfWeek__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getDayOfWeek */ "./src/app/getDayOfWeek.js");





const openWeatherMapCall = async (latitude, longitude, units) => {
    try{
        const unitsVar = {
            degrees: units == "metric" ? "C" : "F",
            humidity: "%",
            pressure: units == "metric" ? "hPa" : "psi",
            speed: units == "metric" ? "m/s" : "mph",
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=9e4b95876253dc331b1210331c2fd5d7&units=${units}`,
        {mode: 'cors'});
        const data = await response.json();
        console.log(data);

        const pressure = units == "metric" ? data.current.pressure : (data.current.pressure * 0.0145038).toFixed(1);
        const currentTemperature = Math.trunc(data.current.temp);
        let currentWeatherType = data.current.weather[0].main;

        if (currentWeatherType.toString().toLowerCase() == "clear"){
            if (units == "metric" && currentTemperature > 28){
                console.log(currentWeatherType);
                currentWeatherType = "Sunny";
            } else if(units == "imperial" && currentTemperature > 82){
                console.log(currentWeatherType)
                currentWeatherType = "Sunny";
            }
        }

        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentTemperature.textContent = Math.trunc(data.current.temp).toString() + "°" + unitsVar.degrees;
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentWeatherType.textContent = "[ " + currentWeatherType.toString() + " ]";
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentFeelsLike.textContent = Math.round(data.current.feels_like).toString() + "°" + unitsVar.degrees;
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentHumidity.textContent = data.current.humidity.toString() + unitsVar.humidity;
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentPressure.textContent = pressure.toString() + " " + unitsVar.pressure;
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.currentWindSpeed.textContent = (data.current.wind_speed.toFixed(1)).toString() + " " + unitsVar.speed;


        if (currentWeatherType.toString().toLowerCase() == "thunderstorm"){
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = "./images/Storm.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "drizzle" || currentWeatherType.toString().toLowerCase() == "rain"){
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = "./images/Rain.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "snow"){
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = "./images/Snow.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "clear"){
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = "./images/Clear.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "sunny"){
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = "./images/Sunny.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "clouds"){
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = "./images/Cloudy.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "tornado"){
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = "./images/Tornado.gif";
        } else{
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.mainImage.src = "./images/Default.gif";
        }

        // console.log(currentTemperature);    
        // console.log(currentWeatherType);

        const unixTimeStamp = data.current.dt;
        const offset = data.timezone_offset; 
        (0,_updateDate__WEBPACK_IMPORTED_MODULE_1__.updateDate)(unixTimeStamp, offset);


        let index = 0;
        let currentDayNumber = new Date((unixTimeStamp + offset) * 1000).getDay();
        console.log(currentDayNumber);
        for (let i = 1; i < 7; i++){
            let nextDayNumber = (currentDayNumber + i) % 7;
            let dayName = (0,_getDayOfWeek__WEBPACK_IMPORTED_MODULE_3__.getDayOfWeek)(nextDayNumber);
            console.log(nextDayNumber);
            let iconClass = (0,_getIconClass__WEBPACK_IMPORTED_MODULE_2__.getIconClass)(data.daily[i].weather[0].main.toString());

            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.forecastDayElements[index].textContent = dayName;
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.forecastMaxTempElements[index].textContent = Math.trunc(data.daily[i].temp.max).toString() + "°" + unitsVar.degrees;
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.forecastMinTempElements[index].textContent = Math.trunc(data.daily[i].temp.min).toString() + "°" + unitsVar.degrees;
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.forecastIcons[index].className = "";
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.forecastIcons[index].classList.add("fa-solid", "fa-2x", "forecast-icon", iconClass);
            index++;
        }

    } catch(error){
        console.log(error);
    }

}

/***/ }),

/***/ "./src/app/updateDate.js":
/*!*******************************!*\
  !*** ./src/app/updateDate.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateDate": () => (/* binding */ updateDate)
/* harmony export */ });
/* harmony import */ var _htmlElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlElements */ "./src/app/htmlElements.js");
/* harmony import */ var _getDayOfWeek__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDayOfWeek */ "./src/app/getDayOfWeek.js");



const updateDate = (unixTimeStamp, offset) => {
    let correctTimeStamp = unixTimeStamp + (offset);
    let date = new Date(correctTimeStamp * 1000);
    console.log(date);
    let day = (0,_getDayOfWeek__WEBPACK_IMPORTED_MODULE_1__.getDayOfWeek)(date.getUTCDay());
    
    const amOrPm = date.getUTCHours() >= 12 ? "PM" : "AM";
    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.dateObject.textContent = day + ", " + (date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear();
    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.timeObject.textContent = date.getUTCHours().toString().padStart(2, '0') + ":" + date.getUTCMinutes().toString().padStart(2, '0') + " " + amOrPm;
}

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_addGooglePlacesAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/addGooglePlacesAPI */ "./src/app/addGooglePlacesAPI.js");
/* harmony import */ var _app_addEventListenerToSearchBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/addEventListenerToSearchBar */ "./src/app/addEventListenerToSearchBar.js");





document.activeElement.blur();
(0,_app_addEventListenerToSearchBar__WEBPACK_IMPORTED_MODULE_1__.addEventListenerToSearchBar)();
(0,_app_addGooglePlacesAPI__WEBPACK_IMPORTED_MODULE_0__.addGooglePlacesAPI)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHFFQUEwQjtBQUN0QyxVQUFVO0FBQ1YsWUFBWSxxRUFBMEI7QUFDdEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSx1REFBVTs7O0FBR2xCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0EsMEJBQTBCLDJEQUFZO0FBQ3RDO0FBQ0EsNEJBQTRCLDJEQUFZOztBQUV4QyxZQUFZLDJFQUFnQztBQUM1QyxZQUFZLCtFQUFvQztBQUNoRCxZQUFZLCtFQUFvQztBQUNoRCxZQUFZLHFFQUEwQjtBQUN0QyxZQUFZLHFFQUEwQjtBQUN0QztBQUNBOztBQUVBLE1BQU07QUFDTjtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkY4QztBQUNBOztBQUV2QztBQUNQO0FBQ0E7QUFDQTtBQUNBLGNBQWMsMkRBQVk7QUFDMUI7QUFDQTtBQUNBLElBQUksOEVBQW1DO0FBQ3ZDLElBQUksOEVBQW1DO0FBQ3ZDOzs7Ozs7VUNaQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNMNkQ7QUFDbUI7OztBQUdoRjtBQUNBLDZGQUEyQjtBQUMzQiwyRUFBa0IsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwcC9hZGRFdmVudExpc3RlbmVyVG9TZWFyY2hCYXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwL2FkZEdvb2dsZVBsYWNlc0FQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcHAvZ2V0Q2l0eU5hbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwL2dldERheU9mV2Vlay5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcHAvZ2V0SWNvbkNsYXNzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwcC9odG1sRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwL29wZW5XZWF0aGVyTWFwQ2FsbC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcHAvdXBkYXRlRGF0ZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWxFbGVtZW50cyB9IGZyb20gXCIuL2h0bWxFbGVtZW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lclRvU2VhcmNoQmFyICgpIHtcbiAgICBodG1sRWxlbWVudHMuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICBodG1sRWxlbWVudHMuc2VhcmNoQm94LmZvY3VzKCk7XG4gICAgfSk7XG5cbiAgICBodG1sRWxlbWVudHMuc2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIGh0bWxFbGVtZW50cy5zZWFyY2hCYXIuY2xhc3NMaXN0LmFkZChcInNlYXJjaC1iYXItaG92ZXJcIik7XG4gICAgICAgIGh0bWxFbGVtZW50cy5zZWFyY2hCb3guY2xhc3NMaXN0LmFkZChcInNlYXJjaC1ib3gtaG92ZXJcIik7XG4gICAgICAgIGh0bWxFbGVtZW50cy5tYWduaWZ5aW5nR2xhc3MuY2xhc3NMaXN0LmFkZChcImZhLW1hZ25pZnlpbmctZ2xhc3MtaG92ZXJcIik7XG4gICAgfSk7XG5cblxuICAgIGh0bWxFbGVtZW50cy5zZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsICgpID0+IHtcbiAgICAgICAgaHRtbEVsZW1lbnRzLnNlYXJjaEJhci5jbGFzc0xpc3QucmVtb3ZlKFwic2VhcmNoLWJhci1ob3ZlclwiKTtcbiAgICAgICAgaHRtbEVsZW1lbnRzLnNlYXJjaEJveC5jbGFzc0xpc3QucmVtb3ZlKFwic2VhcmNoLWJveC1ob3ZlclwiKTtcbiAgICAgICAgaHRtbEVsZW1lbnRzLm1hZ25pZnlpbmdHbGFzcy5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtbWFnbmlmeWluZy1nbGFzcy1ob3ZlclwiKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWMtY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgaHRtbEVsZW1lbnRzLnNlYXJjaEJveC52YWx1ZSA9IFwiXCI7XG4gICAgfSlcbiAgICBcbn0iLCJpbXBvcnQgeyBnZXRDaXR5TmFtZSB9IGZyb20gXCIuL2dldENpdHlOYW1lXCI7XG5pbXBvcnQgeyBvcGVuV2VhdGhlck1hcENhbGwgfSBmcm9tIFwiLi9vcGVuV2VhdGhlck1hcENhbGxcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEdvb2dsZVBsYWNlc0FQSSAoKXtcbiAgICBsZXQgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICB0YWcuc2V0QXR0cmlidXRlKCdkZWZlcicsJycpO1xuICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ2FzeW5jJywnJyk7XG4gICAgdGFnLnNyYyA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT1BSXphU3lCMHM5NzBQcVlHYXhuSFB4Rk9aWXplSjJSTVVCMlBlajAmbGlicmFyaWVzPXBsYWNlcyZjYWxsYmFjaz1pbml0TWFwXCI7XG4gICAgd2luZG93LmluaXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYmFyXCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGZpZWxkczogW1wiYWRkcmVzc19jb21wb25lbnRzXCIsIFwiZ2VvbWV0cnlcIl0sXG4gICAgICAgICAgICB0eXBlczogWycoY2l0aWVzKSddLFxuICAgICAgICB9XG4gICAgICAgIGxldCBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShpbnB1dCk7XG4gICAgICAgIFxuICAgICAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoXCJwbGFjZV9jaGFuZ2VkXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlID0gYXV0b2NvbXBsZXRlLmdldFBsYWNlKCk7XG4gICAgICAgICAgICBpZiAoIXBsYWNlLmdlb21ldHJ5IHx8ICFwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbil7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBsYXRpdHVkZSA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpO1xuICAgICAgICAgICAgY29uc3QgbG9uZ2l0dWRlID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhdGl0dWRlICsgXCIgXCIgKyBsb25naXR1ZGUpO1xuICAgICAgICAgICAgZ2V0Q2l0eU5hbWUobGF0aXR1ZGUsIGxvbmdpdHVkZSwgcGxhY2UuZm9ybWF0dGVkX2FkZHJlc3MudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBvcGVuV2VhdGhlck1hcENhbGwobGF0aXR1ZGUsIGxvbmdpdHVkZSwgXCJtZXRyaWNcIik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZCh0YWcpO1xuXG5cbn1cbiIsImltcG9ydCB7IGh0bWxFbGVtZW50cyB9IGZyb20gXCIuL2h0bWxFbGVtZW50c1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldENpdHlOYW1lKGxhdGl0dWRlLCBsb25naXR1ZGUsIGZhbGxiYWNrTmFtZSkge1xuICAgIGxldCBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuICAgIGNvbnN0IGxhdGxuZyA9IHtcbiAgICAgICAgbGF0OiBwYXJzZUZsb2F0KGxhdGl0dWRlKSxcbiAgICAgICAgbG5nOiBwYXJzZUZsb2F0KGxvbmdpdHVkZSlcbiAgICB9XG4gICAgZ2VvY29kZXIuZ2VvY29kZSh7bG9jYXRpb246IGxhdGxuZ30sIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcbiAgICAgICAgICAgIGFsZXJ0KHN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgICAgbGV0IFtzdWJsb2NhbGl0eSwgbG9jYWxpdHksIGNvdW50cnldID0gW1wiXCIsIFwiXCIsIFwiXCJdO1xuICAgICAgICAgICAgY29uc3QgZmlyc3RSZXN1bHQgPSByZXN1bHRzWzBdLmFkZHJlc3NfY29tcG9uZW50cztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpcnN0UmVzdWx0KVxuICAgICAgICAgICAgZmlyc3RSZXN1bHQuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnR5cGVzLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlLnRvTG93ZXJDYXNlKCkgPT0gXCJzdWJsb2NhbGl0eVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmxvY2FsaXR5ID0gZWxlbWVudC5sb25nX25hbWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlLnRvTG93ZXJDYXNlKCkgPT0gXCJsb2NhbGl0eVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsaXR5ID0gZWxlbWVudC5sb25nX25hbWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGUudG9Mb3dlckNhc2UoKSA9PSBcImNvdW50cnlcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ID0gZWxlbWVudC5sb25nX25hbWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoc3VibG9jYWxpdHkgIT0gXCJcIiAmJiBjb3VudHJ5ICE9IFwiXCIpe1xuICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50cy5jaXR5RWxlbWVudC50ZXh0Q29udGVudCA9IGAke3N1YmxvY2FsaXR5fSwgJHtjb3VudHJ5fWA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2FsaXR5ICE9IFwiXCIgJiYgY291bnRyeSAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICBodG1sRWxlbWVudHMuY2l0eUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtsb2NhbGl0eX0sICR7Y291bnRyeX1gO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudHJ5ICE9IFwiXCIpe1xuICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50cy5jaXR5RWxlbWVudC50ZXh0Q29udGVudCA9IGAke2NvdW50cnl9YDtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICBodG1sRWxlbWVudHMuY2l0eUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtmYWxsYmFja05hbWV9YFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKGRheU51bWJlcil7XG4gICAgc3dpdGNoIChkYXlOdW1iZXIpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIFwiU3VuZGF5XCI7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBcIk1vbmRheVwiO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gXCJUdWVzZGF5XCI7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBcIldlZG5lc2RheVwiO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICByZXR1cm4gXCJUaHVyc2RheVwiO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICByZXR1cm4gXCJGcmlkYXlcIjtcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgcmV0dXJuIFwiU2F0dXJkYXlcIjtcbiAgICB9XG59IiwiXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJY29uQ2xhc3Mod2VhdGhlclR5cGUpe1xuICAgIGlmICh3ZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJ0aHVuZGVyc3Rvcm1cIil7XG4gICAgICAgIHJldHVybiBcImZhLWNsb3VkLWJvbHRcIjtcbiAgICB9IGVsc2UgaWYod2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwiZHJpenpsZVwiIHx8IHdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcInJhaW5cIil7XG4gICAgICAgIHJldHVybiBcImZhLWNsb3VkLXJhaW5cIjtcbiAgICB9IGVsc2UgaWYod2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwic25vd1wiKXtcbiAgICAgICAgcmV0dXJuIFwiZmEtc25vd2ZsYWtlXCI7XG4gICAgfSBlbHNlIGlmKHdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcImNsZWFyXCIgfHwgd2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwic3VubnlcIil7XG4gICAgICAgIHJldHVybiBcImZhLXN1blwiO1xuICAgIH0gZWxzZSBpZih3ZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJjbG91ZHNcIil7XG4gICAgICAgIHJldHVybiBcImZhLWNsb3VkXCI7XG4gICAgfSBlbHNlIGlmKHdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcInRvcm5hZG9cIil7XG4gICAgICAgIHJldHVybiBcImZhLXRvcm5hZG9cIjtcbiAgICB9IGVsc2V7XG4gICAgICAgIHJldHVybiBcImZhLXNtb2dcIjtcbiAgICB9XG59IiwiZXhwb3J0IGNvbnN0IGh0bWxFbGVtZW50cyA9IHtcbiAgICBkYXRlT2JqZWN0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGVcIiksXG4gICAgdGltZU9iamVjdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXRpbWVcIiksXG4gICAgbWV0cmljOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1ldHJpY1wiKSxcbiAgICBpbXBlcmlhbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbXBlcmlhbFwiKSxcbiAgICBzZWFyY2hCYXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWJhclwiKSxcbiAgICBzZWFyY2hCb3g6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWJveFwiKSxcbiAgICBtYWduaWZ5aW5nR2xhc3M6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmEtbWFnbmlmeWluZy1nbGFzc1wiKSxcbiAgICBjaXR5RWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5LWVsZW1lbnRcIiksXG4gICAgY3VycmVudFRlbXBlcmF0dXJlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtdGVtcGVyYXR1cmVcIiksXG4gICAgY3VycmVudFdlYXRoZXJUeXBlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtd2VhdGhlci10eXBlXCIpLFxuICAgIGN1cnJlbnRGZWVsc0xpa2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1mZWVscy1saWtlXCIpLFxuICAgIGN1cnJlbnRIdW1pZGl0eTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LWh1bWlkaXR5XCIpLFxuICAgIGN1cnJlbnRQcmVzc3VyZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXByZXNzdXJlXCIpLFxuICAgIGN1cnJlbnRXaW5kU3BlZWQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC13aW5kLXNwZWVkXCIpLFxuICAgIG1haW5JbWFnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWltYWdlXCIpLFxuICAgIGZvcmVjYXN0RGF5RWxlbWVudHM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGF5XCIpLFxuICAgIGZvcmVjYXN0TWF4VGVtcEVsZW1lbnRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1heC10ZW1wXCIpLFxuICAgIGZvcmVjYXN0TWluVGVtcEVsZW1lbnRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1pbi10ZW1wXCIpLFxuICAgIGZvcmVjYXN0SWNvbnM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZm9yZWNhc3QtaWNvblwiKSxcbn0iLCJpbXBvcnQgeyBodG1sRWxlbWVudHMgfSBmcm9tIFwiLi9odG1sRWxlbWVudHNcIjtcbmltcG9ydCB7IHVwZGF0ZURhdGUgfSBmcm9tIFwiLi91cGRhdGVEYXRlXCI7XG5pbXBvcnQgeyBnZXRJY29uQ2xhc3MgfSBmcm9tIFwiLi9nZXRJY29uQ2xhc3NcIjtcbmltcG9ydCB7IGdldERheU9mV2VlayB9IGZyb20gXCIuL2dldERheU9mV2Vla1wiO1xuXG5leHBvcnQgY29uc3Qgb3BlbldlYXRoZXJNYXBDYWxsID0gYXN5bmMgKGxhdGl0dWRlLCBsb25naXR1ZGUsIHVuaXRzKSA9PiB7XG4gICAgdHJ5e1xuICAgICAgICBjb25zdCB1bml0c1ZhciA9IHtcbiAgICAgICAgICAgIGRlZ3JlZXM6IHVuaXRzID09IFwibWV0cmljXCIgPyBcIkNcIiA6IFwiRlwiLFxuICAgICAgICAgICAgaHVtaWRpdHk6IFwiJVwiLFxuICAgICAgICAgICAgcHJlc3N1cmU6IHVuaXRzID09IFwibWV0cmljXCIgPyBcImhQYVwiIDogXCJwc2lcIixcbiAgICAgICAgICAgIHNwZWVkOiB1bml0cyA9PSBcIm1ldHJpY1wiID8gXCJtL3NcIiA6IFwibXBoXCIsXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mZXhjbHVkZT1ob3VybHksbWludXRlbHksYWxlcnRzJmFwcGlkPTllNGI5NTg3NjI1M2RjMzMxYjEyMTAzMzFjMmZkNWQ3JnVuaXRzPSR7dW5pdHN9YCxcbiAgICAgICAge21vZGU6ICdjb3JzJ30pO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgICAgICBjb25zdCBwcmVzc3VyZSA9IHVuaXRzID09IFwibWV0cmljXCIgPyBkYXRhLmN1cnJlbnQucHJlc3N1cmUgOiAoZGF0YS5jdXJyZW50LnByZXNzdXJlICogMC4wMTQ1MDM4KS50b0ZpeGVkKDEpO1xuICAgICAgICBjb25zdCBjdXJyZW50VGVtcGVyYXR1cmUgPSBNYXRoLnRydW5jKGRhdGEuY3VycmVudC50ZW1wKTtcbiAgICAgICAgbGV0IGN1cnJlbnRXZWF0aGVyVHlwZSA9IGRhdGEuY3VycmVudC53ZWF0aGVyWzBdLm1haW47XG5cbiAgICAgICAgaWYgKGN1cnJlbnRXZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJjbGVhclwiKXtcbiAgICAgICAgICAgIGlmICh1bml0cyA9PSBcIm1ldHJpY1wiICYmIGN1cnJlbnRUZW1wZXJhdHVyZSA+IDI4KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50V2VhdGhlclR5cGUpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRXZWF0aGVyVHlwZSA9IFwiU3VubnlcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZih1bml0cyA9PSBcImltcGVyaWFsXCIgJiYgY3VycmVudFRlbXBlcmF0dXJlID4gODIpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRXZWF0aGVyVHlwZSlcbiAgICAgICAgICAgICAgICBjdXJyZW50V2VhdGhlclR5cGUgPSBcIlN1bm55XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBodG1sRWxlbWVudHMuY3VycmVudFRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gTWF0aC50cnVuYyhkYXRhLmN1cnJlbnQudGVtcCkudG9TdHJpbmcoKSArIFwiwrBcIiArIHVuaXRzVmFyLmRlZ3JlZXM7XG4gICAgICAgIGh0bWxFbGVtZW50cy5jdXJyZW50V2VhdGhlclR5cGUudGV4dENvbnRlbnQgPSBcIlsgXCIgKyBjdXJyZW50V2VhdGhlclR5cGUudG9TdHJpbmcoKSArIFwiIF1cIjtcbiAgICAgICAgaHRtbEVsZW1lbnRzLmN1cnJlbnRGZWVsc0xpa2UudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc19saWtlKS50b1N0cmluZygpICsgXCLCsFwiICsgdW5pdHNWYXIuZGVncmVlcztcbiAgICAgICAgaHRtbEVsZW1lbnRzLmN1cnJlbnRIdW1pZGl0eS50ZXh0Q29udGVudCA9IGRhdGEuY3VycmVudC5odW1pZGl0eS50b1N0cmluZygpICsgdW5pdHNWYXIuaHVtaWRpdHk7XG4gICAgICAgIGh0bWxFbGVtZW50cy5jdXJyZW50UHJlc3N1cmUudGV4dENvbnRlbnQgPSBwcmVzc3VyZS50b1N0cmluZygpICsgXCIgXCIgKyB1bml0c1Zhci5wcmVzc3VyZTtcbiAgICAgICAgaHRtbEVsZW1lbnRzLmN1cnJlbnRXaW5kU3BlZWQudGV4dENvbnRlbnQgPSAoZGF0YS5jdXJyZW50LndpbmRfc3BlZWQudG9GaXhlZCgxKSkudG9TdHJpbmcoKSArIFwiIFwiICsgdW5pdHNWYXIuc3BlZWQ7XG5cblxuICAgICAgICBpZiAoY3VycmVudFdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcInRodW5kZXJzdG9ybVwiKXtcbiAgICAgICAgICAgIGh0bWxFbGVtZW50cy5tYWluSW1hZ2Uuc3JjID0gXCIuL2ltYWdlcy9TdG9ybS5naWZcIjtcbiAgICAgICAgfSBlbHNlIGlmKGN1cnJlbnRXZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJkcml6emxlXCIgfHwgY3VycmVudFdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcInJhaW5cIil7XG4gICAgICAgICAgICBodG1sRWxlbWVudHMubWFpbkltYWdlLnNyYyA9IFwiLi9pbWFnZXMvUmFpbi5naWZcIjtcbiAgICAgICAgfSBlbHNlIGlmKGN1cnJlbnRXZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJzbm93XCIpe1xuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLm1haW5JbWFnZS5zcmMgPSBcIi4vaW1hZ2VzL1Nub3cuZ2lmXCI7XG4gICAgICAgIH0gZWxzZSBpZihjdXJyZW50V2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwiY2xlYXJcIil7XG4gICAgICAgICAgICBodG1sRWxlbWVudHMubWFpbkltYWdlLnNyYyA9IFwiLi9pbWFnZXMvQ2xlYXIuZ2lmXCI7XG4gICAgICAgIH0gZWxzZSBpZihjdXJyZW50V2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwic3VubnlcIil7XG4gICAgICAgICAgICBodG1sRWxlbWVudHMubWFpbkltYWdlLnNyYyA9IFwiLi9pbWFnZXMvU3VubnkuZ2lmXCI7XG4gICAgICAgIH0gZWxzZSBpZihjdXJyZW50V2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwiY2xvdWRzXCIpe1xuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLm1haW5JbWFnZS5zcmMgPSBcIi4vaW1hZ2VzL0Nsb3VkeS5naWZcIjtcbiAgICAgICAgfSBlbHNlIGlmKGN1cnJlbnRXZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJ0b3JuYWRvXCIpe1xuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLm1haW5JbWFnZS5zcmMgPSBcIi4vaW1hZ2VzL1Rvcm5hZG8uZ2lmXCI7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIGh0bWxFbGVtZW50cy5tYWluSW1hZ2Uuc3JjID0gXCIuL2ltYWdlcy9EZWZhdWx0LmdpZlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudFRlbXBlcmF0dXJlKTsgICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRXZWF0aGVyVHlwZSk7XG5cbiAgICAgICAgY29uc3QgdW5peFRpbWVTdGFtcCA9IGRhdGEuY3VycmVudC5kdDtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZGF0YS50aW1lem9uZV9vZmZzZXQ7IFxuICAgICAgICB1cGRhdGVEYXRlKHVuaXhUaW1lU3RhbXAsIG9mZnNldCk7XG5cblxuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgY3VycmVudERheU51bWJlciA9IG5ldyBEYXRlKCh1bml4VGltZVN0YW1wICsgb2Zmc2V0KSAqIDEwMDApLmdldERheSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50RGF5TnVtYmVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA3OyBpKyspe1xuICAgICAgICAgICAgbGV0IG5leHREYXlOdW1iZXIgPSAoY3VycmVudERheU51bWJlciArIGkpICUgNztcbiAgICAgICAgICAgIGxldCBkYXlOYW1lID0gZ2V0RGF5T2ZXZWVrKG5leHREYXlOdW1iZXIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobmV4dERheU51bWJlcik7XG4gICAgICAgICAgICBsZXQgaWNvbkNsYXNzID0gZ2V0SWNvbkNsYXNzKGRhdGEuZGFpbHlbaV0ud2VhdGhlclswXS5tYWluLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgICAgICBodG1sRWxlbWVudHMuZm9yZWNhc3REYXlFbGVtZW50c1tpbmRleF0udGV4dENvbnRlbnQgPSBkYXlOYW1lO1xuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLmZvcmVjYXN0TWF4VGVtcEVsZW1lbnRzW2luZGV4XS50ZXh0Q29udGVudCA9IE1hdGgudHJ1bmMoZGF0YS5kYWlseVtpXS50ZW1wLm1heCkudG9TdHJpbmcoKSArIFwiwrBcIiArIHVuaXRzVmFyLmRlZ3JlZXM7XG4gICAgICAgICAgICBodG1sRWxlbWVudHMuZm9yZWNhc3RNaW5UZW1wRWxlbWVudHNbaW5kZXhdLnRleHRDb250ZW50ID0gTWF0aC50cnVuYyhkYXRhLmRhaWx5W2ldLnRlbXAubWluKS50b1N0cmluZygpICsgXCLCsFwiICsgdW5pdHNWYXIuZGVncmVlcztcbiAgICAgICAgICAgIGh0bWxFbGVtZW50cy5mb3JlY2FzdEljb25zW2luZGV4XS5jbGFzc05hbWUgPSBcIlwiO1xuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLmZvcmVjYXN0SWNvbnNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLTJ4XCIsIFwiZm9yZWNhc3QtaWNvblwiLCBpY29uQ2xhc3MpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuXG4gICAgfSBjYXRjaChlcnJvcil7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBodG1sRWxlbWVudHMgfSBmcm9tIFwiLi9odG1sRWxlbWVudHNcIjtcbmltcG9ydCB7IGdldERheU9mV2VlayB9IGZyb20gXCIuL2dldERheU9mV2Vla1wiO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRGF0ZSA9ICh1bml4VGltZVN0YW1wLCBvZmZzZXQpID0+IHtcbiAgICBsZXQgY29ycmVjdFRpbWVTdGFtcCA9IHVuaXhUaW1lU3RhbXAgKyAob2Zmc2V0KTtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGNvcnJlY3RUaW1lU3RhbXAgKiAxMDAwKTtcbiAgICBjb25zb2xlLmxvZyhkYXRlKTtcbiAgICBsZXQgZGF5ID0gZ2V0RGF5T2ZXZWVrKGRhdGUuZ2V0VVRDRGF5KCkpO1xuICAgIFxuICAgIGNvbnN0IGFtT3JQbSA9IGRhdGUuZ2V0VVRDSG91cnMoKSA+PSAxMiA/IFwiUE1cIiA6IFwiQU1cIjtcbiAgICBodG1sRWxlbWVudHMuZGF0ZU9iamVjdC50ZXh0Q29udGVudCA9IGRheSArIFwiLCBcIiArIChkYXRlLmdldFVUQ01vbnRoKCkgKyAxKSArIFwiL1wiICsgZGF0ZS5nZXRVVENEYXRlKCkgKyBcIi9cIiArIGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICBodG1sRWxlbWVudHMudGltZU9iamVjdC50ZXh0Q29udGVudCA9IGRhdGUuZ2V0VVRDSG91cnMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJykgKyBcIjpcIiArIGRhdGUuZ2V0VVRDTWludXRlcygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSArIFwiIFwiICsgYW1PclBtO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5pbXBvcnQgeyBhZGRHb29nbGVQbGFjZXNBUEkgfSBmcm9tIFwiLi9hcHAvYWRkR29vZ2xlUGxhY2VzQVBJXCJcbmltcG9ydCB7IGFkZEV2ZW50TGlzdGVuZXJUb1NlYXJjaEJhciB9IGZyb20gXCIuL2FwcC9hZGRFdmVudExpc3RlbmVyVG9TZWFyY2hCYXJcIjtcblxuXG5kb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbmFkZEV2ZW50TGlzdGVuZXJUb1NlYXJjaEJhcigpO1xuYWRkR29vZ2xlUGxhY2VzQVBJKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9