import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from 'src/custom-base-entity';


@Entity()
export class Rarity extends CustomBaseEntity {
    @Column()
    name: string

    @Column({default: 'white'})
    color: string

    @Column({ default: 50 })
    weight: number
}