import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddItemDto } from './dto/add-item.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { InjectUser } from 'src/auth/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('collection')
@ApiTags('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) { }

  @Get()
  async all() {
    return await this.collectionService.findAll()
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return await this.collectionService.findOne(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @Post()
  async create(@Body() createCollectionDto: CreateCollectionDto) {
    return await this.collectionService.create(createCollectionDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @Post(':id/item')
  async addItem(@Param('id') id: string, @Body() addItemDto: AddItemDto) {
    return await this.collectionService.createItem(id, addItemDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/roll')
  async rollByCollectionId(@InjectUser() user: User, @Param('id') id: string) {
    return await this.collectionService.generateRandomItemForCollection(user, id)
  }
}
