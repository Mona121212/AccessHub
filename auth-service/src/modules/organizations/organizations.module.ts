import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';

/**
 * OrganizationsModule bundles together the components associated 
 * with managing organizations. It registers the Organization entity 
 * with TypeORM and provides the service to other modules.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
