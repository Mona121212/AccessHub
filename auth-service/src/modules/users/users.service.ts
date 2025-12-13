import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * UsersService provides basic operations for accessing and managing
 * user-related data. It interacts with the User entity through the
 * TypeORM repository pattern.
 *
 * In this implementation, the standard TypeORM Repository is injected
 * directly instead of creating a separate custom repository layer.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  /**
   * Finds a user by email address.
   * Returns the matched user or null if no result is found.
   */
  findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  /**
   * Creates and persists a new user record.
   * Accepts a partial User object and saves it to the database.
   */
  createUser(partial: Partial<User>): Promise<User> {
    const user = this.usersRepo.create(partial);
    return this.usersRepo.save(user);
  }
}
