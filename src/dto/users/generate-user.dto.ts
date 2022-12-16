import { UserEntity } from '@model/User.entity'
import { Roles } from '@types'

export class GenerateUserDto {
    email: string
    id: number
    isActivated: boolean | undefined
    role: Roles[]

    constructor(user: UserEntity) {
        this.email = user.email
        this.id = user.id
        this.isActivated = user.isActivated
        this.role = user.role
    }
}
