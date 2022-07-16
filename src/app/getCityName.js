import { htmlElements } from "./htmlElements";
export function getCityName(latitude, longitude) {
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
            
            console.log(firstResult);

            if (sublocality != "" && country != ""){
                htmlElements.cityElement.textContent = `${sublocality}, ${country}`;
            } else if (locality != "" && country != ""){
                htmlElements.cityElement.textContent = `${locality}, ${country}`;
            } else if (country != ""){
                htmlElements.cityElement.textContent = `${country}`;
            }
        }
    });
}