import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 320 })
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;
}
