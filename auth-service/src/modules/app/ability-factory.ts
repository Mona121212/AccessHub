import { AbilityBuilder, PureAbility, AbilityClass } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AbilityServiceToken } from '../ability/interfaces/IService';

export interface UserLike {
  id: string;
  organizationId: string;
}

export interface UserAllPermissionsLike {
  userPermission: any;
  user: UserLike;
}

export type AppAbility = PureAbility<[string, any]>; // can run first

@Injectable()
export abstract class AbilityFactory<
  TActions extends string = string,
  TSubject = any,
> {
  constructor(protected abilityService: AbilityServiceToken) {}

  protected abstract getSubjectType(): any;

  async createAbility(
    user: UserLike,
    extractedMetadata: { moduleName: string; features: string[] },
    resource?: { resourceType: any; resourceId?: string }[],
    request?: any,
  ): Promise<AppAbility> {
    const { can, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );

    const cached = request?.tj_user_permissions;
    const userPermission =
      cached ||
      (await this.abilityService.resourceActionsPermission(user.id, {
        organizationId: user.organizationId,
      }));

    if (request) request.tj_user_permissions = userPermission;

    await this.defineAbilityFor(
      can,
      { userPermission, user },
      extractedMetadata,
      request,
    );

    return build({
      detectSubjectType: (item: any) => item?.constructor,
    });
  }

  protected abstract defineAbilityFor(
    can: AbilityBuilder<AppAbility>['can'],
    payload: UserAllPermissionsLike,
    extractedMetadata: { moduleName: string; features: string[] },
    request?: any,
  ): void | Promise<void>;
}
