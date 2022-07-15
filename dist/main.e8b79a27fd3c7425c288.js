/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/CurrentDate.js":
/*!********************************!*\
  !*** ./src/app/CurrentDate.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CurrentDate": () => (/* binding */ CurrentDate)
/* harmony export */ });
/* harmony import */ var _htmlElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlElements */ "./src/app/htmlElements.js");


const CurrentDate = (() => {
    const date = new Date();
    let day;

    const updateDate = () => {
        switch (date.getDay()) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 2:
                day = "Saturday";
                    break;
        }

        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.dateObject.textContent = day + ", " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        _htmlElements__WEBPACK_IMPORTED_MODULE_0__.htmlElements.timeObject.textContent = date.getHours() + ":" + String(date.getMinutes()).padStart(2, '0');
    }
    return {
        updateDate,
    }

})();

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

function addGooglePlacesAPI (){
    let tag = document.createElement("script");
    tag.setAttribute('defer','');
    tag.setAttribute('async','');
    tag.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyApAPMItRZxLtlZossNyVNFCMx407u4J0E&libraries=places&callback=initMap";
    window.initMap = function() {
        let input = document.getElementById("search-bar");
        const options = {
            types: ['cities'],
            fields: ["address_components", "geometry"],
        }
        let autocomplete = new google.maps.places.Autocomplete(input, options);
        
        // autocomplete.addListener("place_changed", () => {
        //     const place = autocomplete.getPlace();
        //     if (!place.geometry || !place.geometry.location){
        //         return;
        //     }
        // })
    }
    document.getElementsByTagName("head")[0].appendChild(tag);


}


/***/ }),

/***/ "./src/app/directGeocodingCall.js":
/*!****************************************!*\
  !*** ./src/app/directGeocodingCall.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "directGeocodingCall": () => (/* binding */ directGeocodingCall)
/* harmony export */ });

async function directGeocodingCall (location){
    let response = null;
    try{
    if (isNaN(location)){
        response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=9e4b95876253dc331b1210331c2fd5d7`
        , {mode: 'cors'});
    } else if (isNaN(location) == false){
        response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${location}&appid=9e4b95876253dc331b1210331c2fd5d7`,
        {mode: 'cors'});
    }
    const locationData = await response.json();
    console.log(locationData);
    } catch(error){
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
/* harmony import */ var _app_CurrentDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/CurrentDate */ "./src/app/CurrentDate.js");
/* harmony import */ var _app_directGeocodingCall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/directGeocodingCall */ "./src/app/directGeocodingCall.js");
/* harmony import */ var _app_addGooglePlacesAPI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/addGooglePlacesAPI */ "./src/app/addGooglePlacesAPI.js");




(0,_app_addGooglePlacesAPI__WEBPACK_IMPORTED_MODULE_2__.addGooglePlacesAPI)();

