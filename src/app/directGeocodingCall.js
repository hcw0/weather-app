
export async function directGeocodingCall (location){
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