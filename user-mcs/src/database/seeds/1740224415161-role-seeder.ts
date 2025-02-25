import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RoleEntity } from '../../modules/user/enteties/role.entity';
import { UserRoles } from '../../constants/app.constants';

export class RoleSeeder1740224415161 implements Seeder {
    track = false;

    public async run(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(RoleEntity);

        const isAdminRoleExists = await repository.exists({
            where: { id: UserRoles.ADMIN },
        });

        if (!isAdminRoleExists) {
            await repository.insert({ id: UserRoles.ADMIN, name: 'ADMIN' });
        }

        const isUserRoleExists = await repository.exists({
            where: { id: UserRoles.USER },
        });

        if (!isUserRoleExists) {
            await repository.insert({ id: UserRoles.USER, name: 'USER' });
        }
    }
}
