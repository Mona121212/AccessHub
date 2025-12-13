import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

/**
 * User entity definition.
 * This model represents a user within the system and includes
 * fundamental properties such as identification, authentication
 * information, profile details, organizational membership, and
 * role-based access data.
 */
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Unique email address used as the primary login identifier
  @Column({ unique: true })
  email: string;

  // Password of the user (initially stored as plain text;
  // can later be updated to use hashed storage)
  @Column()
  password: string;

  // Optional profile information
  @Column({ name: 'first_name', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', nullable: true })
  lastName?: string; // will change to hash later

  // Default workspace or organization the user belongs to
  @Column({ name: 'default_organization_id', nullable: true })
  defaultOrganizationId?: string;

  // Current active organization context for the user
  @Column({ name: 'organization_id', nullable: true })
  organizationId?: string;

  // Role assigned to the user for authorization purposes
  @Column({ name: 'role_name', default: 'end_user' })
  roleName: string;

  // Automatically managed timestamp for record creation
  @CreateDateColumn({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  // Automatically managed timestamp for last update
  @UpdateDateColumn({ name: 'updated_at', default: () => 'now()' })
  updatedAt: Date;
}
