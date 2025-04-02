import { Router } from "express";
import { register, login } from "../controllers/user";  // Importa correctamente las funciones

const router = Router();

// Define las rutas para el registro y login
router.post("/api/user/register", register);
router.post("/api/user/login", login);

export default router;
