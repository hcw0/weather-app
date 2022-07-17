import { htmlElements } from "./htmlElements";
import { getDayOfWeek } from "./getDayOfWeek";

export const updateDate = (unixTimeStamp, offset) => {
    let correctTimeStamp = unixTimeStamp + (offset);
    let date = new Date(correctTimeStamp * 1000);
    console.log(date);
    let day = getDayOfWeek(date.getUTCDay());
    
    const amOrPm = date.getUTCHours() >= 12 ? "PM" : "AM";
    htmlElements.dateObject.textContent = day + ", " + (date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear();
    htmlElements.timeObject.textContent = date.getUTCHours().toString().padStart(2, '0') + ":" + date.getUTCMinutes().toString().padStart(2, '0') + " " + amOrPm;
}