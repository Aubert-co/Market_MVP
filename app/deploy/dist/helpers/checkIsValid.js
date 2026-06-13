"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrderBy = exports.checkIsAValidCategory = exports.checkisValidEmail = exports.checkisAValidString = exports.checkIsAValidInteger = exports.checkIsAValidNumber = void 0;
exports.checkIsValidStatus = checkIsValidStatus;
const index_1 = require("./index");
const checkIsAValidNumber = (value) => {
    if (typeof value === 'symbol')
        return false;
    if (typeof value === 'boolean')
        return false;
    if (Array.isArray(value))
        return false;
    const number = Number(value);
    if (value === null ||
        value === undefined ||
        value === '' ||
        isNaN(number) ||
        number <= 0) {
        return false;
    }
    const isValidFormat = /^[0-9]+(\.[0-9]+)?$/.test(String(value));
    if (!isValidFormat)
        return false;
    return true;
};
exports.checkIsAValidNumber = checkIsAValidNumber;
const checkIsAValidInteger = (value) => {
    if (!(0, exports.checkIsAValidNumber)(value))
        return false;
    const num = Number(value);
    if (!Number.isInteger(num))
        return false;
    if (num <= 0)
        return false;
    return true;
};
exports.checkIsAValidInteger = checkIsAValidInteger;
const checkisAValidString = (value, maxLength = 15) => {
    if (!value || typeof value !== 'string')
        return false;
    if (value.length <= 4 || value.length >= maxLength)
        return false;
    return true;
};
exports.checkisAValidString = checkisAValidString;
const checkisValidEmail = (email) => {
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return emailRegex.test(email);
};
exports.checkisValidEmail = checkisValidEmail;
const normalizeString = (str) => str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const checkIsAValidCategory = (category) => {
    const normalizedInput = normalizeString(category);
    return index_1.categories.some(cat => normalizeString(cat) === normalizedInput);
};
exports.checkIsAValidCategory = checkIsAValidCategory;
function checkIsValidStatus(value) {
    return typeof value === "string" && ["PENDING", "PAID", "CANCELED"].includes(value);
}
const checkOrderBy = (value) => {
    if (!value || typeof value !== 'string')
        return false;
    return index_1.orderBy.includes(value.toLowerCase());
};
exports.checkOrderBy = checkOrderBy;
