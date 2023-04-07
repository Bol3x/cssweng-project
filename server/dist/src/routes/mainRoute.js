"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadRoutes = void 0;
const productRoutes_1 = __importDefault(require("./productRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const userAuthRoutes_1 = __importDefault(require("./userAuthRoutes"));
const errorResponse_1 = __importDefault(require("../services/error/errorResponse"));
const userCheckAuth_1 = __importDefault(require("../services/user/auth/userCheckAuth"));
const userCheckAdmin_1 = __importDefault(require("../services/user/auth/userCheckAdmin"));
const LoadRoutes = (app) => {
    app.use('/product', userCheckAuth_1.default, productRoutes_1.default);
    app.use('/category', userCheckAuth_1.default, categoryRoutes_1.default);
    app.use('/user', userCheckAuth_1.default, userCheckAdmin_1.default, userRoutes_1.default);
    app.use('/auth', userAuthRoutes_1.default);
    //index is in build, from react app in `client`
    app.use(errorResponse_1.default);
    //redirect all other routes to index
    app.get('/*', (req, res) => {
        res.sendFile('index.html', { root: 'build' });
    });
};
exports.LoadRoutes = LoadRoutes;
