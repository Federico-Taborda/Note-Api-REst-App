import UserService from "../../services/user.services.js";
import { UnauthorizedError } from "../../utils/errors.js";

const decondigBase64 = (credentials) => {
    return Buffer.from(credentials, "base64").toString("utf-8").split(":");
}

const basicAuthentication = async (req, res, next) => {
    const credentials = req.headers.authorization;

    try {
        if(!credentials) throw new UnauthorizedError('Unauthorized', 'No credentials in headers');

        const decodedCredentials = decondigBase64(credentials);
        const user = await UserService.verifyCredentials(decodedCredentials[0], decodedCredentials[1]);
        
        if(!user) throw new UnauthorizedError('Credentials are invalid', 'You not have authorization');

        next();
    } catch (error) {
        return res.status(error.statusCode).send(error.response);
    }
}

export default basicAuthentication;