import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Type,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { AbilityFactory } from '../ability-factory';
import { MODULES } from '../constants/modules';

@Injectable()
export abstract class AbilityGuard implements CanActivate {
  constructor(
    protected reflector: Reflector,
    protected moduleRef: ModuleRef,
  ) {}

  protected abstract getAbilityFactory(): Type<AbilityFactory<any, any>>;
  protected abstract getSubjectType(): any;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const moduleId = this.reflector.get<MODULES>(
      'tjModuleId',
      context.getClass(),
    );

    let features = this.reflector.get<string[] | string>(
      'tjFeatureId',
      context.getHandler(),
    );
    if (!features) return false;
    if (!Array.isArray(features)) features = [features];

    const request = context.switchToHttp().getRequest();

    const userId = String(request.headers['x-user-id'] ?? '').trim();
    const organizationId = String(
      request.query?.organizationId ??
        request.headers['x-organization-id'] ??
        '',
    ).trim();

    if (!userId || !organizationId) {
      throw new ForbiddenException('Missing x-user-id or organizationId');
    }

    request.user = { id: userId, organizationId };

    const abilityFactory = this.moduleRef.get(this.getAbilityFactory(), {
      strict: false,
    });

    const ability = await abilityFactory.createAbility(
      request.user,
      {
        moduleName: String(moduleId ?? ''), // ✅ 关键：unknown/undefined -> string
        features,
      },
      [],
      request,
    );

    for (const feature of features) {
      const ok = ability.can(feature, this.getSubjectType());
      if (!ok) {
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }
    }

    return true;
  }
}
