
import { addGooglePlacesAPI } from "./app/addGooglePlacesAPI"
import { addEventListenerToSearchBar } from "./app/addEventListenerToSearchBar";
import { openWeatherMapCall } from "./app/openWeatherMapCall";
import { htmlElements } from "./app/htmlElements";
import { addEventListenerToLabel } from "./app/addEventListenerToLabel";

document.activeElement.blur();
addEventListenerToSearchBar();
addGooglePlacesAPI();
openWeatherMapCall("40.7830603", "-73.9712488", "metric");
addEventListenerToLabel();
htmlElements.cityElement.textContent = "Manhattan, United States";