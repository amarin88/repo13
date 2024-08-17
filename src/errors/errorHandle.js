import { logger } from "../utils/logger.js";//Import de config de logger de winston


export const errorHandle = (err, req, res, next ) => {
    const status = err.status || 500;
    const response = status === 500 ? "Internal Server Error" : err.message;

    if(status === 500) {
        logger.log("error", err.message);
    };//Si recibimos un status 500 guardamos el error en el logger

    res.status(status).json({error: {
        response,
        status
    }})
};