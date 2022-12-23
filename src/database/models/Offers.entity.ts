import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('offers')
export class OffersEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    email!: string

    @Column()
    phoneNumber!: string

    @Column()
    subject!: string

    @Column()
    text!: string
}
