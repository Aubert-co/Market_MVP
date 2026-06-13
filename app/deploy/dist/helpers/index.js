"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidString = exports.getInteger = exports.getPage = exports.getString = exports.roundTottaly = exports.orderBy = exports.categories = void 0;
const checkIsValid_1 = require("./checkIsValid");
exports.categories = [
    "Roupas",
    "Eletrônicos",
    "Livros",
    "Brinquedos",
    "Beleza",
    "Esporte",
    "Automotivo",
    "Cozinha",
    "Celulares",
    "Informática",
    "Jardim",
    "Petshop",
    "Mercearia",
    "Moda",
    "Acessórios"
];
exports.orderBy = ["asc", "desc"];
const roundTottaly = (value, decimals = 2) => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
exports.roundTottaly = roundTottaly;
const getString = (value) => typeof value === "string" ? value : undefined;
exports.getString = getString;
const getPage = (value) => {
    if (!(0, checkIsValid_1.checkIsAValidInteger)(value)) {
        return 1;
    }
    return Number(value);
};
exports.getPage = getPage;
const getInteger = (value) => {
    if ((0, checkIsValid_1.checkIsAValidInteger)(value)) {
        return Number(value);
    }
    return undefined;
};
exports.getInteger = getInteger;
const getValidString = (value) => {
    if ((0, checkIsValid_1.checkisAValidString)(value) && typeof value === "string")
        return value;
    return undefined;
};
exports.getValidString = getValidString;
