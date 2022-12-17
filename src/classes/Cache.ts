import { createClient, RedisClientType } from 'redis'
import { Logger } from '@class/Logger'

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

    public static async getCache(key: string) {
        try {
            return await this.client.get(key)
        } catch (error) {
            throw new Error('An error has occurred. Data could not be retrieved.')
        }
    }

    public static async setCache(key: string, value: string) {
        try {
            await this.client.set(key, value, { EX: 60 * 5 })
        } catch (error) {
            throw new Error('An error has occurred. Data could not be saved.')
        }
    }

    public static async deleteCache(key: string) {
        try {
            await this.client.del(key)
        } catch (error) {
            throw new Error('An error has occurred. Failed to delete data.')
        }
    }
}
