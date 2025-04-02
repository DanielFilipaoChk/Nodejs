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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getproduct = exports.registerProduct = void 0;
const product_1 = require("../models/product");
// Registrar producto
const registerProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        // Crear el producto en la base de datos
        yield product_1.Product.create({
            name,
            description,
            status: 1
        });
        res.status(201).json({
            msg: `Product ${name} created successfully`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Product registration failed',
            error
        });
    }
});
exports.registerProduct = registerProduct;
// Obtener productos
const getproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listProducts = yield product_1.Product.findAll();
        if (listProducts.length === 0) {
            return res.status(404).json({
                msg: 'No products found'
            });
        }
        res.status(200).json({ listProducts });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error retrieving products',
            error
        });
    }
});
exports.getproduct = getproduct;
