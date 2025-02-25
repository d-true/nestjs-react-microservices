import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { UserEntity } from '../../modules/user/enteties/user.entity';
import { UserRoles } from '../../constants/app.constants';

export class AdminSeeder1740225394082 implements Seeder {
    track = false;

    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(UserEntity);

        const isAdminExists = await repository.exists({
            where: { roleId: UserRoles.ADMIN },
        });

        if (!isAdminExists) {
            await repository.save(
                repository.create({
                    email: 'admin@admin.com',
                    password: '12345678',
                    name: 'Admin',
                    roleId: UserRoles.ADMIN,
                }),
            );
        }
    }
}
