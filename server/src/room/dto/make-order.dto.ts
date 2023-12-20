import { MinLength } from 'class-validator';

export class MakeOrderDto {
  orderPriceId: number;
  @MinLength(3)
  orderText: string;
}
