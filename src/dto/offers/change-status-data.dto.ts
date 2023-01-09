import { OfferStatuses } from '@types'

export class ChangeStatusDataDto {
    public status!: OfferStatuses
    public id!: number
}
