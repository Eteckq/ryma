
import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
}