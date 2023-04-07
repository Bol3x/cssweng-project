"use strict";
// checks if an email being used to register is valid
// validates using deep-email-validator
// returns true if valid, false if invalid
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep_email_validator_1 = require("deep-email-validator");
function validateEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { valid, reason, validators } = yield (0, deep_email_validator_1.validate)({
                email,
                validateMx: false,
                validateDisposable: true,
                validateSMTP: false,
            });
            if (!valid)
                throw new Error("Invalid email. Please enter a valid email address.");
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = validateEmail;
