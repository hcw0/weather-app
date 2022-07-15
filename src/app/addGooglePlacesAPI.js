
export function addGooglePlacesAPI (){
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
