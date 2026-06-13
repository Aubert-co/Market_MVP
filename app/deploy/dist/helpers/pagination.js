"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcSkipPages = exports.pagination = void 0;
const pagination = ({ totalItems, page, limit }) => {
    const totalPages = Math.ceil(totalItems / limit);
    if (page > totalPages) {
        page = totalPages;
    }
    const skip = (page - 1) * limit;
    return {
        currentPage: page,
        skip,
        totalPages
    };
};
exports.pagination = pagination;
const calcSkipPages = (page, limit) => (page - 1) * limit;
exports.calcSkipPages = calcSkipPages;
