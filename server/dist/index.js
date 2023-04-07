"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file index.ts
 * @description This file is the entry point of the application
 */
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
//custom imports
const settings_1 = require("./settings");
const mainRoute_1 = require("./src/routes/mainRoute");
const passport_config_1 = __importDefault(require("./src/services/user/auth/passport/passport-config"));
(0, passport_config_1.default)(passport_1.default);
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
(0, settings_1.loadMiddlewares)(app);
(0, mainRoute_1.LoadRoutes)(app);
