"use strict";
/** checks if user is an admin
 *  prevents access to pages that require admin privileges
 */
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
const usertypeGetUnique_1 = __importDefault(require("../api/usertypeGetUnique"));
function userCheckAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield req.user;
            //@ts-ignore
            const usertype = yield (0, usertypeGetUnique_1.default)({ utype_ID: user.type });
            //@ts-ignore
            if (usertype.utype_title == "Admin") {
                return next();
            }
            res.status(401).send("You do not have access to this page. Please contact your administrator.");
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
exports.default = userCheckAdmin;
