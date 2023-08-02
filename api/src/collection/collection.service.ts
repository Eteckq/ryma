import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Collection } from './entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { ItemService } from 'src/item/item.service';
import { AddItemDto } from './dto/add-item.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionService {
    constructor(
        @InjectRepository(Collection)
        private readonly collectionRepository: Repository<Collection>,
        private readonly itemService: ItemService
    ) { }

    async findAll() {
        return await this.collectionRepository.find()
    }

    async findOne(id: string) {
        return await this.collectionRepository.findOne({ where: { id: id }, relations: ['items'] })
    }

    async create(payload: CreateCollectionDto) {
        return await this.collectionRepository.save({
            name: payload.name,
            design: payload.design
        })
    }

    async generateRandomItemForCollection(user: User, id: string) {
        const collection = await this.findOne(id)
        if (!collection) throw new NotFoundException('Collection not found')
        if(collection.items.length == 0) throw new ForbiddenException('Collection is empty')
        
        // TODO: Get item according to rarity
        const item = collection.items[Math.floor(Math.random() * collection.items.length)]

        const geenratedItem = await this.itemService.generateItem(item)

        geenratedItem.user = user
        return await geenratedItem.save()
    }

    async createItem(id: string, payload: AddItemDto) {
        const collection = await this.findOne(id)
        if (!collection) throw new NotFoundException('Collection not found')
        const item = await this.itemService.createItem(payload)
        collection.items.push(item)
        await collection.save()
        return item
    }

}
