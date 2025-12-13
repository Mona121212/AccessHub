import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [UsersModule, OrganizationsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
