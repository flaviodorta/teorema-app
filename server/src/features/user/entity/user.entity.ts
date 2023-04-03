import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  // @Column()
  // surname: string;

  @Column({ nullable: true })
  role: number;

  @BeforeInsert()
  emailToLowercase() {
    this.email = this.email.toLowerCase();
  }

  // @Column()
  // class: string;

  // @Column()
  // responsible: string;

  // @Column()
  // installment: number;

  // @Column()
  // discount: number;

  // @Column()
  // total: number;

  // @Column()
  // maturity: Date;

  // @Column()
  // payment: boolean;
}
