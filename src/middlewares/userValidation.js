import { Joi } from 'express-validation';

const userValidation = {
    body: Joi.object({
        username: Joi
            .string()
            .required().messages({ 'string.empty': 'Username cannot be empty' }),
        email: Joi
            .string()
            .email().message({ 'string.email': 'Must be a valid email' })
            .required().messages({ 'string.email': 'Email cannot be empty' }),
        role: Joi
            .string()
            .required().messages({ 'string.empty': 'Role cannot be empty' }),
    }),
};

export default userValidation;

