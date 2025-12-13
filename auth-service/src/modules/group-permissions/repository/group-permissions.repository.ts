import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { GroupPermissions } from '../entities/group-permissions.entity';
import { GroupUsers } from '../entities/group-users.entity';
import { GranularPermissions } from '../entities/granular-permissions.entity';
import { GROUP_PERMISSIONS_TYPE, ResourceType } from '../constants';

@Injectable()
export class GroupPermissionsRepository {
  private groupRepo: Repository<GroupPermissions>;
  private groupUsersRepo: Repository<GroupUsers>;
  private granularRepo: Repository<GranularPermissions>;

  constructor(private readonly dataSource: DataSource) {
    this.groupRepo = this.dataSource.getRepository(GroupPermissions);
    this.groupUsersRepo = this.dataSource.getRepository(GroupUsers);
    this.granularRepo = this.dataSource.getRepository(GranularPermissions);
  }

  //  getGroup(options)
  getGroup(where: Partial<GroupPermissions>) {
    return this.groupRepo.findOne({ where });
  }

  // getAllUserGroups(userId, organizationId)
  async getAllUserGroups(userId: string, organizationId: string) {
    return this.groupRepo.find({
      where: {
        organizationId,
        groupUsers: {
          userId,
          group: { type: GROUP_PERMISSIONS_TYPE.CUSTOM_GROUP },
        },
      },
      relations: {
        groupUsers: { group: true },
      },
    });
  }

  //createGroup(organizationId, createGroupObject)
  async createGroup(params: {
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
    const group = this.groupRepo.create(params as any);
    return this.groupRepo.save(group);
  }

  // createGroupUser(userId, groupId)
  async createGroupUser(userId: string, groupId: string) {
    const gu = this.groupUsersRepo.create({ userId, groupId });
    return this.groupUsersRepo.save(gu);
  }

  //granular_permissions
  async createGranularPermission(params: {
    groupId: string;
    name: string;
    type: ResourceType;
    isAll?: boolean;
  }) {
    const gp = this.granularRepo.create({
      groupId: params.groupId,
      name: params.name,
      type: params.type,
      isAll: params.isAll ?? true,
    });
    return this.granularRepo.save(gp);
  }
}
