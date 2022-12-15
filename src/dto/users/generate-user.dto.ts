import { UserEntity } from '@model/User.entity'

export class GenerateUserDto {
    email: string
    id: number
    isActivated: boolean | undefined

    constructor(user: UserEntity) {
        this.email = user.email
        this.id = user.id
        this.isActivated = user.isActivated
    }
}
