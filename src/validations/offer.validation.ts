import { body, param, query } from 'express-validator'

export class OfferValidation {
    public static send = [
        body('email', 'The email must be an email').isEmail(),
        body('name', 'The name must be a string consisting of at least 4 characters').isLength({ min: 4 }).isString(),
        body('message', 'The message must be a string').isString(),
    ]

    public static confirm = [
        query('email', 'The email must be an email').isEmail(),
        query('hex', 'The name must not be empty').isString(),
    ]

    public static changeStatus = [
        body('id', 'The id must be a number').isNumeric(),
        body(
            'status',
            "Here are the available statuses for the offer: 'rejected', 'interested', 'reviewed', 'accepted'"
        ).isIn(['rejected', 'interested', 'reviewed', 'accepted']),
    ]

    public static getOneById = param('id', 'The id must be a number').isNumeric()
}
