import { Collection } from 'src/collection/entities/collection.entity';
import { Entity, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { ItemToUser } from './item_user.entity';
import { CustomBaseEntity } from 'src/custom-base-entity';
import { Rarity } from './rarity.entity';


@Entity()
export class Item extends CustomBaseEntity {
    @Column()
    name: string

    @ManyToOne(() => Rarity, { nullable: false })
    rarity: Rarity

    @ManyToOne(() => Collection, (collection) => collection.items)
    collection: Collection

    @OneToMany(() => ItemToUser, (itemToUser) => itemToUser.item)
    users: ItemToUser[]

    @Column()
    design: string
}