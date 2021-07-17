import { IsInt, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly role_id: string;
}
