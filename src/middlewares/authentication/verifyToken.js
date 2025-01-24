import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

import { InvalidTokenError, TokenExpiredError } from '../../utils/errors.js';

const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if(!token) throw new InvalidTokenError("Token not provided", "Please provide a token");
        
        jwt.verify(token, config.secret_key, (err, payload) => {
            if(err) throw new TokenExpiredError('Token expired', 'Please provide a valid token');
            req.username = payload.username;
        });
        next();
    } catch (error) {
        return res.status(error.statusCode).send(error.response);
    }
}

export default verifyToken;