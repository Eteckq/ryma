import { ForbiddenException, Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from 'src/collection/entities/collection.entity';
import { AddItemDto } from 'src/collection/dto/add-item.dto';
import { ItemToUser } from './entities/item_user.entity';
import { Rarity } from './entities/rarity.entity';
import { AddRarityDto } from './dto/add-rarity.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(ItemToUser)
    private readonly itemToUserRepository: Repository<ItemToUser>,
    @InjectRepository(Rarity)
    private readonly rarityRepository: Repository<Rarity>
  ) {

  }


  async generateItem(item: Item) {
    return await this.itemToUserRepository.create({
      item: item,
      quality: Math.min(getRandom(5, 105), 100),
      shiny: getRandom(0, 100) > 95
    })
  }

  async createItem(payload: AddItemDto) {
    const rarity = await this.rarityRepository.findOneBy({ id: payload.rarity })
    if (!rarity) throw new ForbiddenException('Rarity not found')

    return await this.itemRepository.save({
      name: payload.name,
      rarity: rarity,
      design: payload.design
    })
  }

  async createRarity(rarityDto: AddRarityDto) {
    return await this.rarityRepository.save({
      name: rarityDto.name,
      weight: rarityDto.weight,
      color: rarityDto.color,
    })
  }

  async findAll() {
    return await this.itemRepository.find({ relations: ['rarity'] })
  }

  async findAllRarity() {
    return await this.rarityRepository.find()
  }
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}