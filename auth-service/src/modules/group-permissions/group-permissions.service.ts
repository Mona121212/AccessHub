import { Injectable } from '@nestjs/common';
import { GroupPermissionsRepository } from './repository/group-permissions.repository';
import { GROUP_PERMISSIONS_TYPE, ResourceType } from './constants';

@Injectable()
export class GroupPermissionsService {
  constructor(private readonly repo: GroupPermissionsRepository) {}

  createGroup(dto: {
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
  }) {
    return this.repo.createGroup(dto);
  }

  addUserToGroup(userId: string, groupId: string) {
    return this.repo.createGroupUser(userId, groupId);
  }

  getUserGroups(userId: string, organizationId: string) {
    return this.repo.getAllUserGroups(userId, organizationId);
  }

  addGranularPermission(dto: { groupId: string; name: string; type: ResourceType; isAll?: boolean }) {
    return this.repo.createGranularPermission(dto);
  }
}
