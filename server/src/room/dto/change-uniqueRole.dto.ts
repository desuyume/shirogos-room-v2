import { IsNotEmpty } from 'class-validator';

export class ChangeUniqueRoleDto {
  @IsNotEmpty()
  role: string;
}
