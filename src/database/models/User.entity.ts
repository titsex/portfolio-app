import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TokenEntity } from '@model/Token.entity'

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @PrimaryGeneratedColumn('uuid')
    uid!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column({ default: false })
    isActivated?: boolean

    @Column()
    activationLink?: string

    @OneToMany(() => TokenEntity, (t) => t.user)
    tokens?: TokenEntity[]
}
