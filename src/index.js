import { CurrentDate } from "./app/CurrentDate";
import { directGeocodingCall } from "./app/directGeocodingCall";
import { addGooglePlacesAPI } from "./app/addGooglePlacesAPI"

addGooglePlacesAPI();

directGeocodingCall("City of london");
CurrentDate.updateDate();