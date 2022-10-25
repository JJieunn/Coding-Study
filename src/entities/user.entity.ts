import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Posts } from "./post.entity";

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar", { length: 15 })
  nickname!: string;

  @Column("varchar", { length: 30 })
  email!: string;

  @Column("varchar", { length: 1500 })
  password!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at!: Date;

  @OneToMany(() => Posts, (post) => post.user)
  posts!: Posts[];
}