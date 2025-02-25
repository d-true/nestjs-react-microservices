import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/enteties/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { SessionEntity } from '../user/enteties/session.entity';
import { TokenService } from '../token/token.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, SessionEntity]),
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [AuthService, TokenService],
})
export class AuthModule {}
