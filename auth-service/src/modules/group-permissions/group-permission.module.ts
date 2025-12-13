import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupPermissions } from './entities/group-permissions.entity';
import { GroupUsers } from './entities/group-users.entity';
import { GranularPermissions } from './entities/granular-permissions.entity';
import { GroupPermissionsRepository } from './repository/group-permissions.repository';
import { GroupPermissionsService } from './group-permissions.service';
import { GroupPermissionsController } from './group-permissions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GroupPermissions, GroupUsers, GranularPermissions])],
  controllers: [GroupPermissionsController],
  providers: [GroupPermissionsRepository, GroupPermissionsService],
  exports: [GroupPermissionsService],
})
export class GroupPermissionsModule {}
