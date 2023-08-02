import { Collection } from 'src/collection/entities/collection.entity';
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Rarity } from '../rarity.enum';
import { ItemToUser } from './item_user.entity';
import { CustomBaseEntity } from 'src/custom-base-entity';


@Entity()
export class Item extends CustomBaseEntity {
    @Column()
    name: string

    @Column({ default: 0 })
    rarity: Rarity

    @ManyToOne(() => Collection, (collection) => collection.items)
    collection: Collection

    @OneToMany(() => ItemToUser, (itemToUser) => itemToUser.item)
    users: ItemToUser[]

    @Column()
    design: string
}