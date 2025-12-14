import { Injectable } from '@nestjs/common';
import { AbilityFactory } from '../../app/ability-factory';
import { FEATURE_KEY } from '../constants/feature-key';

export class PermissionGroupSubject {}

@Injectable()
export class PermissionAbilityFactory extends AbilityFactory {
  protected getSubjectType() {
    return PermissionGroupSubject;
  }

  protected defineAbilityFor(can: any, payload: { userPermission: any }) {
    const p = payload.userPermission;

    if (p?.appCreate === true || p?.isAdmin === true) {
      can(FEATURE_KEY.CREATE_GROUP, PermissionGroupSubject);
      can(FEATURE_KEY.ADD_USER_TO_GROUP, PermissionGroupSubject);
    }
  }
}
