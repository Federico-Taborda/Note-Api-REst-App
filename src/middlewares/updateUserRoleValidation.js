import { checkSchema  } from "express-validator";

const userRoleValidationSchema = checkSchema({
    requestUser: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Request user cannot be empty'
        },
    },
    updateUser: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'User to update cannot be empty'
        },
    },
    newRole: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'New role cannot be empty'
        },
    }
});

export default userRoleValidationSchema;