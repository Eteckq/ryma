import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from 'src/collection/entities/collection.entity';
import { AddItemDto } from 'src/collection/dto/add-item.dto';
import { ItemToUser } from './entities/item_user.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(ItemToUser)
    private readonly itemToUserRepository: Repository<ItemToUser>
  ) { }


  async generateItem(item: Item) {
    return await this.itemToUserRepository.create({
      item: item,
      quality: Math.min(getRandom(5, 105), 100),
      shiny: getRandom(0, 100) > 95
    })
  }

  async createItem(payload: AddItemDto) {
    return await this.itemRepository.save({
      name: payload.name,
      rarity: payload.rarity,
      design: payload.design
    })
  }

  async findAll() {
    return this.itemRepository.find()
  }
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}