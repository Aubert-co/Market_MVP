"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCredentials = void 0;
const checkIsValid_1 = require("@/helpers/checkIsValid");
class ValidateCredentials {
    handler(req, res, next) {
        if (!(0, checkIsValid_1.isValidString)(req.body.password)) {
            res.status(422).send({ message: "Invalid password. Please check and try again." });
            return;
        }
        if (!(0, checkIsValid_1.checkisValidEmail)(req.body.email)) {
            res.status(422).send({ message: "Invalid email. Please check and try again." });
            return;
        }
        next();
    }
}
exports.ValidateCredentials = ValidateCredentials;
