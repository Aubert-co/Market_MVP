

export type DateStrings = "oneweek" | "onemonth" | "fivedays"
const stringDates:DateStrings[] = ["oneweek","onemonth","fivedays"]
export const now = new Date();

export const oneWeekFromNow: Date = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

export const oneMonthFromNow: Date = new Date(now);
oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

export const fiveDaysFromNow: Date = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);


export const convertStringToDate = (date:DateStrings):Date=>{
    if(date === 'oneweek'){
        return oneWeekFromNow
    }
    if(date === 'onemonth'){
        return oneMonthFromNow
    }
    return fiveDaysFromNow
}

export const validDates = (value:any):boolean=>{
        if(!stringDates.includes(value)){
            return false
        }
        return true
    }