import { config } from 'dotenv'
config()

import express from 'express'
import cookieParser from 'cookie-parser'
import router from '@route/index'

import { Logger } from '@class/Logger'
import { DB } from '@database'
import { errorMiddleware } from '@middleware/error'
import { asyncHandlerStack } from '@class/Errors'

const app = express()
const port = 7000 || process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use('/api', asyncHandlerStack(router))
app.use(errorMiddleware)

const start = async () => {
    try {
        await new DB(process.env.PG_URL!)
        app.listen(port, () => Logger.info(`Server has been started on ${port} port.`))
    } catch (error) {
        Logger.error(error)
    }
}

start().then()
