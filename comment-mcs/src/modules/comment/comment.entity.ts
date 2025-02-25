import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    Index,
} from 'typeorm';
import { Entity } from 'typeorm';

@Entity('comment')
export class CommentEntity extends BaseEntity {
    constructor(data?: Partial<CommentEntity>) {
        super();
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn('uuid', {
        primaryKeyConstraintName: 'PK_comment_id',
    })
    id!: string;
    @Column({
        type: 'text',
    })
    text!: string;
    @Index('IX_comment_user_id')
    @Column({
        name: 'user_id',
        type: 'uuid',
    })
    userId!: string;
    @Column({
        type: 'timestamptz',
        nullable: true,
        name: 'delete_on',
    })
    deleteOn?: Date;
    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
    })
    readonly createdAt!: Date;
    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
    })
    readonly updatedAt!: Date;
}
