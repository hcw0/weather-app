import { htmlElements } from "./htmlElements";

export const updateDate = (unixTimeStamp, offsetSeconds) => {
    const correctTimeStamp = unixTimeStamp + (offsetSeconds / 3600); //convert seconds to hour offset
    const date = new Date(correctTimeStamp * 1000);
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
        case 6:
            day = "Saturday";
                break;
    }

    const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
    htmlElements.dateObject.textContent = day + ", " + date.toLocaleDateString("en-US");
    htmlElements.timeObject.textContent = date.getHours() + ":" + date.getMinutes() + " " + amOrPm;
}