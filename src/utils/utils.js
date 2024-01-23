import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

// Obtener la ruta del directorio actual
const currentDir = dirname(fileURLToPath(import.meta.url));
const __dirname = dirname(currentDir);

// Función para generar una respuesta de éxito
const successResponse = (res, message, data = {}, code = 200) => {
    return res.status(code).json({
        code,
        status: 'success',
        message,
        data
    });
};

// Función para generar una respuesta de error
const errorResponse = (res, message, code = 400) => {
    return res.status(code).json({
        code,
        status: 'error',
        message
    });
};

// Función para crear un hash utilizando bcrypt
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Función para validar un hash utilizando bcrypt
export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password);
};

export {
    __dirname,
    successResponse,
    errorResponse
};
