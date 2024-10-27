import dateFormat from "dateformat";

export function parseDateTime(reg_date) {
    if(reg_date) {
        const currDate = new Date();
        const date = reg_date.date;
        const time = reg_date.time;

        currDate.setFullYear(date.year, date.month-1, date.day);
        currDate.setHours(time.hour, time.minute, time.second);

        return dateFormat(currDate, "yyyy-mm-dd HH:MM:ss");
    }
}

export function parseDateOnly(reg_date) {
    if(reg_date) {
        const currDate = new Date();
        const date = reg_date.date;

        currDate.setFullYear(date.year, date.month-1, date.day);

        return dateFormat(currDate, "yyyy-mm-dd");
    }
}
