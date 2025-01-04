import { checkSchema } from "express-validator";

const deleteUserValidationSchema = checkSchema({
    requestUser: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'requestUser is required'
        }
    },
    deleteUser: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'deleteUser is required'
        }
    }
});

export default deleteUserValidationSchema;