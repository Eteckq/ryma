import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

   @Get()
   async all() {
    return await this.itemService.findAll()
  }

  @Get('rarity')
  async getRarity(){
    return await this.itemService.findAllRarity()
  }
}
