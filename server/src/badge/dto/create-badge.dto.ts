type BadgeType = 'common' | 'copyright' | 'unique';

export class CreateBadgeDto {
  cost: number;
  title: string;
  type: BadgeType;
  isForSale: string;
}
