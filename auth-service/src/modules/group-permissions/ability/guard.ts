import { Injectable } from '@nestjs/common';
import { AbilityGuard } from '../../app/guards/ability.guard';
import {
  PermissionAbilityFactory,
  PermissionGroupSubject,
} from './permission-ability.factory';

@Injectable()
export class PermissionAbilityGuard extends AbilityGuard {
  protected getAbilityFactory() {
    return PermissionAbilityFactory;
  }

  protected getSubjectType() {
    return PermissionGroupSubject;
  }
}
