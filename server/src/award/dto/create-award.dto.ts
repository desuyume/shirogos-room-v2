enum AwardType {
  BOUTIQUE = 'BOUTIQUE',
  SPECIAL = 'SPECIAL',
}

export class CreateAwardDto {
  cost: number;
  title: string;
  awardType: string;
  category: AwardType;
}
