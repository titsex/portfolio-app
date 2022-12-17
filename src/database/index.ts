import { Logger } from '@class/Logger'
import { DataSource, Repository } from 'typeorm'
import { UserEntity } from '@model/User.entity'
import { TokenEntity } from '@model/Token.entity'

export let userRepository!: Repository<UserEntity>
export let tokenRepository!: Repository<TokenEntity>

export class DB {
    constructor(url: string) {
        const connection = new DataSource({
            type: 'postgres',
            url,
            entities: ['build/**/*.entity.js'],
            synchronize: true,
            logger: 'debug',
        })

        connection
            .initialize()
            .then((connect) => {
                userRepository = connect.getRepository(UserEntity)
                tokenRepository = connect.getRepository(TokenEntity)
            })
            .catch(() => Logger.error('An error occurred while connecting to the database.'))

        Logger.info('Successful connection to the database.')
    }
}
