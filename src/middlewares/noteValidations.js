import { checkSchema  } from "express-validator";

const noteValidationSchema = checkSchema({
    title: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Title cannot be empty'
        },
        isLength: {
            errorMessage: 'Title must be at least 5 characters long',
            options: { min: 5 }
        }
    },
    content: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Content cannot be empty'
        },
    },
    tag: {
        in: ['body'],
        isArray: true,
        notEmpty: {
            errorMessage: 'Tag cannot be empty'
        },
    },
    priority: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Priority cannot be empty'
        },
    },
    state: {
        in: ['body'],
        isBoolean: true,
        notEmpty: {
            errorMessage: 'State cannot be empty'
        },
    },
    userId: {
        in: ['body'],
        isNumeric: true,
        notEmpty: {
            errorMessage: 'Id cannot be empty'
        },
    },
    visibility: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Visibility cannot be empty'
        },
    }
});

export default noteValidationSchema;

