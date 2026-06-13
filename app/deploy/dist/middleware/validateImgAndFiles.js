"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateImageAndFields = void 0;
const checkIsValidImage_1 = require("@/helpers/checkIsValidImage");
const checkIsValid_1 = require("@/helpers/checkIsValid");
class ValidateImageAndFields {
    constructor() { }
    handler(req, res, next) {
        if (!req.file ||
            !(0, checkIsValidImage_1.checkIsValidImage)({
                fileBuffer: req.file.buffer,
                mimeType: req.file.mimetype,
                originalFileName: req.file.originalname,
            })) {
            return res.status(422).send({ message: "Invalid or missing image file." });
        }
        if (!(0, checkIsValid_1.checkisAValidString)(req.body.name)) {
            return res.status(422).send({ message: "Invalid name. Please check and try again." });
        }
        if (!(0, checkIsValid_1.checkisAValidString)(req.body.description, 200)) {
            return res.status(422).send({ message: "Invalid store description. Please check and try again." });
        }
        next();
    }
}
exports.ValidateImageAndFields = ValidateImageAndFields;
