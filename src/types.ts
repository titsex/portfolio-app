import { NextFunction, Request, Response } from 'express'
import { GenerateUserDto } from '@dto/users/generate-user.dto'

export enum COLORS {
    NONE = '\x1b[0',
    CYAN = '\x1b[36',
    PINK = '\x1b[35',
    RED = '\x1b[31',
    YELLOW = '\x1b[33',
}

export enum COLOR_TYPES {
    NONE = 'm',
    BOLD = ';1m',
}

export interface IRequest extends Request {
    user?: GenerateUserDto
}

export enum Roles {
    USER = 'user',
    ADMIN = 'administrator',
    DEVELOPER = 'developer',
}

export type expressFn = (req: Request, res: Response, next: NextFunction) => unknown

export interface Stack {
    handle: expressFn
}

export interface CustomRoute {
    stack: Stack[]
}
