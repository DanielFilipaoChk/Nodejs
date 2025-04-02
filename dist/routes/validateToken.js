"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headersToken = req.headers["authorization"];
    if (headersToken && typeof headersToken === "string") {
        const token = headersToken.slice(7); // "Bearer <token>"
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'default_secret_key', (error, decoded) => {
            if (error) {
                return res.status(401).json({ error: "Token inválido" });
            }
            req.user = decoded; // Guardar la información del usuario decodificado en `req.user`
            next();
        });
    }
    else {
        return res.status(401).json({ error: "Token no proporcionado" });
    }
};
exports.default = validateToken;
