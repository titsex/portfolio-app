import { body, param, query } from 'express-validator'
import { validationMiddleware } from '@middleware/validation.middleware'

export class OfferValidation {
    public static send = [
        body('email', 'The email must be an email.').isEmail(),
        body('name', 'The name must be a string consisting of at least 4 characters.').isLength({ min: 4 }).isString(),
        body('message', 'The message must be a string.').isString(),
        validationMiddleware,
    ]

    public static confirm = [
        query('email', 'The email must be an email.').isEmail(),
        query('hex', 'The name must not be empty.').isString(),
        validationMiddleware,
    ]

    public static changeStatus = [
        body('id', 'The id must be a number').isNumeric(),
        body(
            'status',
            "Here are the available statuses for the offer: 'rejected', 'interested', 'reviewed', 'accepted'"
        ).isIn(['rejected', 'interested', 'reviewed', 'accepted']),
        validationMiddleware,
    ]

    public static getOne = [param('id', 'The id must be a number').isNumeric(), validationMiddleware]
}
