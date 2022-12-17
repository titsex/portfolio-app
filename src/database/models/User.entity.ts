import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TokenEntity } from '@model/Token.entity'
import { Roles } from '@types'

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

    @CreateDateColumn()
    createdAt!: Date

    @Column('simple-array')
    role!: Roles[]

    @OneToMany(() => TokenEntity, (t) => t.user)
    tokens?: TokenEntity[]
}
