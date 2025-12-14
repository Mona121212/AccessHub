import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbilityUtilService } from './util.service';
import {
  DEFAULT_USER_PERMISSIONS,
  ResourcePermissionQueryObject,
  UserPermissions,
} from './types';
import { GroupPermissions } from '../group-permissions/entities/group-permissions.entity';

@Injectable()
export class AbilityService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly abilityUtilService: AbilityUtilService,
  ) {}

  async resourceActionsPermission(
    userId: string,
    query: ResourcePermissionQueryObject,
  ): Promise<UserPermissions> {
    if (!userId) throw new BadRequestException('Missing x-user-id');
    if (!query?.organizationId)
      throw new BadRequestException('Missing organizationId');

    const groups: GroupPermissions[] = await this.dataSource.transaction(
      async (manager) => {
        return this.abilityUtilService
          .getUserGroupsQuery(userId, query.organizationId, manager)
          .getMany();
      },
    );

    const merged = groups.reduce<UserPermissions>((acc, group) => {
      return {
        ...acc,

        appCreate: acc.appCreate || group.appCreate,
        appDelete: acc.appDelete || group.appDelete,

        workflowCreate: acc.workflowCreate || group.workflowCreate,
        workflowDelete: acc.workflowDelete || group.workflowDelete,

        folderCRUD: acc.folderCRUD || group.folderCRUD,
        orgConstantCRUD: acc.orgConstantCRUD || group.orgConstantCRUD,

        dataSourceCreate: acc.dataSourceCreate || group.dataSourceCreate,
        dataSourceDelete: acc.dataSourceDelete || group.dataSourceDelete,

        appPromote: acc.appPromote || group.appPromote,
        appRelease: acc.appRelease || group.appRelease,

        isAdmin: false,
        isBuilder: false,
        isEndUser: false,
      };
    }, DEFAULT_USER_PERMISSIONS);

    const isAdmin = groups.some(
      (g) => (g.name || '').toLowerCase() === 'admin',
    );
    const isBuilder = false; // will do isBuilder later
    const isEndUser = !isAdmin && !isBuilder;

    return {
      ...merged,
      isAdmin,
      isBuilder,
      isEndUser,
    };
  }
}
