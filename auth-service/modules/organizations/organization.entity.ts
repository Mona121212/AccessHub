import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Organization entity definition.
 * This model represents an organizational unit within the system. 
 * Each organization has a unique identifier, name, and slug, 
 * along with automatically managed timestamps.
 */
@Entity({ name: 'organizations' })
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Unique name of the organization
  @Column({ unique: true })
  name: string;

  // URL-friendly identifier for the organization
  @Column({ unique: true })
  slug: string;

  // Timestamp of creation
  @CreateDateColumn({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  // Timestamp of last update
  @UpdateDateColumn({ name: 'updated_at', default: () => 'now()' })
  updatedAt: Date;
}
