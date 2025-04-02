import { Router } from "express";
import { getproduct, registerProduct } from "../controllers/product";
import validateToken from "./validateToken";

const router = Router();

// Rutas para registrar y obtener productos
router.post("/api/product/register", registerProduct);
router.get("/api/product/getproduct", validateToken, getproduct);

export default router;
