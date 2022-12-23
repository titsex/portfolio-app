import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '@model/User.entity'

@Entity('tokens')
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    refreshToken!: string

    @Column({ type: 'bigint' })
    lastSignIn!: number

    @Column({ nullable: true })
    ip!: string

    @ManyToOne(() => UserEntity, (u) => u.tokens)
    user!: UserEntity
}
