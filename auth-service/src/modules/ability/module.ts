import { Global, Module } from '@nestjs/common';
import { AbilityService } from './ability.service';
import { AbilityServiceToken } from './interfaces/IService';
import { AbilityUtilService } from './util.service';

@Global()
@Module({
  providers: [
    AbilityUtilService,
    AbilityService,
    { provide: AbilityServiceToken, useExisting: AbilityService },
  ],
  exports: [AbilityServiceToken],
})
export class AbilityModule {}
