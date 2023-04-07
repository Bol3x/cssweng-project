"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMiddlewares = void 0;
/**
 * @file settings.ts
 * @description This file contains all the settings and dependencies for the application
 */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const corsOptions = {
    origin: (_a = process.env.CORS_ORIGIN) !== null && _a !== void 0 ? _a : 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};
const loadMiddlewares = (app) => {
    var _a;
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    //user authentication
    app.use((0, express_flash_1.default)());
    app.use((0, express_session_1.default)({
        secret: (_a = process.env.SESSION_SECRET) !== null && _a !== void 0 ? _a : 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production' ? true : false,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        }
    }));
    app.use(passport_1.default.session());
    app.use(passport_1.default.initialize());
    //set path to build folder
    app.set('view engine', 'html');
    app.use(express_1.default.static('../client/build'));
};
exports.loadMiddlewares = loadMiddlewares;
