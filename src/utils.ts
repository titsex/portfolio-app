import { randomBytes } from 'crypto'
import { userRepository } from '@database'
import { Request } from 'express'

export const getDate = (): [Date, string] => {
    const date = new Date()

    return [date, date.toLocaleString('ru-RU')]
}

export const getErrorMessage = (error: unknown) => (error instanceof Error ? capitalize(error.message) : null)

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

export const randomString = (length: number) => randomBytes(length).toString('hex')

export const randomNumber = (minimum: number, maximum: number) =>
    Math.floor(Math.random() * (maximum - minimum + 1) + minimum)

export const generateUniqueHex = async (): Promise<string> => {
    const hex = randomString(randomNumber(10, 20))

    const candidate = await userRepository.findOneBy({ activationLink: hex })
    if (!candidate) return hex

    return await generateUniqueHex()
}

export const getIp = (request: Request) =>
    request.headers['x-forwarded-for']?.toString() || request.socket.remoteAddress!.toString()
