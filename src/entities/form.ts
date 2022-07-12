import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./user";
import { Question } from "./question";

@Entity('form')
export class Form extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  ownerId: string;
  
  @ManyToOne(() => User, (user) => user.forms, { onDelete: 'CASCADE'})
  @JoinColumn()
  owner: User;

  @OneToMany(() => Question, (question) => question.form)
  questions: Question[]
}