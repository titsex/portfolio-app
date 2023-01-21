import { NextFunction, Request, Response } from 'express'
import { CreateDto } from '@dto/users'

export enum COLORS {
    NONE = '\x1b[0',
    CYAN = '\x1b[36',
    RED = '\x1b[31',
    YELLOW = '\x1b[33',
}

export enum COLOR_TYPES {
    NONE = 'm',
    BOLD = ';1m',
}

export interface IValidationErrors {
    param: string
    message: string
}

export type BadRequestErrorType = string | IValidationErrors | IValidationErrors[]

export interface IRequest extends Request {
    user?: CreateDto
    errors?: string[]
}

export enum Roles {
    USER = 'user',
    DEVELOPER = 'developer',
}

export type expressFn = (req: Request, res: Response, next: NextFunction) => unknown

export interface Stack {
    handle: expressFn
    name?: string
}

export type OfferStatuses = 'rejected' | 'interested' | 'reviewed' | 'accepted' | 'pending'

export interface CustomRoute {
    stack: Stack[]
}

export type CacheType = 'Registration' | 'Authorization' | 'OfferSending'
