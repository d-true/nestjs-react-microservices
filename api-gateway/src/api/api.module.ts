import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [UserModule, AuthModule, ProfileModule, CommentModule],
})
export class ApiModule {}
