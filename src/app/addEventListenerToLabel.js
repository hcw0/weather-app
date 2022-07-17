import { htmlElements } from "./htmlElements";
import { openWeatherMapCall } from "./openWeatherMapCall";
export function addEventListenerToLabel() {
    htmlElements.metricLabel.addEventListener("click", () => {
        openWeatherMapCall(htmlElements.currentLatitude, htmlElements.currentLongitude, "metric");
    });
    htmlElements.imperialLabel.addEventListener("click", () => {
        openWeatherMapCall(htmlElements.currentLatitude, htmlElements.currentLongitude, "imperial");
    });
}