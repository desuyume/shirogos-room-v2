import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class UpdateUsernameDto {
	@IsNotEmpty()
  @MinLength(3)
  @MaxLength(34)
	username: string;
}