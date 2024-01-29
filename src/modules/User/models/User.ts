import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ObjectIdColumn,
} from "typeorm";

@Entity("users")
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  phone?: number;

  @Column()
  address?: string;

  @Column()
  city?: string;

  @Column()
  state?: string;

  @Column()
  zipCode?: number;

  @Column()
  country?: string;

  @Column()
  urlImage?: string;

  @Column()
  email_token?: string;

  @Column()
  codLogin?: number;

  @Column({
    default: false,
  })
  email_verificado?: boolean;

  @Column({
    default: false,
  })
  admin?: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
