export class CreateUniqueRoleDto {
  title: string;
  cost: number;
  isForSale: boolean;
}

export enum UniqueRoleType {
  ADJECTIVES = 'ADJECTIVES',
  NOUNS = 'NOUNS',
}
