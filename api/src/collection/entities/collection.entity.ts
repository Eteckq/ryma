import { CustomBaseEntity } from 'src/custom-base-entity';
import { Item } from 'src/item/entities/item.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Collection extends CustomBaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Item, (item) => item.collection)
  items!: Item[]

  @Column()
  design: string
}