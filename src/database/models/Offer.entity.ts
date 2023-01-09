import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { OfferStatuses } from '@types'

@Entity('offers')
export class OfferEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    email!: string

    @Column()
    name!: string

    @Column()
    message!: string

    @Column({ default: false })
    isConfirmed?: boolean

    @Column({ default: 'pending' })
    status?: OfferStatuses

    @Column()
    confirmationLink?: string
}
