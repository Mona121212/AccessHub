import { Controller, Get, Headers, Query } from '@nestjs/common';
import { AbilityService } from './ability.service';

@Controller()
export class MePermissionsController {
  constructor(private readonly abilityService: AbilityService) {}

  @Get('me/permissions')
  async getMyPermissions(
    @Headers('x-user-id') userId: string,
    @Query('organizationId') organizationId: string,
  ) {
    return this.abilityService.resourceActionsPermission(userId, {
      organizationId,
    });
  }
}
