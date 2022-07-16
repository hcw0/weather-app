import { htmlElements } from "./htmlElements";

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

        let pressure = units == "metric" ? data.current.pressure : (data.current.pressure * 0.0145038).toFixed(1);
        
        htmlElements.currentTemperature.textContent = Math.trunc(data.current.temp).toString() + "°" + unitsVar.degrees;
        htmlElements.currentWeatherType.textContent = "[ " + data.current.weather[0].main.toString() + " ]";
        htmlElements.currentFeelsLike.textContent = Math.round(data.current.feels_like).toString() + "°" + unitsVar.degrees;
        htmlElements.currentHumidity.textContent = data.current.humidity.toString() + unitsVar.humidity;
        htmlElements.currentPressure.textContent = pressure.toString() + " " + unitsVar.pressure;
        htmlElements.currentWindSpeed.textContent = (data.current.wind_speed.toFixed(1)).toString() + " " + unitsVar.speed;

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