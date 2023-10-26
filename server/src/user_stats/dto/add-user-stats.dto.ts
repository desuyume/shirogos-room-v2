import { IsNumber } from 'class-validator';

export class AddUserStatsDto {
  @IsNumber()
  value: number;
}
