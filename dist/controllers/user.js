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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importar jsonwebtoken
// Registro de usuario
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastname, password, email, credential } = req.body;
        // Verificar si el usuario ya existe por email o credential
        const userUnique = yield user_1.User.findOne({
            where: { email: email, credential: credential },
        });
        // Si ya existe un usuario con ese email o credential, enviar un mensaje de error
        if (userUnique) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${email} o la credential ${credential}.`,
            });
        }
        // Hashear la contraseña antes de guardar el usuario
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        // Crear el usuario en la base de datos
        yield user_1.User.create({
            name,
            lastname,
            email,
            password: passwordHash,
            credential,
            status: 1,
        });
        // Responder con un mensaje de éxito
        res.status(201).json({
            msg: `Usuario ${name} ${lastname} creado exitosamente.`,
        });
    }
    catch (error) {
        // Manejo de errores en el registro
        console.error("Error al registrar el usuario:", error);
        // Verificamos si el error tiene una propiedad "message"
        if (error instanceof Error) {
            res.status(500).json({
                msg: "Hubo un error al crear el usuario. Por favor, intente nuevamente.",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                msg: "Hubo un error desconocido. Por favor, intente nuevamente.",
            });
        }
    }
});
exports.register = register;
// Login de usuario
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Buscar al usuario en la base de datos por el correo electrónico
        const user = yield user_1.User.findOne({
            where: { email },
        });
        // Si el usuario no existe, respondemos con un mensaje de alerta
        if (!user) {
            return res.status(404).json({
                msg: "Usuario no encontrado con ese email.",
            });
        }
        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        // Si la contraseña no coincide, respondemos con un mensaje de error
        if (!isMatch) {
            return res.status(401).json({
                msg: "Contraseña incorrecta.",
            });
        }
        // Generar el JWT token
        const token = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, // Puedes agregar más datos al payload
        process.env.SECRET_KEY || 'default_secret_key', // Asegúrate de tener SECRET_KEY en tu archivo .env
        { expiresIn: '1h' } // El token expirará en 1 hora
        );
        // Responder con el token
        res.json({
            msg: `INICIO DE SESIÓN EXITOSO`,
            user: {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
            },
            token, // Enviar el token al cliente
        });
    }
    catch (error) {
        console.error("Error en el login:", error);
        // Verificamos si el error tiene una propiedad "message"
        if (error instanceof Error) {
            res.status(500).json({
                msg: "Hubo un error en el inicio de sesión. Por favor, intente nuevamente.",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                msg: "Hubo un error desconocido. Por favor, intente nuevamente.",
            });
        }
    }
});
exports.login = login;
