import { BadRequestErrorType } from '@types'

export class HttpError {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly error: BadRequestErrorType = 'No error details'
    ) {}
}

export class BadRequest extends HttpError {
    constructor(message: string, error?: BadRequestErrorType) {
        super(400, message, error)
    }
}

export class Unauthorized extends HttpError {
    constructor() {
        super(401, 'Unauthorized', 'You must be logged in')
    }
}

export class Forbidden extends HttpError {
    constructor() {
        super(403, 'Forbidden', "You don't have enough rights")
    }
}
