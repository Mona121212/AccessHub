import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GroupPermissionsService } from './group-permissions.service';
import { GROUP_PERMISSIONS_TYPE, ResourceType } from './constants';

@Controller()
export class GroupPermissionsController {
  constructor(private readonly service: GroupPermissionsService) {}

  // POST /api/groups
  @Post('groups')
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
    }
  ) {
    return this.service.createGroup(body);
  }

  // POST /api/groups/:groupId/users/:userId
  @Post('groups/:groupId/users/:userId')
  addUserToGroup(@Param('groupId') groupId: string, @Param('userId') userId: string) {
    return this.service.addUserToGroup(userId, groupId);
  }

  // GET /api/users/:userId/groups?organizationId=xxx
  @Get('users/:userId/groups')
  getUserGroups(@Param('userId') userId: string, @Query('organizationId') organizationId: string) {
    return this.service.getUserGroups(userId, organizationId);
  }

  // POST /api/groups/:groupId/granular
  @Post('groups/:groupId/granular')
  addGranularPermission(
    @Param('groupId') groupId: string,
    @Body() body: { name: string; type: ResourceType; isAll?: boolean }
  ) {
    return this.service.addGranularPermission({ groupId, ...body });
  }
}
