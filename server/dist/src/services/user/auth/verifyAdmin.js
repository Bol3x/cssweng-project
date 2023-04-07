"use strict";
//send a message to admin based on their input password
//used to verify user actions
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
const userGetUnique_1 = __importDefault(require("../api/userGetUnique"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function verifyAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sessionUser = yield req.user;
            const { password } = req.body;
            //@ts-ignore
            const userData = yield (0, userGetUnique_1.default)({ email: sessionUser.email });
            if (userData !== null && (yield bcryptjs_1.default.compare(password, userData.pass))) {
                console.log("Verify Success");
                res.status(200).json({ message: "Success" });
            }
            else {
                console.log("Verify Failure: Incorrect Password");
                res.status(401).json({ message: "Failure: Incorrect Password" });
            }
        }
        catch (error) {
            console.log("Error in verifyAdmin: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.default = verifyAdmin;
