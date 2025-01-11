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


export { 
    userValidationSchema,
    userRoleValidationSchema,
    userEmailValidationSchema,
    deleteUserValidationSchema
 };

