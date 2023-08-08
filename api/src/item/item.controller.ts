import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
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
    return await this.itemService.findAll();
  }

  @Get('user/:userId')
  async getItemsForUser(
    @Param('userId') userId: string,
    @Query('page') page = '0',
  ) {
    return this.itemService.getItemsForUser(userId, parseInt(page));
  }

  @Get('rarity')
  async getRarity() {
    return await this.itemService.findAllRarity();
  }

  @ApiBearerAuth()
  @NeedRole(Role.Admin)
  @Post('rarity')
  async createRarity(@Body() rarityDto: AddRarityDto) {
    return await this.itemService.createRarity(rarityDto);
  }
}
