"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validDates = exports.convertStringToDate = exports.fiveDaysFromNow = exports.oneMonthFromNow = exports.oneWeekFromNow = exports.now = void 0;
const stringDates = ["oneweek", "onemonth", "fivedays"];
exports.now = new Date();
exports.oneWeekFromNow = new Date(exports.now.getTime() + 7 * 24 * 60 * 60 * 1000);
exports.oneMonthFromNow = new Date(exports.now);
exports.oneMonthFromNow.setMonth(exports.oneMonthFromNow.getMonth() + 1);
exports.fiveDaysFromNow = new Date(exports.now.getTime() + 5 * 24 * 60 * 60 * 1000);
const convertStringToDate = (date) => {
    if (date === 'oneweek') {
        return exports.oneWeekFromNow;
    }
    if (date === 'onemonth') {
        return exports.oneMonthFromNow;
    }
    return exports.fiveDaysFromNow;
};
exports.convertStringToDate = convertStringToDate;
const validDates = (value) => {
    if (!stringDates.includes(value)) {
        return false;
    }
    return true;
};
exports.validDates = validDates;
