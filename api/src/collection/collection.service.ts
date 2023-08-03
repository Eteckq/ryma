import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Collection } from './entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { ItemService } from 'src/item/item.service';
import { AddItemDto } from './dto/add-item.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { Rarity } from 'src/item/entities/rarity.entity';

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
        return await this.collectionRepository.findOne({ where: { id: id }, relations: ['items', 'items.rarity'] })
    }

    async create(payload: CreateCollectionDto) {
        return await this.collectionRepository.save({
            name: payload.name,
            design: payload.design
        })
    }

    async generateRandomItemForCollection(user: User, id: string) {
        // FIXME: <=
        if (user.remainingRolls == 0) throw new ForbiddenException('No remaining rolls')
        user.remainingRolls -= 1
        await user.save()

        const collection = await this.findOne(id)
        if (!collection) throw new NotFoundException('Collection not found')
        if (collection.items.length == 0) throw new ForbiddenException('Collection is empty')

        const randomRarity = getRandomRarity(eliminerDoublonsParId(collection.items.map(i => i.rarity)))
        if (!randomRarity) throw new NotFoundException('Unable to get random rarity (wtf)')

        const reducedCollection = collection.items.filter(i => i.rarity == randomRarity)
        const item = reducedCollection[Math.floor(Math.random() * reducedCollection.length)]

        const generatedItem = await this.itemService.generateItem(item)

        generatedItem.user = user
        return await generatedItem.save()
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

function getRandomRarity(rarities: Rarity[]) {
    if (rarities.length == 0) return null
    const sommePoids = rarities.reduce((acc, element) => acc + element.weight, 0);
    const nombreAleatoire = Math.random() * sommePoids;
    let sommeCumulative = 0;
    for (const element of rarities) {
        sommeCumulative += element.weight;
        if (nombreAleatoire < sommeCumulative) {
            return element;
        }
    }
    return null
}

function eliminerDoublonsParId(tableau: Rarity[]): Rarity[] {
    const dictionnaire = {};
    for (const element of tableau) {
        if (!dictionnaire[element.id]) {
            dictionnaire[element.id] = element;
        }
    }
    return Object.values(dictionnaire);
}