import { Injectable } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { GroupPermissions } from '../group-permissions/entities/group-permissions.entity';

@Injectable()
export class AbilityUtilService {
  getUserGroupsQuery(
    userId: string,
    organizationId: string,
    manager: EntityManager,
  ): SelectQueryBuilder<GroupPermissions> {
    return manager
      .createQueryBuilder(GroupPermissions, 'groupPermissions')
      .innerJoin(
        'groupPermissions.groupUsers',
        'groupUsers',
        'groupUsers.userId = :userId',
        { userId },
      )
      .where('groupPermissions.organizationId = :organizationId', {
        organizationId,
      });
  }
}
