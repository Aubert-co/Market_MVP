"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const checkIsValid_1 = require("../../../helpers/checkIsValid");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
class ReviewsController {
    constructor(reviews) {
        this.reviews = reviews;
    }
    async addReview(req, res, next) {
        const rating = req.body?.rating;
        const orderId = req.body?.order;
        const content = req.body?.content;
        try {
            if (!(0, checkIsValid_1.checkIsAValidNumber)(rating)) {
                throw new ErrorMessage_1.ErrorMessage({
                    message: "Invalid rating. It must be a valid number.",
                    status: 400,
                    service: "ReviewsController",
                    action: "addReview"
                });
            }
            if (!(0, checkIsValid_1.checkIsAValidInteger)(orderId)) {
                throw new ErrorMessage_1.ErrorMessage({
                    message: "Invalid order ID. It must be a valid number.",
                    status: 400,
                    service: "ReviewsController",
                    action: "addReview"
                });
            }
            if (!(0, checkIsValid_1.isValidString)(content, { maxLength: 150 })) {
                throw new ErrorMessage_1.ErrorMessage({
                    message: "Content must be between 5 and 150 characters long.",
                    status: 400,
                    service: "ReviewsController",
                    action: "addReview"
                });
            }
            const userId = req.user;
            await this.reviews.addReview({ content, rating, userId, orderId });
            res.status(201).send({ message: 'Sucess' });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ReviewsController = ReviewsController;
