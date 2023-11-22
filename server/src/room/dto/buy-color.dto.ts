import { IsNotEmpty } from 'class-validator';

export class BuyColorDto {
  @IsNotEmpty()
  roomColorId: number;
  @IsNotEmpty()
  cost: number;
}
