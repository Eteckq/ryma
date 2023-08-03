import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { AddRarityDto } from './dto/add-rarity.dto';

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

  @Post('rarity')
  async createRarity(@Body() rarityDto: AddRarityDto){
    return await this.itemService.createRarity(rarityDto)
  }
}
