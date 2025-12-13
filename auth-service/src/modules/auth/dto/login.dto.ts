import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * LoginDto defines the shape and validation rules
 * for login request data.
 *
 * It ensures that the client provides a valid email
 * and a password with a minimum length.
 */
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}
