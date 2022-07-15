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
        console.log("string")
    } else if (isNaN(location) == false){
        response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${location}&appid=9e4b95876253dc331b1210331c2fd5d7`,
        {mode: 'cors'});
        console.log("number")
    }
    const locationData = await response.json();
    console.log(locationData);
    } catch(error){
        console.log(error);
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



(0,_app_directGeocodingCall__WEBPACK_IMPORTED_MODULE_1__.directGeocodingCall)("oeofkkgldn");
_app_CurrentDate__WEBPACK_IMPORTED_MODULE_0__.CurrentDate.updateDate();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wNDgyYmVkOWQ1NThiOTVhYTMxMS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEM7O0FBRXZDO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSw4RUFBbUM7QUFDM0MsUUFBUSw4RUFBbUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDckNNO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGLFNBQVM7QUFDMUYsV0FBVyxhQUFhO0FBQ3hCO0FBQ0EsTUFBTTtBQUNOLGdGQUFnRixTQUFTO0FBQ3pGLFNBQVMsYUFBYTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEJPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDTEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOZ0Q7QUFDZ0I7O0FBRWhFLDZFQUFtQjtBQUNuQixvRUFBc0IsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwcC9DdXJyZW50RGF0ZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcHAvZGlyZWN0R2VvY29kaW5nQ2FsbC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcHAvaHRtbEVsZW1lbnRzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbEVsZW1lbnRzIH0gZnJvbSBcIi4vaHRtbEVsZW1lbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBDdXJyZW50RGF0ZSA9ICgoKSA9PiB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGRheTtcblxuICAgIGNvbnN0IHVwZGF0ZURhdGUgPSAoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZGF0ZS5nZXREYXkoKSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGRheSA9IFwiU3VuZGF5XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgZGF5ID0gXCJNb25kYXlcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBkYXkgPSBcIlR1ZXNkYXlcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBkYXkgPSBcIldlZG5lc2RheVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGRheSA9IFwiVGh1cnNkYXlcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICBkYXkgPSBcIkZyaWRheVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGRheSA9IFwiU2F0dXJkYXlcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBodG1sRWxlbWVudHMuZGF0ZU9iamVjdC50ZXh0Q29udGVudCA9IGRheSArIFwiLCBcIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICsgZGF0ZS5nZXREYXRlKCkgKyBcIi9cIiArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgaHRtbEVsZW1lbnRzLnRpbWVPYmplY3QudGV4dENvbnRlbnQgPSBkYXRlLmdldEhvdXJzKCkgKyBcIjpcIiArIFN0cmluZyhkYXRlLmdldE1pbnV0ZXMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXBkYXRlRGF0ZSxcbiAgICB9XG5cbn0pKCk7IiwiXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlyZWN0R2VvY29kaW5nQ2FsbCAobG9jYXRpb24pe1xuICAgIGxldCByZXNwb25zZSA9IG51bGw7XG4gICAgdHJ5e1xuICAgIGlmIChpc05hTihsb2NhdGlvbikpe1xuICAgICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7bG9jYXRpb259JmxpbWl0PTUmYXBwaWQ9OWU0Yjk1ODc2MjUzZGMzMzFiMTIxMDMzMWMyZmQ1ZDdgXG4gICAgICAgICwge21vZGU6ICdjb3JzJ30pO1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0cmluZ1wiKVxuICAgIH0gZWxzZSBpZiAoaXNOYU4obG9jYXRpb24pID09IGZhbHNlKXtcbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC96aXA/emlwPSR7bG9jYXRpb259JmFwcGlkPTllNGI5NTg3NjI1M2RjMzMxYjEyMTAzMzFjMmZkNWQ3YCxcbiAgICAgICAge21vZGU6ICdjb3JzJ30pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm51bWJlclwiKVxuICAgIH1cbiAgICBjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2cobG9jYXRpb25EYXRhKTtcbiAgICB9IGNhdGNoKGVycm9yKXtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbn0iLCJleHBvcnQgY29uc3QgaHRtbEVsZW1lbnRzID0ge1xuICAgIGRhdGVPYmplY3Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZVwiKSxcbiAgICB0aW1lT2JqZWN0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtdGltZVwiKSxcbiAgICBtZXRyaWM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWV0cmljXCIpLFxuICAgIGltcGVyaWFsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltcGVyaWFsXCIpLFxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ3VycmVudERhdGUgfSBmcm9tIFwiLi9hcHAvQ3VycmVudERhdGVcIjtcbmltcG9ydCB7IGRpcmVjdEdlb2NvZGluZ0NhbGwgfSBmcm9tIFwiLi9hcHAvZGlyZWN0R2VvY29kaW5nQ2FsbFwiO1xuXG5kaXJlY3RHZW9jb2RpbmdDYWxsKFwib2VvZmtrZ2xkblwiKTtcbkN1cnJlbnREYXRlLnVwZGF0ZURhdGUoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=