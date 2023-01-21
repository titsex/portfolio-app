import { NextFunction, Request, Response } from 'express'
import { IRateLimiterOptions, RateLimiterMemory } from 'rate-limiter-flexible'

const options: IRateLimiterOptions = {
    duration: +process.env.MAX_REQUEST_WINDOW!,
    points: +process.env.MAX_REQUEST_LIMIT!,
}

const rateLimiter = new RateLimiterMemory(options)

export function rateLimiterMiddleware(request: Request, response: Response, next: NextFunction) {
    rateLimiter
        .consume(request.ip)
        .then((rateLimiterRes) => {
            response.setHeader('Retry-After', rateLimiterRes.msBeforeNext / 1000)
            response.setHeader('X-RateLimit-Limit', +process.env.MAX_REQUEST_LIMIT!)
            response.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints)
            response.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString())
            next()
        })
        .catch(() => {
            response.status(429).json({
                message: 'Too many requests',
                error: 'You have exceeded the request limit. Wait a bit and try again',
            })
        })
}
