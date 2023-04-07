"use strict";
//checks if new user data is valid
//passes to next if valid, throws an error if invalid
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatePassword_1 = __importDefault(require("../validation/validatePassword"));
const validateEmail_1 = __importDefault(require("../validation/validateEmail"));
const validateName_1 = __importDefault(require("../validation/validateName"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, password, email } = req.body;
        email = email.toLowerCase();
        const isNameValid = (0, validateName_1.default)(name);
        const isEmailValid = yield (0, validateEmail_1.default)(email);
        const isPasswordValid = (0, validatePassword_1.default)(password);
        //edge case
        if (email === password.toLowerCase())
            throw new Error('Email cannot be your password!!');
        if (isNameValid && isPasswordValid && isEmailValid)
            next();
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
