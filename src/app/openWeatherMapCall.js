import { htmlElements } from "./htmlElements";
import { updateDate } from "./updateDate";


export const openWeatherMapCall = async (latitude, longitude, units) => {
    try{
        const unitsVar = {
            degrees: units == "metric" ? "C" : "F",
            humidity: "%",
            pressure: units == "metric" ? "hPa" : "psi",
            speed: units == "metric" ? "m/s" : "mph",
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=9e4b95876253dc331b1210331c2fd5d7&units=${units}`,
        {mode: 'cors'});
        const data = await response.json();
        console.log(data);

        const pressure = units == "metric" ? data.current.pressure : (data.current.pressure * 0.0145038).toFixed(1);
        const currentTemperature = Math.trunc(data.current.temp);
        let currentWeatherType = data.current.weather[0].main;

        if (currentWeatherType.toString().toLowerCase() == "clear"){
            if (units == "metric" && currentTemperature > 28){
                console.log(currentWeatherType);
                currentWeatherType = "Sunny";
            } else if(units == "imperial" && currentTemperature > 82){
                console.log(currentWeatherType)
                currentWeatherType = "Sunny";
            }
        }

        htmlElements.currentTemperature.textContent = Math.trunc(data.current.temp).toString() + "°" + unitsVar.degrees;
        htmlElements.currentWeatherType.textContent = "[ " + currentWeatherType.toString() + " ]";
        htmlElements.currentFeelsLike.textContent = Math.round(data.current.feels_like).toString() + "°" + unitsVar.degrees;
        htmlElements.currentHumidity.textContent = data.current.humidity.toString() + unitsVar.humidity;
        htmlElements.currentPressure.textContent = pressure.toString() + " " + unitsVar.pressure;
        htmlElements.currentWindSpeed.textContent = (data.current.wind_speed.toFixed(1)).toString() + " " + unitsVar.speed;


        if (currentWeatherType.toString().toLowerCase() == "thunderstorm"){
            htmlElements.mainImage.src = "./images/Storm.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "drizzle" || currentWeatherType.toString().toLowerCase() == "rain"){
            htmlElements.mainImage.src = "./images/Rain.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "snow"){
            htmlElements.mainImage.src = "./images/Snow.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "clear"){
            htmlElements.mainImage.src = "./images/Clear.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "sunny"){
            htmlElements.mainImage.src = "./images/Sunny.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "clouds"){
            htmlElements.mainImage.src = "./images/Cloudy.gif";
        } else if(currentWeatherType.toString().toLowerCase() == "tornado"){
            htmlElements.mainImage.src = "./images/Tornado.gif";
        } else{
            htmlElements.mainImage.src = "./images/Default.gif";
        }

        console.log(currentTemperature);    
        console.log(currentWeatherType);

        const unixTimeStamp = data.current.dt;
        const offset = data.timezone_offset;
        updateDate(unixTimeStamp, offset);


        data.daily.forEach(day => {
            var dayname = new Date(day.dt * 1000).toLocaleDateString("en", {
                weekday: "long",
            });
            console.log(dayname);
            
        })
    } catch(error){
        console.log(error);
    }

}