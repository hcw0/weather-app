//Change the time display to be the same as the one from the client's OS when the website loads
const date = new Date();
const dateObject = document.querySelector(".date");
const timeObject = document.querySelector(".current-time");
let day;

switch (date.getDay()) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 2:
        day = "Saturday";
            break;
}

dateObject.textContent = day + ", " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
timeObject.textContent = date.getHours() + ":" + String(date.getMinutes()).padStart(2, '0');




const metric = document.querySelector(".metric");
const imperial = document.querySelector(".imperial");

metric.addEventListener("click", () => {
    console.log("Hello")
});

imperial.addEventListener("click", () => {
    console.log("Bye")
});

console.log(date);
