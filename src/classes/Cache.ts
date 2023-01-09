import { createClient, RedisClientType } from 'redis'
import { Logger } from '@class/Logger'
import { CacheType } from '@types'

export class Cache {
    private static client: RedisClientType = createClient({
        url: process.env.REDIS_URL!,
    })

    public static async connect() {
        return await this.client
            .connect()
            .then(() => Logger.info('Successful connection to the redis cache server.'))
            .catch(() => Logger.error('An error occurred while connecting to the redis cache server.'))
    }

    public static async getCache(key: string, type: CacheType) {
        try {
            return await this.client.get(`${key}/${type}`)
        } catch (error) {
            throw new Error('An error has occurred. Data could not be retrieved.')
        }
    }

    public static async setCache(key: string, value: string, type: CacheType) {
        try {
            await this.client.set(`${key}/${type}`, value, { EX: 60 * 5 })
        } catch (error) {
            throw new Error('An error has occurred. Data could not be saved.')
        }
    }

    public static async deleteCache(key: string, type: CacheType) {
        try {
            await this.client.del(`${key}/${type}`)
        } catch (error) {
            throw new Error('An error has occurred. Failed to delete data.')
        }
    }
}
