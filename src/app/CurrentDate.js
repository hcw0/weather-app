import { htmlElements } from "./htmlElements";

export const CurrentDate = (() => {
    const date = new Date();
    let day;

    const updateDate = () => {
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

        htmlElements.dateObject.textContent = day + ", " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        htmlElements.timeObject.textContent = date.getHours() + ":" + String(date.getMinutes()).padStart(2, '0');
    }
    return {
        updateDate,
    }

})();