import { Module } from '@nestjs/common';
import { AbilityService } from './ability.service';
import { AbilityUtilService } from './util.service';
import { MePermissionsController } from './me-permissions.controller';

@Module({
  controllers: [MePermissionsController],
  providers: [AbilityService, AbilityUtilService],
  exports: [AbilityService],
})
export class AbilityModule {}
