import { Request, Response } from "express";
import { Product } from "../models/product";

// Registrar producto
export const registerProduct = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        // Crear el producto en la base de datos
        await Product.create({
            name,
            description,
            status: 1
        });

        res.status(201).json({
            msg: `Product ${name} created successfully`
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Product registration failed',
            error
        });
    }
};

// Obtener productos
export const getproduct = async (req: Request, res: Response) => {
    try {
        const listProducts = await Product.findAll();

        if (listProducts.length === 0) {
            return res.status(404).json({
                msg: 'No products found'
            });
        }

        res.status(200).json({ listProducts });

    } catch (error) {
        res.status(500).json({
            msg: 'Error retrieving products',
            error
        });
    }
};
