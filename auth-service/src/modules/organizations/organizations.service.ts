import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';

/**
 * OrganizationsService provides operations for retrieving and creating
 * organization records. It interacts with the Organization entity 
 * through the TypeORM repository.
 */
@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
  ) {}

  /**
   * Finds an organization by its unique identifier.
   */
  findById(id: string): Promise<Organization | null> {
    return this.orgRepo.findOne({ where: { id } });
  }

  /**
   * Creates and persists a new organization record.
   */
  createOrg(partial: Partial<Organization>): Promise<Organization> {
    const org = this.orgRepo.create(partial);
    return this.orgRepo.save(org);
  }
}
