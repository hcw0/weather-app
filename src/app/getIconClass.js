

export function getIconClass(weatherType){
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