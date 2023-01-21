import { UserEntity } from '@model/User.entity'
import { Roles } from '@types'

export class CreateDto {
    email: string
    uid: string
    isActivated: boolean | undefined
    roles: Roles[]
    createdAt: Date

    constructor(user: UserEntity) {
        this.email = user.email
        this.uid = user.uid
        this.isActivated = user.isActivated
        this.roles = user.roles
        this.createdAt = user.createdAt
    }
}
