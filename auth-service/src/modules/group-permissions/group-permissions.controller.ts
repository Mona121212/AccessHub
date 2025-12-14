import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GroupPermissionsService } from './group-permissions.service';
import { GROUP_PERMISSIONS_TYPE, ResourceType } from './constants';

// ✅ 新增：这些是你提到的 guard + init 装饰器
import { InitModule } from '../app/decorators/init-module.decorator';
import { InitFeature } from '../app/decorators/init-feature.decorator';
import { MODULES } from '../app/constants/modules';
import { PermissionAbilityGuard } from './ability/guard';
import { FEATURE_KEY } from './constants/feature-key';

@Controller()
@InitModule(MODULES.GROUP_PERMISSIONS)
@UseGuards(PermissionAbilityGuard)
export class GroupPermissionsController {
  constructor(private readonly service: GroupPermissionsService) {}

  // POST /api/groups
  @Post('groups')
  @InitFeature(FEATURE_KEY.CREATE_GROUP)
  createGroup(
    @Body()
    body: {
      organizationId: string;
      name: string;
      type: GROUP_PERMISSIONS_TYPE;
      appCreate?: boolean;
      appDelete?: boolean;
      workflowCreate?: boolean;
      workflowDelete?: boolean;
      folderCRUD?: boolean;
      orgConstantCRUD?: boolean;
      dataSourceCreate?: boolean;
      dataSourceDelete?: boolean;
      appPromote?: boolean;
      appRelease?: boolean;
    },
  ) {
    return this.service.createGroup(body);
  }

  // POST /api/groups/:groupId/users/:userId
  @Post('groups/:groupId/users/:userId')
  @InitFeature(FEATURE_KEY.ADD_USER_TO_GROUP)
  addUserToGroup(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.service.addUserToGroup(userId, groupId);
  }

  // GET /api/users/:userId/groups?organizationId=xxx
  @Get('users/:userId/groups')
  // @InitFeature(FEATURE_KEY.GET_USER_GROUPS)
  getUserGroups(
    @Param('userId') userId: string,
    @Query('organizationId') organizationId: string,
  ) {
    return this.service.getUserGroups(userId, organizationId);
  }

  // POST /api/groups/:groupId/granular
  @Post('groups/:groupId/granular')
  // @InitFeature(FEATURE_KEY.ADD_GRANULAR_PERMISSION)
  addGranularPermission(
    @Param('groupId') groupId: string,
    @Body() body: { name: string; type: ResourceType; isAll?: boolean },
  ) {
    return this.service.addGranularPermission({ groupId, ...body });
  }
}
