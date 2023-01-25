import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('socials')
export class SocialEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    url!: string

    @Column()
    icon!: string
}
