import { body, query } from 'express-validator'

export class UserValidation {
    public static registration = [
        body('email', 'The email must be an email').isEmail(),
        body('password', 'Password length is at least 6 characters').isLength({ min: 8 }),
    ]

    public static login = [
        body('email', 'The email must be an email').isEmail(),
        body('password', 'Password length is at least 6 characters').isLength({ min: 8 }),
    ]

    public static activate = [
        query('email', 'The email must be an email').isEmail(),
        query('hex', 'The hex parameter must not be empty').notEmpty(),
    ]
}
