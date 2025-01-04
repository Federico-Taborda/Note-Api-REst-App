import { checkSchema  } from "express-validator";

const userValidationSchema = checkSchema({
    username: {
        in: ['body'],
        isString: true,
        notEmtpy: {
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
        notEmtpy: {
            errorMessage: 'Email cannot be empty'
        },
    },
    role: {
        in: ['body'],
        isString: true,
        notEmtpy: {
            errorMessage: 'Role cannot be empty'
        },
    }
});

export default userValidationSchema;

