import { getCityName } from "./getCityName";
import { openWeatherMapCall } from "./openWeatherMapCall";

export function addGooglePlacesAPI (){
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
            getCityName(latitude, longitude, place.formatted_address.toString());
            openWeatherMapCall(latitude, longitude, "metric");
        });

    }
    document.getElementsByTagName("head")[0].appendChild(tag);


}
