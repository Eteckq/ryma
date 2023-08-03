import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import { ItemToUser } from './entities/item_user.entity';
import { Rarity } from './entities/rarity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemToUser, Rarity])],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule {}
