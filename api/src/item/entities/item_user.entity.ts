import { Item } from 'src/item/entities/item.entity';
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, AfterLoad, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CustomBaseEntity } from 'src/custom-base-entity';

@Entity()
export class ItemToUser extends CustomBaseEntity {
    @Column({default: 0})
    public quality: number;

    @Column({default: false})
    public shiny: boolean;

    @ManyToOne(() => Item, item => item.users)
    public item: Item;

    @ManyToOne(() => User, user => user.items)
    public user: User;
}