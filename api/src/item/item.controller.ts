import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { AddRarityDto } from './dto/add-rarity.dto';
import { Role } from 'src/auth/role.enum';
import { NeedRole } from 'src/auth/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

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

  @ApiBearerAuth()
  @NeedRole(Role.Admin)
  @Post('rarity')
  async createRarity(@Body() rarityDto: AddRarityDto){
    return await this.itemService.createRarity(rarityDto)
  }
}
