import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('session')
export class SessionEntity extends BaseEntity {
    constructor(data?: Partial<SessionEntity>) {
        super();
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn('uuid', {
        primaryKeyConstraintName: 'PK_session_id',
    })
    id!: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    hash!: string;

    @Column({
        name: 'user_id',
        type: 'uuid',
    })
    userId!: string;
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
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_session_user',
    })
    @ManyToOne(() => UserEntity, (user) => user.sessions)
    user!: UserEntity;
}
