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

const noteUpdateValidationSchema = checkSchema({
    title: {
        in: ['body'],
        isString: true,
        isLength: {
            errorMessage: 'Title must be at least 5 characters long',
            options: { min: 5, max: 30}
        },
        optional: { options: { nullable: true, checkFalsy: true } }
    },
    content: {
        in: ['body'],
        isString: true,
        isLength: {
            errorMessage: 'Title must be at least 5 characters long',
            options: { min: 5, max: 30}
        },
        optional: { options: { nullable: true, checkFalsy: true } }
    },
    tag: {
        in: ['body'],
        isArray: true,
        optional: { options: { nullable: true, checkFalsy: true } }
    },
    priority: {
        in: ['query'],
        isString: true,
        optional: { options: { nullable: true, checkFalsy: true } }
    },
    state: {
        in: ['query'],
        isBoolean: true,
        optional: { options: { nullable: true, checkFalsy: true } }
    },
    userId: {
        in: ['query'],
        isNumeric: true,
        notEmpty: {
            errorMessage: 'Id cannot be empty'
        },
    },
    visibility: {
        in: ['query'],
        isString: true,
        optional: { options: { nullable: true, checkFalsy: true } }
    }
});

export {
    noteValidationSchema,
    noteUpdateValidationSchema
}

