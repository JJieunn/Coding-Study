import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Users } from "./user.entity";

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id?: number

  @Column("varchar", { length: 30 })
  title?: string

  @Column("varchar", { length: 3000 })
  content?: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at?: Date;

  @Column("int")
  user_id?: number;

  @ManyToOne(() => Users, (user) => user.posts )
  @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
  user?: Users;
}