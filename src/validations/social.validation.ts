import { body, param } from 'express-validator'
import { isHtml } from '@utils'

export class SocialValidation {
    public static add = [
        body('title', 'The title must be an string').isString(),
        body('url', 'The url must be an string').isString(),
        body('icon').custom((value) => {
            if (!isHtml(value)) return Promise.reject('The icon must be a html')
            return true
        }),
    ]

    public static delete = param('id', 'The id must be a number').isNumeric()

    public static getOneById = param('id', 'The id must be a number').isNumeric()
}
