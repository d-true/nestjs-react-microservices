import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
    @PrimaryColumn({
        type: 'integer',
        primaryKeyConstraintName: 'PK_role_id',
    })
    id!: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    name!: string;

    @OneToMany(() => UserEntity, (user) => user.role)
    users?: UserEntity[];
}
