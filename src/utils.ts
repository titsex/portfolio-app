import { randomBytes } from 'crypto'
import { Request } from 'express'
import { Result, ValidationError } from 'express-validator'
import { IValidationErrors } from '@types'

export const getDate = (): [Date, string] => {
    const date = new Date()

    return [date, date.toLocaleString('ru-RU')]
}

export const getErrorMessage = (error: unknown) => (error instanceof Error ? capitalize(error.message) : undefined)

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

export const randomString = (length: number) => randomBytes(length).toString('hex')

export const randomNumber = (minimum: number, maximum: number) =>
    Math.floor(Math.random() * (maximum - minimum + 1) + minimum)

export const generateUniqueHex = async (): Promise<string> => randomString(randomNumber(10, 20))

export const getIp = (request: Request) =>
    request.headers['x-forwarded-for']?.toString() || request.socket.remoteAddress!.toString()

export const validationHandling = (errors: Result<ValidationError>) => {
    const result: IValidationErrors[] = []

    for (const error of errors.array()) {
        if (!result.find((x) => x.param === error.param)) result.push({ param: error.param, message: error.msg })
    }

    return result.length === 1 ? result[0] : result
}
