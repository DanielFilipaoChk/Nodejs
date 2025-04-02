import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extender la interfaz Request para incluir `user`
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headersToken = req.headers["authorization"];

  if (headersToken && typeof headersToken === "string") {
    const token = headersToken.slice(7);  // "Bearer <token>"

    jwt.verify(token, process.env.SECRET_KEY || 'default_secret_key', (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: "Token inválido" });
      }
      req.user = decoded;  // Guardar la información del usuario decodificado en `req.user`
      next();
    });
  } else {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
};

export default validateToken;
