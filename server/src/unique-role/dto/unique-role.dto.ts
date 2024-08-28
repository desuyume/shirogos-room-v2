export class CreateUniqueRoleDto {
  title: string;
  cost: number;
  isForSale: boolean;
}

export class UpdateUniqueRoleDto {
  title: string;
  cost: number;
}

export enum UniqueRoleType {
  ADJECTIVES = 'ADJECTIVES',
  NOUNS = 'NOUNS',
}
