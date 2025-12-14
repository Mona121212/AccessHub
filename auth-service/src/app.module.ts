import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { AuthModule } from './modules/auth/auth.module';

import { GroupPermissionsModule } from './modules/group-permissions/group-permission.module';

// ✅ AbilityModule path must match the real file location
// If your file name is ability.module.ts, keep that;
// otherwise use src/modules/ability/module.ts as below
import { AbilityModule } from './modules/ability/module';

// ✅ These providers must be explicitly imported;
// otherwise Nest may reference a different class instance
import { PermissionAbilityFactory } from './modules/group-permissions/ability/permission-ability.factory';
import { PermissionAbilityGuard } from './modules/group-permissions/ability/guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'MonaDatabase3355',
      database: 'access_hub',
      autoLoadEntities: true, // Automatically load new entities
      synchronize: true, // Safe for development only, disable in production
    }),

    UsersModule,
    OrganizationsModule,
    AuthModule,

    // ✅ Import AbilityModule before business modules for safety
    AbilityModule,
    GroupPermissionsModule,
  ],
  providers: [PermissionAbilityFactory, PermissionAbilityGuard],
})
export class AppModule {}
