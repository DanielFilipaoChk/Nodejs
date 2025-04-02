"use strict";
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
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const user_2 = require("./user");
const product_2 = require("./product");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || '3016', 10);
        this.middlewares();
        this.routes();
        this.listen();
        this.DBconnect();
    }
    middlewares() {
        // Middleware to parse JSON request bodies
        this.app.use(express_1.default.json());
        // Error handling middleware
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ error: 'Something went wrong!' });
        });
    }
    routes() {
        // Mount the user routes at the root path
        this.app.use('/', user_1.default);
        this.app.use('/', product_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
    DBconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Creacion de las tablas
                yield user_2.User.sync({ alter: true });
                yield product_2.Product.sync({ alter: true });
                // await sequelize.authenticate();
                // console.log('Database connection successful');
            }
            catch (error) {
                console.error('Database connection failed:', error);
                process.exit(1); // Exit the process if database connection fails
            }
        });
    }
}
exports.default = Server;