(0,_app_directGeocodingCall__WEBPACK_IMPORTED_MODULE_1__.directGeocodingCall)("City of london");
_app_CurrentDate__WEBPACK_IMPORTED_MODULE_0__.CurrentDate.updateDate();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5lOGI3OWEyN2ZkM2M3NDI1YzI4OC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEM7O0FBRXZDO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSw4RUFBbUM7QUFDM0MsUUFBUSw4RUFBbUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDckNNO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixTQUFTO0FBQzFGLFdBQVcsYUFBYTtBQUN4QixNQUFNO0FBQ04sZ0ZBQWdGLFNBQVM7QUFDekYsU0FBUyxhQUFhO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2ZPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDTEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTmdEO0FBQ2dCO0FBQ0g7O0FBRTdELDJFQUFrQjs7QUFFbEIsNkVBQW1CO0FBQ25CLG9FQUFzQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwL0N1cnJlbnREYXRlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwcC9hZGRHb29nbGVQbGFjZXNBUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwL2RpcmVjdEdlb2NvZGluZ0NhbGwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwL2h0bWxFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWxFbGVtZW50cyB9IGZyb20gXCIuL2h0bWxFbGVtZW50c1wiO1xuXG5leHBvcnQgY29uc3QgQ3VycmVudERhdGUgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBkYXk7XG5cbiAgICBjb25zdCB1cGRhdGVEYXRlID0gKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGRhdGUuZ2V0RGF5KCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBkYXkgPSBcIlN1bmRheVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGRheSA9IFwiTW9uZGF5XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgZGF5ID0gXCJUdWVzZGF5XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgZGF5ID0gXCJXZWRuZXNkYXlcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBkYXkgPSBcIlRodXJzZGF5XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgZGF5ID0gXCJGcmlkYXlcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBkYXkgPSBcIlNhdHVyZGF5XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaHRtbEVsZW1lbnRzLmRhdGVPYmplY3QudGV4dENvbnRlbnQgPSBkYXkgKyBcIiwgXCIgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgKyBcIi9cIiArIGRhdGUuZ2V0RGF0ZSgpICsgXCIvXCIgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGh0bWxFbGVtZW50cy50aW1lT2JqZWN0LnRleHRDb250ZW50ID0gZGF0ZS5nZXRIb3VycygpICsgXCI6XCIgKyBTdHJpbmcoZGF0ZS5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHVwZGF0ZURhdGUsXG4gICAgfVxuXG59KSgpOyIsIlxuZXhwb3J0IGZ1bmN0aW9uIGFkZEdvb2dsZVBsYWNlc0FQSSAoKXtcbiAgICBsZXQgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICB0YWcuc2V0QXR0cmlidXRlKCdkZWZlcicsJycpO1xuICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ2FzeW5jJywnJyk7XG4gICAgdGFnLnNyYyA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT1BSXphU3lBcEFQTUl0Ulp4THRsWm9zc055Vk5GQ014NDA3dTRKMEUmbGlicmFyaWVzPXBsYWNlcyZjYWxsYmFjaz1pbml0TWFwXCI7XG4gICAgd2luZG93LmluaXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYmFyXCIpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdHlwZXM6IFsnY2l0aWVzJ10sXG4gICAgICAgICAgICBmaWVsZHM6IFtcImFkZHJlc3NfY29tcG9uZW50c1wiLCBcImdlb21ldHJ5XCJdLFxuICAgICAgICB9XG4gICAgICAgIGxldCBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShpbnB1dCwgb3B0aW9ucyk7XG4gICAgICAgIFxuICAgICAgICAvLyBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoXCJwbGFjZV9jaGFuZ2VkXCIsICgpID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnN0IHBsYWNlID0gYXV0b2NvbXBsZXRlLmdldFBsYWNlKCk7XG4gICAgICAgIC8vICAgICBpZiAoIXBsYWNlLmdlb21ldHJ5IHx8ICFwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbil7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KVxuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQodGFnKTtcblxuXG59XG4iLCJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJlY3RHZW9jb2RpbmdDYWxsIChsb2NhdGlvbil7XG4gICAgbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgICB0cnl7XG4gICAgaWYgKGlzTmFOKGxvY2F0aW9uKSl7XG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtsb2NhdGlvbn0mbGltaXQ9NSZhcHBpZD05ZTRiOTU4NzYyNTNkYzMzMWIxMjEwMzMxYzJmZDVkN2BcbiAgICAgICAgLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgfSBlbHNlIGlmIChpc05hTihsb2NhdGlvbikgPT0gZmFsc2Upe1xuICAgICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL3ppcD96aXA9JHtsb2NhdGlvbn0mYXBwaWQ9OWU0Yjk1ODc2MjUzZGMzMzFiMTIxMDMzMWMyZmQ1ZDdgLFxuICAgICAgICB7bW9kZTogJ2NvcnMnfSk7XG4gICAgfVxuICAgIGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zb2xlLmxvZyhsb2NhdGlvbkRhdGEpO1xuICAgIH0gY2F0Y2goZXJyb3Ipe1xuICAgIH1cbn0iLCJleHBvcnQgY29uc3QgaHRtbEVsZW1lbnRzID0ge1xuICAgIGRhdGVPYmplY3Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZVwiKSxcbiAgICB0aW1lT2JqZWN0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtdGltZVwiKSxcbiAgICBtZXRyaWM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWV0cmljXCIpLFxuICAgIGltcGVyaWFsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltcGVyaWFsXCIpLFxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ3VycmVudERhdGUgfSBmcm9tIFwiLi9hcHAvQ3VycmVudERhdGVcIjtcbmltcG9ydCB7IGRpcmVjdEdlb2NvZGluZ0NhbGwgfSBmcm9tIFwiLi9hcHAvZGlyZWN0R2VvY29kaW5nQ2FsbFwiO1xuaW1wb3J0IHsgYWRkR29vZ2xlUGxhY2VzQVBJIH0gZnJvbSBcIi4vYXBwL2FkZEdvb2dsZVBsYWNlc0FQSVwiXG5cbmFkZEdvb2dsZVBsYWNlc0FQSSgpO1xuXG5kaXJlY3RHZW9jb2RpbmdDYWxsKFwiQ2l0eSBvZiBsb25kb25cIik7XG5DdXJyZW50RGF0ZS51cGRhdGVEYXRlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9