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

    ["mouseout", "mouseleave"].forEach(event => {
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.addEventListener(event, () => {
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.blur();
            _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.cityElement.focus();
        });
    })

    _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBar.addEventListener("keydown", (e) => {
        if (e.keyCode == 13){
            e.preventDefault();
            console.log("dksd")
            document.querySelector(".pac-container").style.removeProperty("display");
            return false;
        }
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
    });

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
    document.querySelector(".pac-container").style.display = "none";
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

        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.value = "";
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.searchBox.blur();
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.cityElement.focus();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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M0IsMkVBQWtCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcHAvYWRkRXZlbnRMaXN0ZW5lclRvU2VhcmNoQmFyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwcC9hZGRHb29nbGVQbGFjZXNBUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwL2dldENpdHlOYW1lLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwcC9nZXREYXlPZldlZWsuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwL2dldEljb25DbGFzcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcHAvaHRtbEVsZW1lbnRzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwcC9vcGVuV2VhdGhlck1hcENhbGwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwL3VwZGF0ZURhdGUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sRWxlbWVudHMgfSBmcm9tIFwiLi9odG1sRWxlbWVudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJUb1NlYXJjaEJhciAoKSB7XG4gICAgaHRtbEVsZW1lbnRzLnNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgaHRtbEVsZW1lbnRzLnNlYXJjaEJveC5mb2N1cygpO1xuICAgIH0pO1xuXG4gICAgW1wibW91c2VvdXRcIiwgXCJtb3VzZWxlYXZlXCJdLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICBodG1sRWxlbWVudHMuc2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgIGh0bWxFbGVtZW50cy5zZWFyY2hCb3guYmx1cigpO1xuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLmNpdHlFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG5cbiAgICBodG1sRWxlbWVudHMuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0gMTMpe1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJka3NkXCIpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhYy1jb250YWluZXJcIikuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJkaXNwbGF5XCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBodG1sRWxlbWVudHMuc2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIGh0bWxFbGVtZW50cy5zZWFyY2hCYXIuY2xhc3NMaXN0LmFkZChcInNlYXJjaC1iYXItaG92ZXJcIik7XG4gICAgICAgIGh0bWxFbGVtZW50cy5zZWFyY2hCb3guY2xhc3NMaXN0LmFkZChcInNlYXJjaC1ib3gtaG92ZXJcIik7XG4gICAgICAgIGh0bWxFbGVtZW50cy5tYWduaWZ5aW5nR2xhc3MuY2xhc3NMaXN0LmFkZChcImZhLW1hZ25pZnlpbmctZ2xhc3MtaG92ZXJcIik7XG4gICAgfSk7XG5cblxuICAgIGh0bWxFbGVtZW50cy5zZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsICgpID0+IHtcbiAgICAgICAgaHRtbEVsZW1lbnRzLnNlYXJjaEJhci5jbGFzc0xpc3QucmVtb3ZlKFwic2VhcmNoLWJhci1ob3ZlclwiKTtcbiAgICAgICAgaHRtbEVsZW1lbnRzLnNlYXJjaEJveC5jbGFzc0xpc3QucmVtb3ZlKFwic2VhcmNoLWJveC1ob3ZlclwiKTtcbiAgICAgICAgaHRtbEVsZW1lbnRzLm1hZ25pZnlpbmdHbGFzcy5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtbWFnbmlmeWluZy1nbGFzcy1ob3ZlclwiKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWMtY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgaHRtbEVsZW1lbnRzLnNlYXJjaEJveC52YWx1ZSA9IFwiXCI7XG4gICAgfSk7XG5cbn0iLCJpbXBvcnQgeyBnZXRDaXR5TmFtZSB9IGZyb20gXCIuL2dldENpdHlOYW1lXCI7XG5pbXBvcnQgeyBvcGVuV2VhdGhlck1hcENhbGwgfSBmcm9tIFwiLi9vcGVuV2VhdGhlck1hcENhbGxcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEdvb2dsZVBsYWNlc0FQSSAoKXtcbiAgICBsZXQgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICB0YWcuc2V0QXR0cmlidXRlKCdkZWZlcicsJycpO1xuICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ2FzeW5jJywnJyk7XG4gICAgdGFnLnNyYyA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT1BSXphU3lCMHM5NzBQcVlHYXhuSFB4Rk9aWXplSjJSTVVCMlBlajAmbGlicmFyaWVzPXBsYWNlcyZjYWxsYmFjaz1pbml0TWFwXCI7XG4gICAgd2luZG93LmluaXRNYXAgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1iYXJcIik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgZmllbGRzOiBbXCJhZGRyZXNzX2NvbXBvbmVudHNcIiwgXCJnZW9tZXRyeVwiXSxcbiAgICAgICAgICAgIHR5cGVzOiBbJyhjaXRpZXMpJ10sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKGlucHV0KTtcbiAgICAgICAgXG4gICAgICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcihcInBsYWNlX2NoYW5nZWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGxhY2UgPSBhdXRvY29tcGxldGUuZ2V0UGxhY2UoKTtcbiAgICAgICAgICAgIGlmICghcGxhY2UuZ2VvbWV0cnkgfHwgIXBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGxhdGl0dWRlID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubGF0KCk7XG4gICAgICAgICAgICBjb25zdCBsb25naXR1ZGUgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2cobGF0aXR1ZGUgKyBcIiBcIiArIGxvbmdpdHVkZSk7XG4gICAgICAgICAgICBnZXRDaXR5TmFtZShsYXRpdHVkZSwgbG9uZ2l0dWRlLCBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcy50b1N0cmluZygpKTtcbiAgICAgICAgICAgIG9wZW5XZWF0aGVyTWFwQ2FsbChsYXRpdHVkZSwgbG9uZ2l0dWRlLCBcIm1ldHJpY1wiKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHRhZyk7XG5cblxufVxuIiwiaW1wb3J0IHsgaHRtbEVsZW1lbnRzIH0gZnJvbSBcIi4vaHRtbEVsZW1lbnRzXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2l0eU5hbWUobGF0aXR1ZGUsIGxvbmdpdHVkZSwgZmFsbGJhY2tOYW1lKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWMtY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBsZXQgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICBjb25zdCBsYXRsbmcgPSB7XG4gICAgICAgIGxhdDogcGFyc2VGbG9hdChsYXRpdHVkZSksXG4gICAgICAgIGxuZzogcGFyc2VGbG9hdChsb25naXR1ZGUpXG4gICAgfVxuICAgIGdlb2NvZGVyLmdlb2NvZGUoe2xvY2F0aW9uOiBsYXRsbmd9LCBmdW5jdGlvbiAocmVzdWx0cywgc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMgIT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICBhbGVydChzdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0dXMgPT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcbiAgICAgICAgICAgIGxldCBbc3VibG9jYWxpdHksIGxvY2FsaXR5LCBjb3VudHJ5XSA9IFtcIlwiLCBcIlwiLCBcIlwiXTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0UmVzdWx0ID0gcmVzdWx0c1swXS5hZGRyZXNzX2NvbXBvbmVudHM7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmaXJzdFJlc3VsdClcbiAgICAgICAgICAgIGZpcnN0UmVzdWx0LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC50eXBlcy5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZS50b0xvd2VyQ2FzZSgpID09IFwic3VibG9jYWxpdHlcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsb2NhbGl0eSA9IGVsZW1lbnQubG9uZ19uYW1lLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZS50b0xvd2VyQ2FzZSgpID09IFwibG9jYWxpdHlcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbGl0eSA9IGVsZW1lbnQubG9uZ19uYW1lLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0eXBlLnRvTG93ZXJDYXNlKCkgPT0gXCJjb3VudHJ5XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSA9IGVsZW1lbnQubG9uZ19uYW1lLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKHN1YmxvY2FsaXR5ICE9IFwiXCIgJiYgY291bnRyeSAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICBodG1sRWxlbWVudHMuY2l0eUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtzdWJsb2NhbGl0eX0sICR7Y291bnRyeX1gO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhbGl0eSAhPSBcIlwiICYmIGNvdW50cnkgIT0gXCJcIil7XG4gICAgICAgICAgICAgICAgaHRtbEVsZW1lbnRzLmNpdHlFbGVtZW50LnRleHRDb250ZW50ID0gYCR7bG9jYWxpdHl9LCAke2NvdW50cnl9YDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRyeSAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICBodG1sRWxlbWVudHMuY2l0eUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtjb3VudHJ5fWA7XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgaHRtbEVsZW1lbnRzLmNpdHlFbGVtZW50LnRleHRDb250ZW50ID0gYCR7ZmFsbGJhY2tOYW1lfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufSIsIlxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mV2VlayhkYXlOdW1iZXIpe1xuICAgIHN3aXRjaCAoZGF5TnVtYmVyKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBcIlN1bmRheVwiO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gXCJNb25kYXlcIjtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIFwiVHVlc2RheVwiO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByZXR1cm4gXCJXZWRuZXNkYXlcIjtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgcmV0dXJuIFwiVGh1cnNkYXlcIjtcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgcmV0dXJuIFwiRnJpZGF5XCI7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHJldHVybiBcIlNhdHVyZGF5XCI7XG4gICAgfVxufSIsIlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWNvbkNsYXNzKHdlYXRoZXJUeXBlKXtcbiAgICBpZiAod2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwidGh1bmRlcnN0b3JtXCIpe1xuICAgICAgICByZXR1cm4gXCJmYS1jbG91ZC1ib2x0XCI7XG4gICAgfSBlbHNlIGlmKHdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcImRyaXp6bGVcIiB8fCB3ZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJyYWluXCIpe1xuICAgICAgICByZXR1cm4gXCJmYS1jbG91ZC1yYWluXCI7XG4gICAgfSBlbHNlIGlmKHdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcInNub3dcIil7XG4gICAgICAgIHJldHVybiBcImZhLXNub3dmbGFrZVwiO1xuICAgIH0gZWxzZSBpZih3ZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJjbGVhclwiIHx8IHdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcInN1bm55XCIpe1xuICAgICAgICByZXR1cm4gXCJmYS1zdW5cIjtcbiAgICB9IGVsc2UgaWYod2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwiY2xvdWRzXCIpe1xuICAgICAgICByZXR1cm4gXCJmYS1jbG91ZFwiO1xuICAgIH0gZWxzZSBpZih3ZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJ0b3JuYWRvXCIpe1xuICAgICAgICByZXR1cm4gXCJmYS10b3JuYWRvXCI7XG4gICAgfSBlbHNle1xuICAgICAgICByZXR1cm4gXCJmYS1zbW9nXCI7XG4gICAgfVxufSIsImV4cG9ydCBjb25zdCBodG1sRWxlbWVudHMgPSB7XG4gICAgZGF0ZU9iamVjdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRlXCIpLFxuICAgIHRpbWVPYmplY3Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC10aW1lXCIpLFxuICAgIG1ldHJpYzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZXRyaWNcIiksXG4gICAgaW1wZXJpYWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1wZXJpYWxcIiksXG4gICAgc2VhcmNoQmFyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1iYXJcIiksXG4gICAgc2VhcmNoQm94OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1ib3hcIiksXG4gICAgbWFnbmlmeWluZ0dsYXNzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhLW1hZ25pZnlpbmctZ2xhc3NcIiksXG4gICAgY2l0eUVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2l0eS1lbGVtZW50XCIpLFxuICAgIGN1cnJlbnRUZW1wZXJhdHVyZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXRlbXBlcmF0dXJlXCIpLFxuICAgIGN1cnJlbnRXZWF0aGVyVHlwZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXdlYXRoZXItdHlwZVwiKSxcbiAgICBjdXJyZW50RmVlbHNMaWtlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtZmVlbHMtbGlrZVwiKSxcbiAgICBjdXJyZW50SHVtaWRpdHk6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1odW1pZGl0eVwiKSxcbiAgICBjdXJyZW50UHJlc3N1cmU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1wcmVzc3VyZVwiKSxcbiAgICBjdXJyZW50V2luZFNwZWVkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtd2luZC1zcGVlZFwiKSxcbiAgICBtYWluSW1hZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1pbWFnZVwiKSxcbiAgICBmb3JlY2FzdERheUVsZW1lbnRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRheVwiKSxcbiAgICBmb3JlY2FzdE1heFRlbXBFbGVtZW50czogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYXgtdGVtcFwiKSxcbiAgICBmb3JlY2FzdE1pblRlbXBFbGVtZW50czogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5taW4tdGVtcFwiKSxcbiAgICBmb3JlY2FzdEljb25zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZvcmVjYXN0LWljb25cIiksXG59IiwiaW1wb3J0IHsgaHRtbEVsZW1lbnRzIH0gZnJvbSBcIi4vaHRtbEVsZW1lbnRzXCI7XG5pbXBvcnQgeyB1cGRhdGVEYXRlIH0gZnJvbSBcIi4vdXBkYXRlRGF0ZVwiO1xuaW1wb3J0IHsgZ2V0SWNvbkNsYXNzIH0gZnJvbSBcIi4vZ2V0SWNvbkNsYXNzXCI7XG5pbXBvcnQgeyBnZXREYXlPZldlZWsgfSBmcm9tIFwiLi9nZXREYXlPZldlZWtcIjtcblxuZXhwb3J0IGNvbnN0IG9wZW5XZWF0aGVyTWFwQ2FsbCA9IGFzeW5jIChsYXRpdHVkZSwgbG9uZ2l0dWRlLCB1bml0cykgPT4ge1xuICAgIHRyeXtcbiAgICAgICAgY29uc3QgdW5pdHNWYXIgPSB7XG4gICAgICAgICAgICBkZWdyZWVzOiB1bml0cyA9PSBcIm1ldHJpY1wiID8gXCJDXCIgOiBcIkZcIixcbiAgICAgICAgICAgIGh1bWlkaXR5OiBcIiVcIixcbiAgICAgICAgICAgIHByZXNzdXJlOiB1bml0cyA9PSBcIm1ldHJpY1wiID8gXCJoUGFcIiA6IFwicHNpXCIsXG4gICAgICAgICAgICBzcGVlZDogdW5pdHMgPT0gXCJtZXRyaWNcIiA/IFwibS9zXCIgOiBcIm1waFwiLFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9JmV4Y2x1ZGU9aG91cmx5LG1pbnV0ZWx5LGFsZXJ0cyZhcHBpZD05ZTRiOTU4NzYyNTNkYzMzMWIxMjEwMzMxYzJmZDVkNyZ1bml0cz0ke3VuaXRzfWAsXG4gICAgICAgIHttb2RlOiAnY29ycyd9KTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAgICAgY29uc3QgcHJlc3N1cmUgPSB1bml0cyA9PSBcIm1ldHJpY1wiID8gZGF0YS5jdXJyZW50LnByZXNzdXJlIDogKGRhdGEuY3VycmVudC5wcmVzc3VyZSAqIDAuMDE0NTAzOCkudG9GaXhlZCgxKTtcbiAgICAgICAgY29uc3QgY3VycmVudFRlbXBlcmF0dXJlID0gTWF0aC50cnVuYyhkYXRhLmN1cnJlbnQudGVtcCk7XG4gICAgICAgIGxldCBjdXJyZW50V2VhdGhlclR5cGUgPSBkYXRhLmN1cnJlbnQud2VhdGhlclswXS5tYWluO1xuXG4gICAgICAgIGlmIChjdXJyZW50V2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwiY2xlYXJcIil7XG4gICAgICAgICAgICBpZiAodW5pdHMgPT0gXCJtZXRyaWNcIiAmJiBjdXJyZW50VGVtcGVyYXR1cmUgPiAyOCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFdlYXRoZXJUeXBlKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50V2VhdGhlclR5cGUgPSBcIlN1bm55XCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYodW5pdHMgPT0gXCJpbXBlcmlhbFwiICYmIGN1cnJlbnRUZW1wZXJhdHVyZSA+IDgyKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50V2VhdGhlclR5cGUpXG4gICAgICAgICAgICAgICAgY3VycmVudFdlYXRoZXJUeXBlID0gXCJTdW5ueVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaHRtbEVsZW1lbnRzLmN1cnJlbnRUZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IE1hdGgudHJ1bmMoZGF0YS5jdXJyZW50LnRlbXApLnRvU3RyaW5nKCkgKyBcIsKwXCIgKyB1bml0c1Zhci5kZWdyZWVzO1xuICAgICAgICBodG1sRWxlbWVudHMuY3VycmVudFdlYXRoZXJUeXBlLnRleHRDb250ZW50ID0gXCJbIFwiICsgY3VycmVudFdlYXRoZXJUeXBlLnRvU3RyaW5nKCkgKyBcIiBdXCI7XG4gICAgICAgIGh0bWxFbGVtZW50cy5jdXJyZW50RmVlbHNMaWtlLnRleHRDb250ZW50ID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQuZmVlbHNfbGlrZSkudG9TdHJpbmcoKSArIFwiwrBcIiArIHVuaXRzVmFyLmRlZ3JlZXM7XG4gICAgICAgIGh0bWxFbGVtZW50cy5jdXJyZW50SHVtaWRpdHkudGV4dENvbnRlbnQgPSBkYXRhLmN1cnJlbnQuaHVtaWRpdHkudG9TdHJpbmcoKSArIHVuaXRzVmFyLmh1bWlkaXR5O1xuICAgICAgICBodG1sRWxlbWVudHMuY3VycmVudFByZXNzdXJlLnRleHRDb250ZW50ID0gcHJlc3N1cmUudG9TdHJpbmcoKSArIFwiIFwiICsgdW5pdHNWYXIucHJlc3N1cmU7XG4gICAgICAgIGh0bWxFbGVtZW50cy5jdXJyZW50V2luZFNwZWVkLnRleHRDb250ZW50ID0gKGRhdGEuY3VycmVudC53aW5kX3NwZWVkLnRvRml4ZWQoMSkpLnRvU3RyaW5nKCkgKyBcIiBcIiArIHVuaXRzVmFyLnNwZWVkO1xuXG5cbiAgICAgICAgaWYgKGN1cnJlbnRXZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJ0aHVuZGVyc3Rvcm1cIil7XG4gICAgICAgICAgICBodG1sRWxlbWVudHMubWFpbkltYWdlLnNyYyA9IFwiLi9pbWFnZXMvU3Rvcm0uZ2lmXCI7XG4gICAgICAgIH0gZWxzZSBpZihjdXJyZW50V2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwiZHJpenpsZVwiIHx8IGN1cnJlbnRXZWF0aGVyVHlwZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJyYWluXCIpe1xuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLm1haW5JbWFnZS5zcmMgPSBcIi4vaW1hZ2VzL1JhaW4uZ2lmXCI7XG4gICAgICAgIH0gZWxzZSBpZihjdXJyZW50V2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwic25vd1wiKXtcbiAgICAgICAgICAgIGh0bWxFbGVtZW50cy5tYWluSW1hZ2Uuc3JjID0gXCIuL2ltYWdlcy9Tbm93LmdpZlwiO1xuICAgICAgICB9IGVsc2UgaWYoY3VycmVudFdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcImNsZWFyXCIpe1xuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLm1haW5JbWFnZS5zcmMgPSBcIi4vaW1hZ2VzL0NsZWFyLmdpZlwiO1xuICAgICAgICB9IGVsc2UgaWYoY3VycmVudFdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcInN1bm55XCIpe1xuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLm1haW5JbWFnZS5zcmMgPSBcIi4vaW1hZ2VzL1N1bm55LmdpZlwiO1xuICAgICAgICB9IGVsc2UgaWYoY3VycmVudFdlYXRoZXJUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSBcImNsb3Vkc1wiKXtcbiAgICAgICAgICAgIGh0bWxFbGVtZW50cy5tYWluSW1hZ2Uuc3JjID0gXCIuL2ltYWdlcy9DbG91ZHkuZ2lmXCI7XG4gICAgICAgIH0gZWxzZSBpZihjdXJyZW50V2VhdGhlclR5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09IFwidG9ybmFkb1wiKXtcbiAgICAgICAgICAgIGh0bWxFbGVtZW50cy5tYWluSW1hZ2Uuc3JjID0gXCIuL2ltYWdlcy9Ub3JuYWRvLmdpZlwiO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICBodG1sRWxlbWVudHMubWFpbkltYWdlLnNyYyA9IFwiLi9pbWFnZXMvRGVmYXVsdC5naWZcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRUZW1wZXJhdHVyZSk7ICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50V2VhdGhlclR5cGUpO1xuXG4gICAgICAgIGNvbnN0IHVuaXhUaW1lU3RhbXAgPSBkYXRhLmN1cnJlbnQuZHQ7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IGRhdGEudGltZXpvbmVfb2Zmc2V0OyBcbiAgICAgICAgdXBkYXRlRGF0ZSh1bml4VGltZVN0YW1wLCBvZmZzZXQpO1xuXG5cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgbGV0IGN1cnJlbnREYXlOdW1iZXIgPSBuZXcgRGF0ZSgodW5peFRpbWVTdGFtcCArIG9mZnNldCkgKiAxMDAwKS5nZXREYXkoKTtcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudERheU51bWJlcik7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNzsgaSsrKXtcbiAgICAgICAgICAgIGxldCBuZXh0RGF5TnVtYmVyID0gKGN1cnJlbnREYXlOdW1iZXIgKyBpKSAlIDc7XG4gICAgICAgICAgICBsZXQgZGF5TmFtZSA9IGdldERheU9mV2VlayhuZXh0RGF5TnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5leHREYXlOdW1iZXIpO1xuICAgICAgICAgICAgbGV0IGljb25DbGFzcyA9IGdldEljb25DbGFzcyhkYXRhLmRhaWx5W2ldLndlYXRoZXJbMF0ubWFpbi50b1N0cmluZygpKTtcblxuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLmZvcmVjYXN0RGF5RWxlbWVudHNbaW5kZXhdLnRleHRDb250ZW50ID0gZGF5TmFtZTtcbiAgICAgICAgICAgIGh0bWxFbGVtZW50cy5mb3JlY2FzdE1heFRlbXBFbGVtZW50c1tpbmRleF0udGV4dENvbnRlbnQgPSBNYXRoLnRydW5jKGRhdGEuZGFpbHlbaV0udGVtcC5tYXgpLnRvU3RyaW5nKCkgKyBcIsKwXCIgKyB1bml0c1Zhci5kZWdyZWVzO1xuICAgICAgICAgICAgaHRtbEVsZW1lbnRzLmZvcmVjYXN0TWluVGVtcEVsZW1lbnRzW2luZGV4XS50ZXh0Q29udGVudCA9IE1hdGgudHJ1bmMoZGF0YS5kYWlseVtpXS50ZW1wLm1pbikudG9TdHJpbmcoKSArIFwiwrBcIiArIHVuaXRzVmFyLmRlZ3JlZXM7XG4gICAgICAgICAgICBodG1sRWxlbWVudHMuZm9yZWNhc3RJY29uc1tpbmRleF0uY2xhc3NOYW1lID0gXCJcIjtcbiAgICAgICAgICAgIGh0bWxFbGVtZW50cy5mb3JlY2FzdEljb25zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS0yeFwiLCBcImZvcmVjYXN0LWljb25cIiwgaWNvbkNsYXNzKTtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cblxuICAgICAgICBodG1sRWxlbWVudHMuc2VhcmNoQm94LnZhbHVlID0gXCJcIjtcbiAgICAgICAgaHRtbEVsZW1lbnRzLnNlYXJjaEJveC5ibHVyKCk7XG4gICAgICAgIGh0bWxFbGVtZW50cy5jaXR5RWxlbWVudC5mb2N1cygpO1xuICAgIH0gY2F0Y2goZXJyb3Ipe1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgaHRtbEVsZW1lbnRzIH0gZnJvbSBcIi4vaHRtbEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBnZXREYXlPZldlZWsgfSBmcm9tIFwiLi9nZXREYXlPZldlZWtcIjtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZURhdGUgPSAodW5peFRpbWVTdGFtcCwgb2Zmc2V0KSA9PiB7XG4gICAgbGV0IGNvcnJlY3RUaW1lU3RhbXAgPSB1bml4VGltZVN0YW1wICsgKG9mZnNldCk7XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShjb3JyZWN0VGltZVN0YW1wICogMTAwMCk7XG4gICAgY29uc29sZS5sb2coZGF0ZSk7XG4gICAgbGV0IGRheSA9IGdldERheU9mV2VlayhkYXRlLmdldFVUQ0RheSgpKTtcbiAgICBcbiAgICBjb25zdCBhbU9yUG0gPSBkYXRlLmdldFVUQ0hvdXJzKCkgPj0gMTIgPyBcIlBNXCIgOiBcIkFNXCI7XG4gICAgaHRtbEVsZW1lbnRzLmRhdGVPYmplY3QudGV4dENvbnRlbnQgPSBkYXkgKyBcIiwgXCIgKyAoZGF0ZS5nZXRVVENNb250aCgpICsgMSkgKyBcIi9cIiArIGRhdGUuZ2V0VVRDRGF0ZSgpICsgXCIvXCIgKyBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgaHRtbEVsZW1lbnRzLnRpbWVPYmplY3QudGV4dENvbnRlbnQgPSBkYXRlLmdldFVUQ0hvdXJzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpICsgXCI6XCIgKyBkYXRlLmdldFVUQ01pbnV0ZXMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJykgKyBcIiBcIiArIGFtT3JQbTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuaW1wb3J0IHsgYWRkR29vZ2xlUGxhY2VzQVBJIH0gZnJvbSBcIi4vYXBwL2FkZEdvb2dsZVBsYWNlc0FQSVwiXG5pbXBvcnQgeyBhZGRFdmVudExpc3RlbmVyVG9TZWFyY2hCYXIgfSBmcm9tIFwiLi9hcHAvYWRkRXZlbnRMaXN0ZW5lclRvU2VhcmNoQmFyXCI7XG5cblxuZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG5hZGRFdmVudExpc3RlbmVyVG9TZWFyY2hCYXIoKTtcbmFkZEdvb2dsZVBsYWNlc0FQSSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==