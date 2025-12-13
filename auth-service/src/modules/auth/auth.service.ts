import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

/**
 * AuthService handles user authentication logic, including
 * validating credentials and retrieving related organization data.
 * This simplified version performs email and password checks
 * and returns basic user and organization information upon login.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  /**
   * Validates user login credentials and returns the user along with
   * their associated organization, if available.
   */
  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Retrieve the user's active or default organization
    const orgId = user.organizationId || user.defaultOrganizationId;
    const organization = orgId
      ? await this.organizationsService.findById(orgId)
      : null;

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roleName: user.roleName,
        organizationId: orgId,
      },
      organization: organization
        ? {
            id: organization.id,
            name: organization.name,
            slug: organization.slug,
          }
        : null,
    };
  }
}
