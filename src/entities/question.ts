import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Form } from "./form";

@Entity('question')
export class Question extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    question: string;

    @Column()
    question_type: string;

    @Column()
    isRequired: boolean;

    @Column()
    formId: string;

    @ManyToOne(() => Form, (form) => form.questions, { onDelete: 'CASCADE'})
    @JoinColumn()
    form: Form
}