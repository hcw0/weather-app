

export const openWeatherMapCall = async (latitude, longitude) => {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,hourly,minutely,alerts&appid=9e4b95876253dc331b1210331c2fd5d7&units=metric`,
        {mode: 'cors'});
        const data = await response.json();
        console.log(data);
    } catch(error){
        console.log(error);
    }

}