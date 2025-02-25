import {
    PrimaryGeneratedColumn,
    Column,
    Unique,
    BeforeUpdate,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { hashPassword } from '../../../utils/password.utils';
import { Entity } from 'typeorm';
import { SessionEntity } from './session.entity';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
    constructor(data?: Partial<UserEntity>) {
        super();
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
    id!: string;
    @Column()
    password!: string;
    @Unique('UQ_user_email', ['email'])
    @Column()
    email!: string;
    @Column({
        length: 50,
    })
    name!: string;
    @Column({
        default: '',
        length: 255,
    })
    avatar?: string;
    @Column({
        name: 'role_id',
        type: 'integer',
    })
    roleId: number;
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
        name: 'role_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_role_user',
    })
    @ManyToOne(() => RoleEntity, (role) => role.id)
    role!: RoleEntity;
    @OneToMany(() => SessionEntity, (session) => session.user)
    sessions?: SessionEntity[];
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hashPassword(this.password);
        }
    }
}
