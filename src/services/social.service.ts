import { AddDto } from '@dto/socials'
import { socialRepository } from '@database'

export class SocialService {
    public static async add(data: AddDto) {
        const candidate = await socialRepository.findOneBy({ title: data.title })
        if (candidate) throw new Error('A social with such a title already exists')

        const social = socialRepository.create()

        social.title = data.title
        social.url = data.url
        social.icon = data.icon

        return await socialRepository.save(social)
    }

    public static async delete(id: number) {
        const candidate = await socialRepository.findOneBy({ id })
        if (!candidate) throw new Error('The social with such an ID was not found')

        await socialRepository.delete(candidate)
        return { message: 'The social was successfully deleted' }
    }

    public static async getAll() {
        return await socialRepository.find()
    }

    public static async getOneById(id: number) {
        const candidate = await socialRepository.findOneBy({ id })
        if (!candidate) throw new Error('The social with such an ID was not found')

        return candidate
    }
}
