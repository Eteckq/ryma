import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import { ItemToUser } from './entities/item_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemToUser])],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule {}
