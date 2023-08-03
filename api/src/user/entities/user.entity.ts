
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, AfterLoad, PrimaryGeneratedColumn } from 'typeorm';
import { ItemToUser } from '../../item/entities/item_user.entity';
import { Role } from 'src/auth/role.enum';
import { CustomBaseEntity } from 'src/custom-base-entity';

@Entity()
export class User extends CustomBaseEntity {

  @Column({ default: "" })
  pseudo: string;

  @OneToMany(() => ItemToUser, (itemToUser) => itemToUser.user)
  items: ItemToUser[]

  @Column({default: Role.User})
  role: Role;

  @Column({default: 3})
  remainingRolls: number

}