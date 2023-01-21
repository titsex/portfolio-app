import { OfferStatuses } from '@types'

export class ChangeStatusDto {
    public status!: OfferStatuses
    public id!: number
}
