import { checkSchema  } from "express-validator";

const userValidationSchema = checkSchema({
    username: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'User cannot be empty'
        },
        isLength: {
            errorMessage: 'User must be at least 3 characters long',
            options: { min: 3 }
        }
    },
    email: {
        in: ['body'],
        isEmail: true,
        notEmpty: {
            errorMessage: 'Email cannot be empty'
        },
    },
    role: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Role cannot be empty'
        },
    }
});

export default userValidationSchema;

