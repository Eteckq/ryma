
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, AfterLoad, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;
}