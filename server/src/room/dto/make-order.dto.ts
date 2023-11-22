import { MaxLength, MinLength } from 'class-validator';

export class MakeOrderDto {
  orderPriceId: number;
  @MinLength(3)
  @MaxLength(34)
  orderText: string;
}
