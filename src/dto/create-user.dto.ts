/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsOptional()
  readonly fullname: string;
  @IsOptional()
  readonly username: string;
  @IsOptional()
  password: string;
  @IsOptional()
  isAdmin: string;
  @IsOptional()
  readonly createdDate: string;
}
