import { UserEntity } from '@model/User.entity'
import { Roles } from '@types'

export class GenerateUserDto {
    email: string
    uid: string
    isActivated: boolean | undefined
    role: Roles[]
    createdAt: Date

    constructor(user: UserEntity) {
        this.email = user.email
        this.uid = user.uid
        this.isActivated = user.isActivated
        this.role = user.role
        this.createdAt = user.createdAt
    }
}
