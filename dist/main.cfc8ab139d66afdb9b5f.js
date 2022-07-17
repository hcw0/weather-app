(()=>{"use strict";const e={dateObject:document.querySelector(".date"),timeObject:document.querySelector(".current-time"),metric:document.querySelector("#metric"),imperial:document.querySelector("#imperial"),metricLabel:document.querySelector(".metric"),imperialLabel:document.querySelector(".imperial"),searchBar:document.querySelector(".search-bar"),searchBox:document.querySelector(".search-box"),magnifyingGlass:document.querySelector(".fa-magnifying-glass"),cityElement:document.querySelector(".city-element"),currentTemperature:document.querySelector(".current-temperature"),currentWeatherType:document.querySelector(".current-weather-type"),currentFeelsLike:document.querySelector(".current-feels-like"),currentHumidity:document.querySelector(".current-humidity"),currentPressure:document.querySelector(".current-pressure"),currentWindSpeed:document.querySelector(".current-wind-speed"),mainImage:document.querySelector(".main-image"),forecastDayElements:document.querySelectorAll(".day"),forecastMaxTempElements:document.querySelectorAll(".max-temp"),forecastMinTempElements:document.querySelectorAll(".min-temp"),forecastIcons:document.querySelectorAll(".forecast-icon"),currentLatitude:40.7831,currentLongitude:-73.9712};function t(e){switch(e){case 0:return"Sunday";case 1:return"Monday";case 2:return"Tuesday";case 3:return"Wednesday";case 4:return"Thursday";case 5:return"Friday";case 6:return"Saturday"}}const r=async(r,n,a)=>{try{const c={degrees:"metric"==a?"C":"F",humidity:"%",pressure:"metric"==a?"hPa":"psi",speed:"metric"==a?"m/s":"mph"},s=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${r}&lon=${n}&exclude=hourly,minutely,alerts&appid=9e4b95876253dc331b1210331c2fd5d7&units=${a}`,{mode:"cors"}),i=await s.json(),u="metric"==a?i.current.pressure:(.0145038*i.current.pressure).toFixed(1),l=Math.trunc(i.current.temp);let m=i.current.weather[0].main;"clear"==m.toString().toLowerCase()&&("metric"==a&&l>28||"imperial"==a&&l>82)&&(m="Sunny"),e.currentTemperature.textContent=Math.trunc(i.current.temp).toString()+"°"+c.degrees,e.currentWeatherType.textContent="[ "+m.toString()+" ]",e.currentFeelsLike.textContent=Math.round(i.current.feels_like).toString()+"°"+c.degrees,e.currentHumidity.textContent=i.current.humidity.toString()+c.humidity,e.currentPressure.textContent=u.toString()+" "+c.pressure,e.currentWindSpeed.textContent=i.current.wind_speed.toFixed(1).toString()+" "+c.speed,"thunderstorm"==m.toString().toLowerCase()?e.mainImage.src="./images/Storm.gif":"drizzle"==m.toString().toLowerCase()||"rain"==m.toString().toLowerCase()?e.mainImage.src="./images/Rain.gif":"snow"==m.toString().toLowerCase()?e.mainImage.src="./images/Snow.gif":"clear"==m.toString().toLowerCase()?e.mainImage.src="./images/Clear.gif":"sunny"==m.toString().toLowerCase()?e.mainImage.src="./images/Sunny.gif":"clouds"==m.toString().toLowerCase()?e.mainImage.src="./images/Cloudy.gif":"tornado"==m.toString().toLowerCase()?e.mainImage.src="./images/Tornado.gif":e.mainImage.src="./images/Default.gif";const d=i.current.dt,g=i.timezone_offset;((r,n)=>{let a=new Date(1e3*(r+n)),o=t(a.getUTCDay());const c=a.getUTCHours()>=12?"PM":"AM";e.dateObject.textContent=o+", "+(a.getUTCMonth()+1)+"/"+a.getUTCDate()+"/"+a.getUTCFullYear(),e.timeObject.textContent=a.getUTCHours().toString().padStart(2,"0")+":"+a.getUTCMinutes().toString().padStart(2,"0")+" "+c})(d,g);let y=0,p=new Date(1e3*(d+g)).getDay();for(let r=1;r<7;r++){let n=t((p+r)%7),a="thunderstorm"==(o=i.daily[r].weather[0].main.toString()).toString().toLowerCase()?"fa-cloud-bolt":"drizzle"==o.toString().toLowerCase()||"rain"==o.toString().toLowerCase()?"fa-cloud-rain":"snow"==o.toString().toLowerCase()?"fa-snowflake":"clear"==o.toString().toLowerCase()||"sunny"==o.toString().toLowerCase()?"fa-sun":"clouds"==o.toString().toLowerCase()?"fa-cloud":"tornado"==o.toString().toLowerCase()?"fa-tornado":"fa-smog";e.forecastDayElements[y].textContent=n,e.forecastMaxTempElements[y].textContent=Math.trunc(i.daily[r].temp.max).toString()+"°"+c.degrees,e.forecastMinTempElements[y].textContent=Math.trunc(i.daily[r].temp.min).toString()+"°"+c.degrees,e.forecastIcons[y].className="",e.forecastIcons[y].classList.add("fa-solid","fa-2x","forecast-icon",a),y++}e.searchBox.value="",e.searchBox.blur(),e.cityElement.focus()}catch(e){}var o};document.activeElement.blur(),e.searchBar.addEventListener("mouseover",(()=>{e.searchBox.focus()})),e.searchBar.addEventListener("keydown",(e=>{if(13==e.keyCode)return e.preventDefault(),document.querySelector(".pac-container").style.removeProperty("display"),!1})),e.searchBox.addEventListener("input",(()=>{e.searchBar.classList.add("search-bar-hover"),e.searchBox.classList.add("search-box-hover"),e.magnifyingGlass.classList.add("fa-magnifying-glass-hover")})),e.searchBox.addEventListener("focusout",(()=>{e.searchBar.classList.remove("search-bar-hover"),e.searchBox.classList.remove("search-box-hover"),e.magnifyingGlass.classList.remove("fa-magnifying-glass-hover"),document.querySelector(".pac-container").style.display="none",e.searchBox.value=""})),function(){let t=document.createElement("script");t.setAttribute("defer",""),t.setAttribute("async",""),t.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB0s970PqYGaxnHPxFOZYzeJ2RMUB2Pej0&libraries=places&callback=initMap",window.initMap=function(){let t=document.getElementById("search-bar");let n=new google.maps.places.Autocomplete(t);n.addListener("place_changed",(()=>{const t=n.getPlace();if(!t.geometry||!t.geometry.location)return;const a=t.geometry.location.lat(),o=t.geometry.location.lng();!function(t,r,n){document.querySelector(".pac-container").style.display="none";let a=new google.maps.Geocoder;const o={lat:parseFloat(t),lng:parseFloat(r)};a.geocode({location:o},(function(t,r){if(r!==google.maps.GeocoderStatus.OK&&alert(r),r==google.maps.GeocoderStatus.OK){let[r,a,o]=["","",""];t[0].address_components.forEach((e=>{e.types.forEach((t=>{"sublocality"==t.toLowerCase()?r=e.long_name.toString():"locality"==t.toLowerCase()?a=e.long_name.toString():"country"==t.toLowerCase()&&(o=e.long_name.toString())}))})),e.cityElement.textContent=""!=r&&""!=o?`${r}, ${o}`:""!=a&&""!=o?`${a}, ${o}`:""!=o?`${o}`:`${n}`}}))}(a,o,t.formatted_address.toString());let c=e.metric.checked?"metric":"imperial";r(a,o,c),e.currentLatitude=a,e.currentLongitude=o}))},document.getElementsByTagName("head")[0].appendChild(t)}(),r("40.7830603","-73.9712488","metric"),e.metricLabel.addEventListener("click",(()=>{r(e.currentLatitude,e.currentLongitude,"metric")})),e.imperialLabel.addEventListener("click",(()=>{r(e.currentLatitude,e.currentLongitude,"imperial")})),e.cityElement.textContent="Manhattan, United States"})();