import { IsNotEmpty, IsNumber } from 'class-validator';

export class DonateDto {
  id: number;
  @IsNotEmpty()
  username: string;
  @IsNumber()
  amount?: number;
  gifts?: string;
}
