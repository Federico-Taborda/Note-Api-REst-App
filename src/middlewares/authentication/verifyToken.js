import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

import { InvalidTokenError } from '../../utils/errors.js';

const verifyToken = (req, res, next) => {
    try {
        const header = req.header("Authorization") || "";
        const token = header.split(" ")[1];
        if(!token) throw new InvalidTokenError("Token not provided", "Please provide a token");

        const payload = jwt.verify(token, config.secret_key);
        req.username = payload.username;
        next();
    } catch (error) {
        return res.status(error.statusCode).send(error.response);
    }
}

export default verifyToken;