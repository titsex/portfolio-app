import { CustomRoute, expressFn } from '@types'
import { Router } from 'express'

export class HttpError {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly error: string = 'No error details'
    ) {}
}

export class BadRequest extends HttpError {
    constructor(message: string, error?: string) {
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

export const asyncHandler = (fn: expressFn): expressFn => {
    return (req, res, next) => {
        return Promise.resolve(fn(req, res, next)).catch(next)
    }
}

const changeRouteHandle = (route: CustomRoute) => {
    return route.stack.map((stack) => {
        if (stack.handle.constructor.name === 'AsyncFunction') {
            stack.handle = asyncHandler(stack.handle)
        }

        return stack
    })
}

export const asyncHandlerStack = (router: Router) => {
    router.stack = router.stack.map((stack) => {
        if (stack.name === 'bound dispatch') {
            stack.stack = changeRouteHandle(stack.route)
        } else if (stack.name === 'router') {
            asyncHandlerStack(stack.handle)
        }

        return stack
    })

    return router
}
