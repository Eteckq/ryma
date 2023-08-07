import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Between, EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/auth/dto/login.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    async getUser(payload: LoginDto) {
        return await this.userRepository.findOneBy({ pseudo: payload.pseudo })
    }
    async createUser(payload: LoginDto) {
        return await this.userRepository.save({
            pseudo: payload.pseudo
        })
    }
    async findOneById(id: string) {
        return await this.userRepository.findOneBy({ id: id })
    }

    async getItemsForUser(id: string) {
        const user = await this.userRepository.findOne({ where: { id: id }, relations: ['items', 'items.item', 'items.item.rarity'] })
        if (!user) throw new NotFoundException('User not found')
        return user.items
    }

    async getRpgData(user: User) {
        return user.rpgData
    }

    async saveRpgData(user: User, data: string) {
        user.rpgData = data
        return await user.save()
    }
}
