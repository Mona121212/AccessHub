import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { AuthModule } from './modules/auth/auth.module';

// These User and Organization entities will be created later
import { User } from './modules/users/user.entity';
import { Organization } from './modules/organizations/organization.entity';


@Module({
  imports: [
    // Global TypeORM configuration (ToolJet does this in server/ormconfig.ts + AppModule.register)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, // local Postgres setup
      username: 'postgres',
      password: 'MonaDatabase3355',
      database: 'access_hub',
      entities: [User, Organization],
      synchronize: true, //Safe to use true in development, must disable in production
    }),

    // Business modules
    UsersModule,
    OrganizationsModule,
    AuthModule,
  ],
})
export class AppModule {}
