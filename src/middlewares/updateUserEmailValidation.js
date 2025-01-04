import { checkSchema } from "express-validator";

const userEmailValidationSchema = checkSchema({
    userName: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Username cannot be empty'
        },
        isString: {
            errorMessage: 'Username must be a string'
        }
    },
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Email cannot be empty'
        },
        isEmail: {
            errorMessage: 'Please provide a valid email'
        }
    }
});

export default userEmailValidationSchema;