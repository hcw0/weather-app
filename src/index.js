
import { addGooglePlacesAPI } from "./app/addGooglePlacesAPI"
import { addEventListenerToSearchBar } from "./app/addEventListenerToSearchBar";


document.activeElement.blur();
addEventListenerToSearchBar();
addGooglePlacesAPI();