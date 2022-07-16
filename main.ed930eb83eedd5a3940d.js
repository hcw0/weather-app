(()=>{"use strict";const e={dateObject:document.querySelector(".date"),timeObject:document.querySelector(".current-time"),metric:document.querySelector(".metric"),imperial:document.querySelector(".imperial"),searchBar:document.querySelector(".search-bar"),searchBox:document.querySelector(".search-box"),magnifyingGlass:document.querySelector(".fa-magnifying-glass"),cityElement:document.querySelector(".city-element")},t=(()=>{const t=new Date;let a;return{updateDate:()=>{switch(t.getDay()){case 0:a="Sunday";break;case 1:a="Monday";break;case 2:a="Tuesday";break;case 3:a="Wednesday";break;case 4:a="Thursday";break;case 5:a="Friday";break;case 6:a="Saturday"}e.dateObject.textContent=a+", "+(t.getMonth()+1)+"/"+t.getDate()+"/"+t.getFullYear(),e.timeObject.textContent=t.getHours()+":"+String(t.getMinutes()).padStart(2,"0")}}})();document.activeElement.blur(),e.searchBar.addEventListener("mouseover",(()=>{e.searchBox.focus()})),e.searchBox.addEventListener("input",(()=>{e.searchBar.classList.add("search-bar-hover"),e.searchBox.classList.add("search-box-hover"),e.magnifyingGlass.classList.add("fa-magnifying-glass-hover")})),e.searchBox.addEventListener("focusout",(()=>{e.searchBar.classList.remove("search-bar-hover"),e.searchBox.classList.remove("search-box-hover"),e.magnifyingGlass.classList.remove("fa-magnifying-glass-hover"),document.querySelector(".pac-container").style.display="none",e.searchBox.value=""})),function(){let t=document.createElement("script");t.setAttribute("defer",""),t.setAttribute("async",""),t.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB0s970PqYGaxnHPxFOZYzeJ2RMUB2Pej0&libraries=places&callback=initMap",window.initMap=function(){let t=document.getElementById("search-bar");let a=new google.maps.places.Autocomplete(t);a.addListener("place_changed",(()=>{const t=a.getPlace();if(!t.geometry||!t.geometry.location)return;const o=t.geometry.location.lat(),r=t.geometry.location.lng();console.log(o+" "+r),function(t,a){let o=new google.maps.Geocoder;const r={lat:parseFloat(t),lng:parseFloat(a)};o.geocode({location:r},(function(t,a){if(a!==google.maps.GeocoderStatus.OK&&alert(a),a==google.maps.GeocoderStatus.OK){let[a,o,r]=["","",""];const c=t[0].address_components;c.forEach((e=>{e.types.forEach((t=>{"sublocality"==t.toLowerCase()?a=e.long_name.toString():"locality"==t.toLowerCase()?o=e.long_name.toString():"country"==t.toLowerCase()&&(r=e.long_name.toString())}))})),console.log(c),""!=a&&""!=r?e.cityElement.textContent=`${a}, ${r}`:""!=o&&""!=r?e.cityElement.textContent=`${o}, ${r}`:""!=r&&(e.cityElement.textContent=`${r}`)}}))}(o,r)}))},document.getElementsByTagName("head")[0].appendChild(t)}(),t.updateDate()})();